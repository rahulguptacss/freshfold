'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Icon from '../../ui/Icon';
import type { AboutSectionData } from '../../types';

export default function About({ data }: { data: AboutSectionData }) {
  const items =
    data.items && data.items.length > 0
      ? data.items
      : data.paragraphs
        ? data.paragraphs.map((text, idx) => ({
            icon: idx === 0 ? 'WashingMachine' : 'FoldedLaundry',
            text,
          }))
        : [];

  const titleBlack = data.title_black ?? data.title?.split(' ')[0] ?? '';
  const titleBlue = data.title_blue ?? data.title?.split(' ').slice(1).join(' ') ?? '';

  return (
    <section className="bg-white pt-4 sm:pt-6 lg:pt-8">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Eyebrow: — About Us — */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
          className="flex items-center gap-2.5"
        >
          <span className="h-[2px] w-6 sm:w-8 rounded-full bg-[#1565d8]" />
          <span className="text-[13px] sm:text-[14px] font-semibold tracking-wide text-[#1565d8]">
            {data.eyebrow}
          </span>
          <span className="h-[2px] w-6 sm:w-8 rounded-full bg-[#1565d8]" />
        </motion.div>

        {/* Main Heading: Your Trusted Laundry Partner */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-3 text-[28px] font-black leading-tight tracking-tight sm:text-[36px] lg:text-[42px]"
        >
          <span className="text-[#0b2545]">{titleBlack} </span>
          <span className="text-[#1565d8]">{titleBlue}</span>
        </motion.h2>

        {/* Accent Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.16 }}
          style={{ originX: 0 }}
          className="mt-3.5 mb-8 sm:mb-10 h-[3.5px] w-14 sm:w-16 rounded-full bg-[#1565d8]"
        />

        {/* 2-Column Grid with Vertical Divider */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 pb-6 sm:pb-8">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: 0.12 + idx * 0.12, duration: 0.5 }}
              className={`flex items-start gap-4 sm:gap-5 ${
                idx > 0
                  ? 'md:border-l md:border-[#e2ecf9] md:pl-8 lg:pl-12'
                  : 'md:pr-8 lg:pr-12'
              }`}
            >
              {/* Rounded Light Blue Icon Box */}
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl border border-[#cfe2fe] bg-[#edf5ff] text-[#1565d8] shadow-sm">
                <Icon name={item.icon} className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>

              {/* Description */}
              <p className="pt-0.5 text-[13.5px] sm:text-[14px] lg:text-[14.5px] leading-[1.7] text-[#4b5b73]">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Panoramic Laundry Counter Banner Image */}
      {data.image && (
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative h-[220px] w-full overflow-hidden sm:h-[340px] lg:h-[440px]"
        >
          <Image
            src={data.image}
            alt={data.image_alt || 'FreshFold Laundry Service'}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      )}
    </section>
  );
}
