'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Gem } from 'lucide-react';
import Icon from '../../ui/Icon';
import type { WhyChooseUsSectionData } from '../../types';

function LogoIpsum({ color }: { color?: string }) {
  const accent = color || '#06b6d4';
  return (
    <div className="flex items-center gap-2 font-extrabold text-[15px] tracking-tight text-[#0b2545]">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill={accent} />
        <path
          d="M2 17l10 5 10-5"
          stroke={accent}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12l10 5 10-5"
          stroke={accent}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>Logoipsum</span>
    </div>
  );
}

export default function WhyChooseUs({ data }: { data: WhyChooseUsSectionData }) {
  if (!data) return null;

  return (
    <section className="bg-[#f6f9fe] border-y border-[#e8f1fc] py-10 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Main 2-Column Grid */}
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
          {/* Text & Feature Cards (Shows FIRST on mobile with order-1, on desktop sits right with lg:order-2) */}
          <div className="order-1 lg:order-2">
            {/* Eyebrow: — Why Choose Us — */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45 }}
              className="flex items-center gap-2.5"
            >
              <span className="h-[2px] w-6 sm:w-8 rounded-full bg-[#1565d8]" />
              <span className="text-[12.5px] sm:text-[14px] font-bold tracking-wide uppercase text-[#1565d8]">
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
              className="mt-3 text-[26px] font-black leading-[1.2] tracking-tight sm:text-[32px] lg:text-[38px]"
            >
              <span className="block text-[#0b2545]">{data.title_black}</span>
              <span className="block text-[#1565d8]">{data.title_blue}</span>
            </motion.h2>

            {/* 4 Feature Cards: Single vertical column on mobile, 2x2 grid on tablet+ */}
            <div className="mt-6 sm:mt-8 flex flex-col gap-3.5 sm:grid sm:grid-cols-2 sm:gap-4">
              {data.features.map((feat, idx) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: 0.1 + idx * 0.08, duration: 0.45 }}
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-4 rounded-[20px] sm:rounded-2xl border border-[#dce8f8] bg-white px-5 py-4 sm:p-4 shadow-[0_4px_16px_rgba(11,37,69,0.04)] transition-all duration-300 hover:border-[#1565d8]/40 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#edf5fd] text-[#1565d8]">
                    <Icon name={feat.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="text-[15.5px] sm:text-[16px] font-bold text-[#0b2545]">
                    {feat.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Arched Backdrop with Laundry Specialist Photo (Shows BELOW cards on mobile with order-2, on desktop sits left with lg:order-1) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1 flex justify-center mt-6 lg:mt-0"
          >
            <div className="relative aspect-[3/3.8] w-[260px] sm:w-[320px] lg:w-[350px] overflow-hidden rounded-t-[140px] rounded-b-[36px] bg-gradient-to-b from-[#d9ebff] via-[#e5f1ff] to-[#f0f6ff] p-3 shadow-[0_12px_36px_rgba(21,101,216,0.12)] border border-[#d2e4ff]">
              <div className="relative h-full w-full overflow-hidden rounded-t-[130px] rounded-b-[28px]">
                <Image
                  src={data.image}
                  alt={data.image_alt || 'Why choose FreshFold laundry service'}
                  fill
                  sizes="(max-width: 640px) 260px, 350px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Partner / Collaborator Ribbon */}
        {data.partners && data.partners.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="mt-10 sm:mt-14 rounded-2xl sm:rounded-3xl border border-[#d8e8fc] bg-[#edf5ff] p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm"
          >
            {/* Left title with gem/diamond icon */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1565d8] text-white shadow-sm">
                <Gem className="h-5 w-5" />
              </div>
              <span className="text-[14px] sm:text-[15px] font-bold text-[#0b2545]">
                {data.partners_title}
              </span>
            </div>

            {/* Right logos */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {data.partners.map((partner, idx) => (
                <LogoIpsum key={idx} color={partner.color} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
