// ---------------------------------------------------------------------------
// LEMOSINE — data store (dual backend)
//
//   • Cloudflare Workers  → KV namespace "LEMOSINE_DATA" (bound in wrangler.jsonc)
//   • Everywhere else     → JSON files in /data (cars.json, settings.json)
//
// Data is seeded on first read, so a fresh deployment works out of the box.
// ---------------------------------------------------------------------------
import fs from 'fs/promises';
import path from 'path';
import { getCfEnv } from './cf-env';
import { seedCars, seedSettings } from './seed';

const KV_CARS = 'cars';
const KV_SETTINGS = 'settings';

function dataDir() {
  return path.join(process.cwd(), 'data');
}

async function readLocalJson(file, fallback) {
  try {
    const raw = await fs.readFile(path.join(dataDir(), file), 'utf8');
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function writeLocalJson(file, data) {
  try {
    await fs.mkdir(dataDir(), { recursive: true });
    const tmp = path.join(dataDir(), file + '.tmp');
    await fs.writeFile(tmp, JSON.stringify(data, null, 2), 'utf8');
    await fs.rename(tmp, path.join(dataDir(), file));
    return true;
  } catch {
    return false;
  }
}

// ---- Cars ------------------------------------------------------------------

export async function getCars() {
  const kv = (await getCfEnv())?.LEMOSINE_DATA;
  if (kv) {
    const data = await kv.get(KV_CARS, 'json');
    if (Array.isArray(data)) return data;
    await kv.put(KV_CARS, JSON.stringify(seedCars)); // first run on a fresh namespace
    return seedCars;
  }
  return readLocalJson('cars.json', seedCars);
}

export async function getCar(id) {
  return (await getCars()).find((c) => c.id === id) || null;
}

export async function getFeaturedCars() {
  return (await getCars()).filter((c) => c.featured);
}

// Can content be edited in this environment? (true on Cloudflare with KV bound,
// and locally; false on serverless hosts without storage configured)
export async function isStorageWritable() {
  const kv = (await getCfEnv())?.LEMOSINE_DATA;
  if (kv) return true;
  return writeLocalJson('cars.json', await readLocalJson('cars.json', seedCars));
}

export async function saveCar(car) {
  const kv = (await getCfEnv())?.LEMOSINE_DATA;
  if (kv) {
    const cars = await getCars();
    const index = cars.findIndex((c) => c.id === car.id);
    if (index >= 0) cars[index] = car;
    else cars.push(car);
    await kv.put(KV_CARS, JSON.stringify(cars));
    return;
  }

  const cars = await readLocalJson('cars.json', seedCars);
  const index = cars.findIndex((c) => c.id === car.id);
  if (index >= 0) cars[index] = car;
  else cars.push(car);
  if (!(await writeLocalJson('cars.json', cars))) {
    throw new Error('STORAGE_UNAVAILABLE');
  }
}

export async function deleteCar(id) {
  const kv = (await getCfEnv())?.LEMOSINE_DATA;
  if (kv) {
    const cars = await getCars();
    const next = cars.filter((c) => c.id !== id);
    if (next.length === cars.length) return false;
    await kv.put(KV_CARS, JSON.stringify(next));
    return true;
  }

  const cars = await readLocalJson('cars.json', seedCars);
  const next = cars.filter((c) => c.id !== id);
  if (next.length === cars.length) return false;
  if (!(await writeLocalJson('cars.json', next))) {
    throw new Error('STORAGE_UNAVAILABLE');
  }
  return true;
}

// ---- Settings --------------------------------------------------------------

export async function getSettings() {
  const kv = (await getCfEnv())?.LEMOSINE_DATA;
  if (kv) {
    const data = await kv.get(KV_SETTINGS, 'json');
    if (data && typeof data === 'object') return data;
    await kv.put(KV_SETTINGS, JSON.stringify(seedSettings));
    return seedSettings;
  }
  return readLocalJson('settings.json', seedSettings);
}

export async function saveSettings(settings) {
  const kv = (await getCfEnv())?.LEMOSINE_DATA;
  if (kv) {
    await kv.put(KV_SETTINGS, JSON.stringify(settings));
    return;
  }
  if (!(await writeLocalJson('settings.json', settings))) {
    throw new Error('STORAGE_UNAVAILABLE');
  }
}
