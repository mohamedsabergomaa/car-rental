'use client';

import { useState } from 'react';
import { WhatsappLogo } from '@phosphor-icons/react/dist/ssr';
import { getDict, DEFAULT_LOCALE } from '@/lib/i18n';

// Simple inquiry form — composes a WhatsApp message and opens wa.me.
// No message is stored on the server; the visitor stays in control.
export default function ContactForm({ whatsappNumber }) {
  const dict = getDict(DEFAULT_LOCALE);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return setError('الرجاء إدخال الاسم.');
    if (message.trim().length < 5) return setError('الرجاء كتابة استفسارك (5 أحرف على الأقل).');
    setError('');
    const text = dict.whatsapp.contactForm(name.trim(), message.trim());
    const digits = String(whatsappNumber || '').replace(/[^\d]/g, '');
    window.open(`https://wa.me/${digits}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  }

  return (
    <form onSubmit={handleSubmit} className="card p-7" noValidate>
      <h2 className="text-xl font-bold mb-6">{dict.contact.formTitle}</h2>

      <div className="mb-4">
        <label htmlFor="contact-name" className="field-label">{dict.contact.formName}</label>
        <input
          id="contact-name"
          type="text"
          className="field"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={dict.contact.formNamePlaceholder}
          maxLength={60}
          required
        />
      </div>

      <div className="mb-5">
        <label htmlFor="contact-message" className="field-label">{dict.contact.formMessage}</label>
        <textarea
          id="contact-message"
          className="field min-h-[130px] resize-y"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={dict.contact.formMessagePlaceholder}
          maxLength={600}
          required
        />
      </div>

      {error && (
        <p className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-gold w-full">
        <WhatsappLogo size={18} aria-hidden="true" />
        {dict.contact.formSubmit}
      </button>
      <p className="mt-3 text-center text-xs text-cream-dim">{dict.contact.formNote}</p>
    </form>
  );
}
