'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, CircleCheck } from 'lucide-react';
import Icon from '../../ui/Icon';
import type { ServiceDetailData, ServiceItem, ServiceSidebarData } from '../../types';

interface ServiceDetailProps {
  data: ServiceDetailData;
  services: ServiceItem[];
  sidebar: ServiceSidebarData;
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5 },
};

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[20px] font-extrabold text-[#0b2545] sm:text-[22px]">
      {children}
      <span className="mt-1.5 block h-[3px] w-10 rounded-full bg-[#1565d8]" />
    </h3>
  );
}

export default function ServiceDetail({ data, services, sidebar }: ServiceDetailProps) {
  const half = Math.ceil(data.benefits.length / 2);
  const benefitColumns = [data.benefits.slice(0, half), data.benefits.slice(half)];

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto grid max-w-[1200px] items-start gap-8 px-4 sm:px-6 lg:grid-cols-[290px_1fr] lg:gap-10">
        {/* Sidebar */}
        <aside className="order-2 flex flex-col gap-6 lg:sticky lg:top-24 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-[#e3ecf8] bg-gradient-to-b from-[#f4f8ff] to-white p-4 shadow-[0_10px_30px_rgba(11,37,69,0.06)]"
          >
            <h3 className="mb-3 px-1 text-[17px] font-bold text-[#0b2545]">
              {sidebar.title}
              <span className="mt-1.5 block h-[3px] w-10 rounded-full bg-[#1565d8]" />
            </h3>
            <ul className="flex flex-col gap-1">
              {services.map((service) => {
                const active = service.slug === data.slug;
                return (
                  <li key={service.slug}>
                    <Link
                      href={service.href}
                      className={`group flex items-center gap-3 rounded-lg px-3 py-3 text-[14px] font-semibold transition-all ${
                        active
                          ? 'bg-[#1565d8] text-white shadow-md shadow-blue-600/25'
                          : 'border-b border-[#eef3fa] text-[#0b2545] hover:bg-[#eaf3ff] hover:text-[#1565d8]'
                      }`}
                    >
                      <Icon name={service.icon} className={`h-[18px] w-[18px] ${active ? 'text-white' : 'text-[#1565d8]'}`} />
                      <span className="flex-1">{service.short_title}</span>
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="overflow-hidden rounded-2xl bg-gradient-to-b from-[#eaf3ff] to-[#d9e9ff] shadow-[0_10px_30px_rgba(11,37,69,0.06)]"
          >
            <div className="relative h-[170px] w-full">
              <Image src={sidebar.cta.image} alt={sidebar.cta.image_alt} fill sizes="290px" className="object-cover" />
            </div>
            <div className="p-5">
              <h4 className="text-[20px] font-extrabold leading-tight text-[#0b2545]">{sidebar.cta.title}</h4>
              <p className="mt-2 text-[13.5px] leading-6 text-[#4b5b73]">{sidebar.cta.description}</p>
              <Link
                href={sidebar.cta.button_link}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#1565d8] px-5 py-2.5 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#0d4fb3]"
              >
                {sidebar.cta.button_text}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </aside>

        {/* Main content */}
        <div className="order-1 lg:order-2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[26px] font-extrabold leading-[1.15] tracking-tight text-[#0b2545] sm:text-[34px] lg:text-[38px]"
          >
            {data.title_black}
            <span className="block text-[#1565d8]">{data.title_blue}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-4 text-[14.5px] leading-7 text-[#4b5b73] sm:text-[15px]"
          >
            {data.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="relative mt-6 aspect-[16/7] w-full overflow-hidden rounded-2xl"
          >
            <Image src={data.image} alt={data.image_alt || data.name} fill priority sizes="(max-width: 1024px) 100vw, 860px" className="object-cover" />
          </motion.div>

          <motion.div {...fadeUp} className="mt-8">
            <SubHeading>{data.overview_title}</SubHeading>
            <p className="mt-3 text-[14.5px] leading-7 text-[#4b5b73]">{data.overview_description}</p>
          </motion.div>

          <motion.div {...fadeUp} className="mt-8">
            <SubHeading>{data.included_title}</SubHeading>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {data.included.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.45 }}
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-3 rounded-xl border border-[#e3ecf8] bg-white p-4 shadow-[0_8px_24px_rgba(11,37,69,0.05)]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eaf3ff] text-[#1565d8]">
                    <Icon name={item.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <h4 className="text-[15px] font-bold text-[#0b2545]">{item.title}</h4>
                    <p className="text-[12.5px] leading-5 text-[#4b5b73]">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="mt-8">
            <SubHeading>{data.benefits_title}</SubHeading>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-0">
              {benefitColumns.map((col, colIdx) => (
                <ul key={colIdx} className={`space-y-3 ${colIdx === 1 ? 'sm:border-l sm:border-[#e3ecf8] sm:pl-6' : 'sm:pr-6'}`}>
                  {col.map((benefit, idx) => (
                    <motion.li
                      key={benefit}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08 }}
                      className="flex items-start gap-2.5 text-[14px] text-[#0b2545]"
                    >
                      <CircleCheck className="mt-0.5 h-[18px] w-[18px] shrink-0 fill-[#1565d8] text-white" />
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

