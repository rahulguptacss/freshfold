'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Icon from '../../ui/Icon';
import type { HowItWorksSectionData } from '../../types';

export default function HowItWorks({ data }: { data: HowItWorksSectionData }) {
  return (
    <section className="bg-white py-9 sm:py-12 lg:py-14">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
        {/* Left Column: Heading + 3D Laundry Illustration */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            {/* Eyebrow: — How It Works — */}
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-6 sm:w-8 rounded-full bg-[#1565d8]" />
              <span className="text-[13px] sm:text-[14px] font-semibold tracking-wide text-[#1565d8]">
                {data.eyebrow}
              </span>
              <span className="h-[2px] w-6 sm:w-8 rounded-full bg-[#1565d8]" />
            </div>

            {/* Title: 2 lines */}
            <h2 className="mt-3 text-[20px] font-black leading-[1.25] tracking-tight sm:text-[24px] md:text-[28px] lg:text-[30px] xl:text-[32px]">
              <span className="block text-[#0b2545]">{data.title_black}</span>
              <span className="block text-[#1565d8]">{data.title_blue}</span>
            </h2>

            {/* Description */}
            <p className="mt-3.5 max-w-[440px] text-[14px] sm:text-[14.5px] leading-relaxed text-[#4b5b73]">
              {data.description}
            </p>
          </motion.div>

          {/* Illustration Image */}
          {data.image && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="relative mt-8 aspect-square w-full max-w-[420px]"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative h-full w-full"
              >
                <Image
                  src={data.image}
                  alt={data.image_alt || 'How FreshFold Works'}
                  fill
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Right Column: Steps with timeline connecting lines */}
        <div className="relative pl-5 sm:pl-6">
          <div className="flex flex-col gap-6 sm:gap-7">
            {data.steps.map((step, idx) => {
              const isLast = idx === data.steps.length - 1;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: idx * 0.14, duration: 0.5 }}
                  className="relative"
                >
                  {/* Dashed connector line between badges */}
                  {!isLast && (
                    <div
                      className="absolute -left-[1px] sm:-left-[1px] top-1/2 h-[calc(100%+1.5rem)] sm:h-[calc(100%+1.75rem)] w-0 border-l-2 border-dashed border-[#1565d8] z-0"
                      aria-hidden="true"
                    />
                  )}

                  {/* Circular Number Badge (01, 02, 03) */}
                  <div className="absolute -left-[19px] sm:-left-[20px] top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#1565d8] text-[13px] sm:text-[14px] font-bold text-white shadow-sm ring-4 ring-white">
                    {step.number}
                  </div>

                  {/* Pill / Stadium Card */}
                  <div className="flex items-center gap-4 sm:gap-5 rounded-[26px] sm:rounded-[34px] border border-[#dce8f8] bg-white p-3.5 sm:p-4 sm:pl-6 shadow-[0_4px_24px_rgba(21,101,216,0.04)] transition-all duration-300 hover:border-[#1565d8]/40 hover:shadow-[0_8px_30px_rgba(21,101,216,0.08)]">
                    {/* Big Circular Light Blue Icon Container */}
                    <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full bg-[#eaf3ff] text-[#1565d8]">
                      <Icon name={step.icon} className="h-8 w-8 sm:h-9 sm:w-9" />
                    </div>

                    {/* Text block */}
                    <div className="flex-1 pr-2 sm:pr-4">
                      <h3 className="text-[18px] sm:text-[20px] font-extrabold tracking-tight text-[#0b2545]">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-[13px] sm:text-[14px] leading-relaxed text-[#4b5b73]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
