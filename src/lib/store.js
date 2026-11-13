// ---------------------------------------------------------------------------
// LEMOSINE — data store
// Simple JSON-file store. Data lives in /data (cars.json, settings.json).
// Files are seeded on first read, so replacing them (or editing through the
// admin dashboard) is all that is needed to manage site content.
// ---------------------------------------------------------------------------
import fs from 'fs';
import path from 'path';
import { seedCars, seedSettings } from './seed';

const DATA_DIR = path.join(process.cwd(), 'data');

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJson(file, fallback) {
  ensureDir();
  const filePath = path.join(DATA_DIR, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), 'utf8');
    return fallback;
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

function writeJson(file, data) {
  ensureDir();
  const filePath = path.join(DATA_DIR, file);
  const tmp = filePath + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tmp, filePath);
}

// ---- Cars ------------------------------------------------------------------

export function getCars() {
  return readJson('cars.json', seedCars);
}

export function getCar(id) {
  return getCars().find((c) => c.id === id) || null;
}

export function getFeaturedCars() {
  return getCars().filter((c) => c.featured);
}

export function saveCar(car) {
  const cars = getCars();
  const index = cars.findIndex((c) => c.id === car.id);
  if (index >= 0) cars[index] = car;
  else cars.push(car);
  writeJson('cars.json', cars);
}

export function deleteCar(id) {
  const cars = getCars();
  const next = cars.filter((c) => c.id !== id);
  if (next.length === cars.length) return false;
  writeJson('cars.json', next);
  return true;
}

// ---- Settings --------------------------------------------------------------

export function getSettings() {
  return readJson('settings.json', seedSettings);
}

export function saveSettings(settings) {
  writeJson('settings.json', settings);
}
