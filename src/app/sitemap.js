import { getCars } from '@/lib/store';

const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap() {
  const cars = await getCars();
  const staticPages = ['', '/cars', '/about', '/contact'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const carPages = cars.map((car) => ({
    url: `${base}/cars/${car.id}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...carPages];
}
