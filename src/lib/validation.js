// ---------------------------------------------------------------------------
// LEMOSINE — server-side validation for admin inputs
// ---------------------------------------------------------------------------

export const CATEGORIES = ['luxury', 'sedan', 'sports', 'exotic', 'suv', 'electric'];
export const TRANSMISSIONS = ['auto', 'manual'];
export const FUELS = ['petrol', 'hybrid', 'electric', 'diesel'];

const ID_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PATH_RE = /^\/(images|uploads)\/[\w\-./]+$|^\/api\/media\/[\w\-./]+$/;
const URL_RE = /^https?:\/\/\S+$/;

export function validateCar(body) {
  const errors = [];
  const id = String(body.id ?? '').trim().toLowerCase();
  const name = String(body.name ?? '').trim();
  const year = Number(body.year);
  const category = String(body.category ?? '');
  const pricePerDay = body.pricePerDay === '' || body.pricePerDay == null ? null : Number(body.pricePerDay);
  const passengers = Number(body.passengers);
  const transmission = String(body.transmission ?? 'auto');
  const fuel = String(body.fuel ?? 'petrol');
  const description = String(body.description ?? '').trim();
  const featured = Boolean(body.featured);
  const images = Array.isArray(body.images) ? body.images.map(String) : [];

  if (!id || id.length > 80 || !ID_RE.test(id)) {
    errors.push('المعرّف (ID) مطلوب ويجب أن يكون بأحرف إنجليزية صغيرة وشرطات فقط.');
  }
  if (!name || name.length > 100) errors.push('اسم السيارة مطلوب (حتى 100 حرف).');
  if (!Number.isInteger(year) || year < 1990 || year > new Date().getFullYear() + 2) {
    errors.push('سنة الموديل غير صحيحة.');
  }
  if (!CATEGORIES.includes(category)) errors.push('الفئة غير صحيحة.');
  if (pricePerDay !== null && (!Number.isFinite(pricePerDay) || pricePerDay < 0 || pricePerDay > 1000000)) {
    errors.push('السعر اليومي غير صحيح.');
  }
  if (!Number.isInteger(passengers) || passengers < 1 || passengers > 20) {
    errors.push('عدد الركاب غير صحيح.');
  }
  if (!TRANSMISSIONS.includes(transmission)) errors.push('ناقل الحركة غير صحيح.');
  if (!FUELS.includes(fuel)) errors.push('نوع الوقود غير صحيح.');
  if (description.length > 500) errors.push('الوصف طويل جداً (الحد 500 حرف).');
  if (images.some((img) => !PATH_RE.test(img))) errors.push('أحد مسارات الصور غير صالح.');
  if (images.length === 0) errors.push('يجب إضافة صورة واحدة على الأقل.');

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    car: {
      id,
      name,
      year,
      category,
      pricePerDay,
      passengers,
      transmission,
      fuel,
      description,
      featured,
      images,
    },
  };
}

export function validateSettings(body) {
  const errors = [];
  const s = body ?? {};
  const out = {};

  const wa = String(s.whatsappNumber ?? '').replace(/[^\d]/g, '');
  if (!/^\d{8,15}$/.test(wa)) errors.push('رقم واتساب غير صحيح (أدخل الرقم بصيغة دولية بدون +، مثال: 9665xxxxxxxx).');
  else out.whatsappNumber = wa;

  const phone = String(s.phone ?? '').trim();
  if (phone.length > 30) errors.push('رقم الهاتف طويل جداً.');
  else out.phone = phone;

  const address = String(s.address ?? '').trim();
  if (address.length > 200) errors.push('العنوان طويل جداً.');
  else out.address = address;

  const mapsEmbed = String(s.mapsEmbed ?? '').trim();
  if (mapsEmbed && !URL_RE.test(mapsEmbed)) errors.push('رابط تضمين الخريطة غير صحيح.');
  else out.mapsEmbed = mapsEmbed;

  const heroTitle = String(s.heroTitle ?? '').trim();
  if (heroTitle.length > 120) errors.push('عنوان الواجهة الرئيسية طويل جداً.');
  else out.heroTitle = heroTitle;

  const heroSubtitle = String(s.heroSubtitle ?? '').trim();
  if (heroSubtitle.length > 200) errors.push('وصف الواجهة الرئيسية طويل جداً.');
  else out.heroSubtitle = heroSubtitle;

  const socials = s.socials ?? {};
  out.socials = {};
  for (const key of ['instagram', 'twitter', 'snapchat', 'tiktok']) {
    const value = String(socials[key] ?? '').trim();
    if (value && !URL_RE.test(value)) {
      errors.push(`رابط ${key} غير صحيح.`);
    } else {
      out.socials[key] = value;
    }
  }

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, settings: out };
}
