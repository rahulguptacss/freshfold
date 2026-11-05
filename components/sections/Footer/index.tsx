'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Mail, MapPin, Phone } from 'lucide-react';
import type { FooterData } from '../../types';

export default function Footer({ data }: { data: FooterData }) {
  return (
    <footer className="bg-[#0a1e3c] text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mx-auto max-w-[1200px] px-4 pt-12 sm:px-6"
      >
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1.2fr]">
          <div className="flex flex-col justify-between gap-6">
            <Link href="/" className="relative block h-[56px] w-[170px]">
              <Image src={data.logo} alt={data.logo_text} fill sizes="170px" className="object-contain object-left" />
            </Link>
            {data.image && (
              <div className="relative hidden h-[110px] w-[110px] overflow-hidden rounded-lg md:block">
                <Image src={data.image} alt={data.image_alt || ''} fill sizes="110px" className="object-cover" />
              </div>
            )}
          </div>

          <div>
            {data.quick_links_title && (
              <h4 className="mb-4 text-[16px] font-semibold md:sr-only">{data.quick_links_title}</h4>
            )}
            <ul className="space-y-2.5 md:pt-14">
              {data.quick_links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-[14px] text-white/80 transition-colors hover:text-white"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-[#5aa2ff] transition-transform group-hover:translate-x-1" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            {data.contact_title && <h4 className="mb-4 text-[16px] font-semibold md:sr-only">{data.contact_title}</h4>}
            <ul className="space-y-4 text-[14px] text-white/85 md:pt-14">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#5aa2ff]" />
                <span>
                  {data.contact.address_lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
              <li>
                <a href={data.contact.phone_href} className="flex items-center gap-3 hover:text-white">
                  <Phone className="h-[18px] w-[18px] shrink-0 text-[#5aa2ff]" />
                  {data.contact.phone}
                </a>
              </li>
              <li>
                <a href={data.contact.email_href} className="flex items-center gap-3 underline-offset-4 hover:text-white hover:underline">
                  <Mail className="h-[18px] w-[18px] shrink-0 text-[#5aa2ff]" />
                  {data.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 py-5 text-[13px] text-white/70">{data.copyright}</div>
      </motion.div>
    </footer>
  );
}

