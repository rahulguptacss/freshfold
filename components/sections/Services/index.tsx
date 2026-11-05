'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Icon from '../../ui/Icon';
import SectionHeading from '../../ui/SectionHeading';
import type { ServicesSectionData } from '../../types';

interface ServicesProps {
  data: ServicesSectionData;
  homeOnly?: boolean;
}

export default function Services({ data, homeOnly = false }: ServicesProps) {
  const items = homeOnly ? data.items.filter((item) => item.show_on_home) : data.items;

  return (
    <section className="bg-[#f6f9fe] border-y border-[#e8f1fc] py-9 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading
          eyebrow={data.eyebrow}
          titleBlack={data.title_black}
          titleBlue={data.title_blue}
          description={data.description}
        />

        <div className="mx-auto mt-8 sm:mt-9 grid max-w-[1000px] gap-5 md:grid-cols-2">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: (idx % 2) * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <Link
                href={item.href}
                className="group flex h-full gap-4 rounded-2xl border border-[#e3ecf8] bg-white p-3 shadow-[0_8px_28px_rgba(11,37,69,0.06)] transition-shadow hover:shadow-[0_14px_36px_rgba(21,101,216,0.14)] sm:p-4"
              >
                <div className="relative aspect-square w-[110px] shrink-0 overflow-hidden rounded-xl sm:w-[150px]">
                  <Image
                    src={item.image}
                    alt={item.image_alt}
                    fill
                    sizes="150px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col justify-center py-1">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eaf3ff] text-[#1565d8] transition-colors group-hover:bg-[#1565d8] group-hover:text-white">
                      <Icon name={item.icon} className="h-[18px] w-[18px]" />
                    </span>
                    <h3 className="text-[16px] font-bold text-[#0b2545] sm:text-[17px]">{item.title}</h3>
                  </div>
                  <p className="mt-2.5 text-[13.5px] leading-6 text-[#4b5b73]">{item.description}</p>
                  {data.button_text && (
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1565d8]">
                      {data.button_text}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

