'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Icon from '../../ui/Icon';
import type { CtaSectionData } from '../../types';

export default function Cta({ data }: { data: CtaSectionData }) {
  return (
    <section className="bg-white pt-6 pb-8 sm:pt-8 sm:pb-12 overflow-visible">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55 }}
          className="relative rounded-[28px] sm:rounded-[36px] bg-gradient-to-r from-[#0055d4] via-[#0962e8] to-[#0055d4] shadow-[0_16px_44px_rgba(2,92,226,0.22)]"
        >
          {/* Translucent background curves on the right */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px] sm:rounded-[36px]">
            <svg
              className="absolute -right-6 top-0 h-full w-[45%] opacity-25"
              viewBox="0 0 400 160"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M100 160 C 220 120, 280 40, 400 0 L400 160 Z"
                fill="#38bdf8"
              />
              <path
                d="M0 160 C 140 130, 240 60, 400 30 L400 160 Z"
                fill="#ffffff"
                opacity="0.45"
              />
            </svg>
          </div>

          {/* Banner content */}
          <div className="relative flex flex-col items-center gap-4 px-5 py-6 text-center sm:flex-row sm:gap-4 sm:px-6 sm:py-3.5 sm:text-left lg:gap-6 lg:px-8">
            {/* Pop-out 3D Laundry Basket */}
            <div className="relative -mt-12 sm:-mt-16 -mb-2 sm:-mb-3 h-[130px] w-[160px] sm:h-[155px] sm:w-[195px] lg:h-[170px] lg:w-[215px] shrink-0">
              {/* Radiating sparkle strokes near detergent bottle cap */}
              <svg
                className="absolute -top-1.5 right-6 sm:right-7 h-6 w-6 text-[#38bdf8]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="8" y1="12" x2="3" y2="10" />
                <line x1="10" y1="7" x2="6" y2="4" />
                <line x1="14" y1="4" x2="13" y2="1" />
              </svg>

              <Image
                src={data.image}
                alt={data.image_alt || 'Laundry basket with detergents'}
                fill
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 195px, 215px"
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>

            {/* Vertical White Divider Line */}
            <div
              className="h-10 sm:h-12 w-[1.5px] bg-white/40 shrink-0 hidden sm:block"
              aria-hidden="true"
            />

            {/* Title & Description */}
            <div className="flex-1 py-1">
              <h2 className="text-[19px] sm:text-[22px] lg:text-[25px] font-black tracking-tight text-white leading-tight">
                {data.title_black}{' '}
                <span className="text-[#38bdf8]">{data.title_blue}</span>{' '}
                {data.title_end}
              </h2>
              <p className="mt-1 text-[12.5px] sm:text-[13.5px] lg:text-[14px] text-white/90 leading-relaxed font-normal">
                {data.description}
              </p>
            </div>

            {/* White Pill Action Button */}
            <Link
              href={data.button_link}
              className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-[13.5px] sm:text-[14.5px] font-bold text-[#0b2545] shadow-md transition-all duration-300 hover:shadow-xl hover:bg-slate-50 hover:-translate-y-0.5"
            >
              <Icon
                name="Truck"
                className="h-4 w-4 text-[#1565d8] transition-transform group-hover:-translate-x-0.5"
              />
              <span>{data.button_text}</span>
              <ArrowRight className="h-4 w-4 text-[#1565d8] transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
