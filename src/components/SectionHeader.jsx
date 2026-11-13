import Reveal from './Reveal';

// Section header. The gold rule takes the place of an "eyebrow" label,
// keeping the eyebrow count on the page to a minimum.
export default function SectionHeader({ title, subtitle, align = 'start', id }) {
  const centered = align === 'center';
  return (
    <Reveal className={`mb-10 lg:mb-14 ${centered ? 'text-center' : ''}`}>
      <span className="gold-rule block w-16 mx-0" aria-hidden="true" style={centered ? { marginInline: 'auto' } : undefined} />
      <h2 id={id} className="mt-4 text-3xl lg:text-4xl font-extrabold tracking-tight text-cream">{title}</h2>
      {subtitle && (
        <p className={`mt-3 text-cream-dim leading-relaxed max-w-[55ch] ${centered ? 'mx-auto' : ''}`}>{subtitle}</p>
      )}
    </Reveal>
  );
}
