'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import CarCard from './CarCard';
import { getDict, DEFAULT_LOCALE } from '@/lib/i18n';

// Cars grid with category filter pills. Receives plain car data from the server.
export default function CarsExplorer({ cars, whatsappNumber }) {
  const dict = getDict(DEFAULT_LOCALE);
  const reduce = useReducedMotion();
  const [active, setActive] = useState('all');

  const categories = useMemo(() => {
    const present = [...new Set(cars.map((c) => c.category))];
    return ['all', ...present];
  }, [cars]);

  const filtered = active === 'all' ? cars : cars.filter((c) => c.category === active);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2.5" role="group" aria-label="تصفية حسب الفئة">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
              active === cat
                ? 'bg-gold-500 text-ink-950 shadow-lg shadow-gold-600/25'
                : 'border border-white/10 bg-ink-800 text-cream-dim hover:border-gold-500/50 hover:text-gold-300'
            }`}
          >
            {cat === 'all' ? dict.cars.filterAll : dict.categories[cat]}
          </button>
        ))}
      </div>

      <p className="mb-6 text-sm text-cream-dim" aria-live="polite">
        {dict.cars.resultsCount(filtered.length)}
      </p>

      {filtered.length === 0 ? (
        <div className="card flex flex-col items-center py-20 text-center">
          <span className="text-4xl mb-4" aria-hidden="true">🚗</span>
          <p className="text-cream-dim">{dict.cars.empty}</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((car, i) => (
              <motion.div
                key={car.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: reduce ? 0 : i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <CarCard car={car} whatsappNumber={whatsappNumber} priority={i < 3} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
