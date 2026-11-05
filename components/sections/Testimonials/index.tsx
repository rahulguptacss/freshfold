'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import type { TestimonialsSectionData } from '../../types';

export default function Testimonials({ data }: { data: TestimonialsSectionData }) {
  const items = data.items || [];
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide and sliding only if more than 1 item
  const canSlide = items.length > 1;
  const intervalMs = data.autoplay_interval ?? 3000;

  useEffect(() => {
    if (!canSlide || isPaused) return;

    const timer = setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev + 1) % items.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [canSlide, isPaused, items.length, intervalMs]);

  if (!items.length) return null;

  const current = items[active];

  // 4 corner avatar coordinates around the central quote (md/lg screens)
  const avatarPositions = [
    'left-2 sm:left-6 lg:left-10 top-4 sm:top-6', // Top-Left
    'right-2 sm:right-6 lg:right-10 top-2 sm:top-4', // Top-Right
    'left-6 sm:left-12 lg:left-16 bottom-3 sm:bottom-5', // Bottom-Left
    'right-6 sm:right-12 lg:right-16 bottom-3 sm:bottom-5', // Bottom-Right
  ];

  return (
    <section className="bg-[#f6f9fe] border-y border-[#e8f1fc] py-9 sm:py-12 lg:py-14 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Eyebrow: — Testimonials — */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
          className="flex items-center justify-center gap-2.5"
        >
          <span className="h-[2px] w-6 sm:w-8 rounded-full bg-[#1565d8]" />
          <span className="text-[13px] sm:text-[14px] font-semibold tracking-wide text-[#1565d8]">
            {data.eyebrow}
          </span>
          <span className="h-[2px] w-6 sm:w-8 rounded-full bg-[#1565d8]" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-3 text-center text-[28px] font-black leading-tight tracking-tight text-[#0b2545] sm:text-[34px] lg:text-[40px]"
        >
          {data.title}
        </motion.h2>

        {/* Subtitle description */}
        {data.description && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="mx-auto mt-2.5 max-w-[620px] text-center text-[13.5px] sm:text-[14.5px] leading-relaxed text-[#4b5b73]"
          >
            {data.description}
          </motion.p>
        )}

        {/* Relative Container with Floating Rounded-Square Avatars */}
        <div
          className="relative mx-auto mt-7 sm:mt-9 max-w-[1050px] min-h-[300px] sm:min-h-[330px] flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* 4 Floating Customer Avatar Rounded Squares (Desktop / Tablet) */}
          {items.slice(0, 4).map((item, idx) => {
            const isSelected = idx === active;

            return (
              <motion.button
                key={item.id}
                type="button"
                aria-label={item.name}
                onClick={() => {
                  if (canSlide) {
                    setDirection(idx > active ? 1 : -1);
                    setActive(idx);
                  }
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: 0.1 + idx * 0.08, duration: 0.45 }}
                className={`absolute hidden md:block ${avatarPositions[idx]} h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 rounded-2xl sm:rounded-[22px] bg-white p-1 shadow-[0_8px_24px_rgba(11,37,69,0.08)] border border-[#edf3fc] transition-all duration-300 ${
                  isSelected
                    ? 'ring-2 ring-[#1565d8] scale-105 shadow-xl'
                    : 'opacity-85 hover:opacity-100 hover:scale-105'
                }`}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[14px] sm:rounded-[18px]">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
              </motion.button>
            );
          })}

          {/* Central Testimonial Content (No box border, clean and open) */}
          <div className="mx-auto w-full max-w-[620px] text-center px-4 py-4">
            {/* Quote Icon Badge */}
            <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#eaf3ff] text-[#1565d8] mb-5 shadow-sm">
              <Quote className="h-5 w-5 sm:h-6 sm:w-6 fill-[#1565d8]" />
            </div>

            {/* Slideable Testimonial details */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({
                    opacity: 0,
                    x: canSlide ? (dir > 0 ? 30 : -30) : 0,
                  }),
                  center: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.4, ease: 'easeOut' },
                  },
                  exit: (dir: number) => ({
                    opacity: 0,
                    x: canSlide ? (dir > 0 ? -30 : 30) : 0,
                    transition: { duration: 0.3, ease: 'easeIn' },
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <p className="text-[14.5px] sm:text-[16px] leading-[1.8] text-[#334155] font-normal">
                  “{current.quote}”
                </p>

                {/* 5 Gold Stars */}
                <div className="mt-4 flex items-center justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 sm:h-4.5 sm:w-4.5 ${
                        i < (current.rating || 5)
                          ? 'fill-[#f59e0b] text-[#f59e0b]'
                          : 'fill-transparent text-[#cbd5e1]'
                      }`}
                    />
                  ))}
                </div>

                {/* Customer Name */}
                <h3 className="mt-3 text-[16px] sm:text-[17px] font-bold text-[#0b2545]">
                  {current.name}
                </h3>

                {/* Customer Role */}
                <p className="mt-0.5 text-[13px] text-[#64748b]">
                  {current.role}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Pagination dots (only if items.length > 1) */}
            {canSlide && (
              <div className="mt-6 flex items-center justify-center gap-1.5">
                {items.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => {
                      setDirection(idx > active ? 1 : -1);
                      setActive(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === active
                        ? 'w-6 bg-[#1565d8]'
                        : 'w-2 bg-[#d4e2f5] hover:bg-[#b8d1f2]'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile / Tablet Avatar Row */}
        <div className="mt-6 flex items-center justify-center gap-3 md:hidden">
          {items.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              aria-label={item.name}
              onClick={() => {
                if (canSlide) {
                  setDirection(idx > active ? 1 : -1);
                  setActive(idx);
                }
              }}
              className={`relative h-14 w-14 overflow-hidden rounded-xl bg-white p-0.5 shadow-sm transition-all ${
                idx === active
                  ? 'ring-2 ring-[#1565d8] scale-105'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[10px]">
                <Image src={item.avatar} alt={item.name} fill sizes="56px" className="object-cover" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
