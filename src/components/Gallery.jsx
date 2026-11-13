'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getDict, DEFAULT_LOCALE } from '@/lib/i18n';

// Car gallery: large main image + thumbnail strip (click or keyboard).
export default function Gallery({ images, alt }) {
  const dict = getDict(DEFAULT_LOCALE);
  const list = images.length > 0 ? images : ['/images/cars/hero.jpg'];
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-ink-800">
        <Image
          key={list[index]}
          src={list[index]}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover"
          priority
        />
      </div>

      {list.length > 1 && (
        <div className="mt-4 grid grid-cols-4 sm:grid-cols-5 gap-3" role="tablist" aria-label={dict.carDetails.specsTitle}>
          {list.map((img, i) => (
            <button
              key={img}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`${alt} — صورة ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`relative aspect-[16/10] overflow-hidden rounded-xl border transition-all duration-300 ${
                i === index ? 'border-gold-500 opacity-100' : 'border-white/10 opacity-55 hover:opacity-90'
              }`}
            >
              <Image src={img} alt="" fill sizes="15vw" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
