'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import type { HeaderData } from '../../types';

export default function Header({ data }: { data: HeaderData }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname?.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_6px_24px_rgba(11,37,69,0.08)]' : ''
      }`}
    >
      <div className="mx-auto flex h-[70px] max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="relative block h-[44px] w-[132px] shrink-0 sm:h-[48px] sm:w-[144px]">
          <Image src={data.logo} alt={data.logo_text} fill priority sizes="144px" className="object-contain object-left" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
          {data.links.map((link, idx) => {
            const active = isActive(link.href);
            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * idx }}
              >
                <Link
                  href={link.href}
                  className={`group relative py-2 text-[14px] font-medium transition-colors ${
                    active ? 'text-[#1565d8]' : 'text-[#0b2545] hover:text-[#1565d8]'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-[#1565d8] transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {data.button_text && data.button_link && (
            <Link
              href={data.button_link}
              className="hidden rounded-lg bg-[#1565d8] px-5 py-2.5 text-[14px] font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-[#0d4fb3] sm:inline-flex"
            >
              {data.button_text}
            </Link>
          )}
          <button
            type="button"
            aria-label={data.menu_aria_label}
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e3ecf8] text-[#0b2545] lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-[#0b2545]/50 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 z-[60] flex h-full w-[82%] max-w-[340px] flex-col bg-white p-5 shadow-2xl lg:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="relative h-[42px] w-[128px]">
                  <Image src={data.logo} alt={data.logo_text} fill sizes="128px" className="object-contain object-left" />
                </div>
                <button
                  type="button"
                  aria-label={data.close_aria_label}
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf3ff] text-[#1565d8]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {data.links.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between rounded-lg px-3 py-3 text-[15px] font-medium ${
                        isActive(link.href) ? 'bg-[#eaf3ff] text-[#1565d8]' : 'text-[#0b2545] hover:bg-[#f4f8ff]'
                      }`}
                    >
                      {link.name}
                      <ArrowRight className="h-4 w-4 opacity-60" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
              {data.button_text && data.button_link && (
                <Link
                  href={data.button_link}
                  onClick={() => setOpen(false)}
                  className="mt-auto flex items-center justify-center rounded-lg bg-[#1565d8] px-5 py-3 text-[15px] font-semibold text-white"
                >
                  {data.button_text}
                </Link>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

