'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow?: string;
  title?: string;
  titleBlack?: string;
  titleBlue?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

/** Shared eyebrow pill + heading used across sections */
export default function SectionHeading({
  eyebrow,
  title,
  titleBlack,
  titleBlue,
  description,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const center = align === 'center';
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`${center ? 'mx-auto text-center' : 'text-left'} max-w-2xl ${className}`}
    >
      {eyebrow && (
        <span className="inline-block rounded-full bg-[#eaf3ff] px-3.5 py-1 text-[12px] font-semibold text-[#1565d8]">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-[28px] font-extrabold leading-[1.15] tracking-tight text-[#0b2545] sm:text-[34px] lg:text-[38px]">
        {title}
        {titleBlack && <>{titleBlack} </>}
        {titleBlue && <span className="text-[#1565d8]">{titleBlue}</span>}
      </h2>
      {description && (
        <p className={`mt-3 text-[14.5px] leading-7 text-[#4b5b73] sm:text-[15px] ${center ? 'mx-auto max-w-xl' : ''}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}

