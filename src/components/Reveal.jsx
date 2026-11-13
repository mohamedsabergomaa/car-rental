'use client';

import { motion, useReducedMotion } from 'motion/react';

// Scroll-reveal wrapper. Honors prefers-reduced-motion by rendering statically.
export default function Reveal({ children, delay = 0, y = 28, className, as = 'div' }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;

  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
