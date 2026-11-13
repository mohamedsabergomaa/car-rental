'use client';

import { usePathname } from 'next/navigation';

// Floating WhatsApp button — hidden on admin pages.
export default function WhatsAppFloat({ href }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      className="fixed bottom-6 start-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition-transform duration-300 hover:scale-110 active:scale-95"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.6.8 5 2.3 7L4 29l7.3-2.3c1.9 1 4 1.6 6.2 1.6h.5c6.1-.3 11-5.4 11-11.4C29 8.3 23.6 3 17 3h-1Zm0 2.4c6 0 10.7 4.7 10.7 10.5 0 4.9-3.4 9.1-8.1 10.2-1 .2-2.1.3-3.2.1-1.6-.2-3.2-.8-4.5-1.7l-.5-.3-3.9 1.2 1.2-3.8-.3-.5c-1.3-1.9-2-4.1-2-6.3C5.4 10 10 5.4 16 5.4Zm-4.6 4.2c-.3 0-.7.1-1 .5-.4.4-1.2 1.2-1.2 2.8 0 1.7 1.2 3.3 1.4 3.5.1.2 2.3 3.6 5.6 4.9 2.8 1.1 3.3.9 3.9.8.6-.1 1.8-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4l-2.2-1.1c-.3-.1-.5-.1-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.6.1-.3 0-.5 0-.6l-1-2.4c-.3-.6-.5-.7-.8-.8h-.7Z" />
      </svg>
    </a>
  );
}
