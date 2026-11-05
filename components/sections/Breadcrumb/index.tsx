'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronsRight } from 'lucide-react';
import type { BreadcrumbData, BreadcrumbItem } from '../../types';

interface BreadcrumbProps {
  data?: BreadcrumbData;
  currentPage?: string;
  items?: BreadcrumbItem[];
}

export default function Breadcrumb({ data, currentPage, items: customItems }: BreadcrumbProps) {
  const rootItem = data?.items?.[0] ?? { name: 'Home', href: '/' };
  const items: BreadcrumbItem[] = customItems ?? [rootItem, { name: currentPage || data?.title || '', href: '#' }];
  const title = currentPage || data?.title;

  return (
    <section className="bg-white pt-4 sm:pt-6">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative h-[180px] overflow-hidden rounded-2xl sm:h-[230px] lg:h-[260px]"
        >
          {data?.background_image && (
            <Image
              src={data.background_image}
              alt={data.background_alt || ''}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-[75%_30%]"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a3d91]/95 via-[#1565d8]/75 to-transparent" />

          <div className="relative flex h-full flex-col justify-center px-6 sm:px-10 lg:px-12">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-[28px] font-extrabold text-white sm:text-[38px] lg:text-[44px]"
            >
              {title}
            </motion.h1>
            <motion.nav
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              aria-label="Breadcrumb"
              className="mt-2 flex flex-wrap items-center gap-1.5 text-[13.5px] font-medium text-white/90 sm:text-[14px]"
            >
              {items.map((item, idx) => {
                const last = idx === items.length - 1;
                return (
                  <React.Fragment key={`${item.name}-${idx}`}>
                    {idx > 0 && <ChevronsRight className="h-4 w-4 text-[#9fd0ff]" />}
                    {last ? (
                      <span className="text-white">{item.name}</span>
                    ) : (
                      <Link href={item.href} className="transition-colors hover:text-[#9fd0ff]">
                        {item.name}
                      </Link>
                    )}
                  </React.Fragment>
                );
              })}
            </motion.nav>
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 56 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-3 block h-[3px] rounded-full bg-[#5aa2ff]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

