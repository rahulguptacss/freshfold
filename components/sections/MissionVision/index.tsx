'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { MissionVisionSectionData } from '../../types';

export default function MissionVision({ data }: { data: MissionVisionSectionData }) {
  if (!data) return null;

  return (
    <section className="bg-white py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Eyebrow: — OUR PURPOSE (Left-aligned) */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
          className="flex items-center gap-2.5"
        >
          <span className="h-[2.5px] w-7 sm:w-8 rounded-full bg-[#1565d8]" />
          <span className="text-[13px] sm:text-[14px] font-bold tracking-wide uppercase text-[#1565d8]">
            {data.eyebrow}
          </span>
        </motion.div>

        {/* Heading: Left-aligned */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-3 text-left text-[28px] sm:text-[34px] lg:text-[40px] font-black leading-tight tracking-tight text-[#0b2545]"
        >
          {data.title}
        </motion.h2>

        {/* Subtitle: Left-aligned */}
        {data.description && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="mt-2 text-left text-[14px] sm:text-[15px] leading-relaxed text-[#4b5b73]"
          >
            {data.description}
          </motion.p>
        )}

        {/* 2-Column Cards */}
        <div className="mt-8 sm:mt-10 grid gap-8 md:grid-cols-2 md:gap-10">
          {data.items.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: 0.15 + idx * 0.14, duration: 0.55 }}
              className="group flex flex-col"
            >
              {/* Card Image with large rounded corners */}
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[22px] sm:rounded-[28px] bg-slate-100 shadow-[0_8px_24px_rgba(11,37,69,0.06)]">
                <Image
                  src={item.image}
                  alt={item.image_alt || item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 580px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Title */}
              <h3 className="mt-4 sm:mt-5 text-[22px] sm:text-[24px] lg:text-[26px] font-black tracking-tight text-[#0b2545]">
                {item.title}
              </h3>

              {/* Blue Accent Underline Line */}
              <span className="mt-2 sm:mt-2.5 mb-3.5 block h-[3px] w-12 rounded-full bg-[#1565d8]" />

              {/* Description */}
              <p className="text-[13.5px] sm:text-[14.5px] leading-[1.7] text-[#4b5b73]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
