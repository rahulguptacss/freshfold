'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { HeroSectionData } from '../../types';

export default function Hero({ data }: { data: HeroSectionData }) {
  return (
    <section className="bg-white pb-3 pt-3 sm:pb-5 sm:pt-5">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#eaf3ff] via-[#f1f7ff] to-[#e3efff] px-6 py-7 sm:px-10 sm:py-9 lg:px-12"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#1565d8]/10 blur-2xl" />
          <div className="relative grid items-center gap-6 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
            <h1 className="text-[28px] font-extrabold leading-[1.2] tracking-tight text-[#0b2545] sm:text-[36px] lg:text-[38px] xl:text-[40px]">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="block"
              >
                {data.title_line1}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="block text-[#1565d8]"
              >
                {data.title_line2}
              </motion.span>
            </h1>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <p className="text-[14.5px] leading-7 text-[#4b5b73] sm:text-[15px]">{data.description}</p>
              <Link
                href={data.button_link}
                className="mt-5 inline-flex rounded-lg bg-[#1565d8] px-6 py-3 text-[14px] font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:bg-[#0d4fb3]"
              >
                {data.button_text}
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {data.images.map((img, idx) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.15, duration: 0.6 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

