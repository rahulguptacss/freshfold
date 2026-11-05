'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { TeamSectionData } from '../../types';

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.52-.14-2.73-.14-2.8 0-4.77 1.71-4.77 4.9v2.6H7v4h3v10.5h4V13.5z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Team({ data }: { data: TeamSectionData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentPage, setCurrentPage] = useState(data.pagination?.current_page || 1);
  const itemsPerPage = data.pagination?.items_per_page || 6;
  const totalPages =
    data.pagination?.total_pages || Math.max(1, Math.ceil((data.members?.length || 0) / itemsPerPage));

  if (!data) return null;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMembers =
    data.members && data.members.length > 0
      ? data.members.slice(startIndex, startIndex + itemsPerPage)
      : [];

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      window.scrollTo({
        top: rect.top + scrollTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section ref={sectionRef} className="bg-white py-12 sm:py-16 lg:py-20 scroll-mt-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Eyebrow: — OUR TEAM — */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
          className="flex items-center justify-center gap-2.5"
        >
          <span className="h-[2px] w-6 sm:w-8 rounded-full bg-[#1565d8]" />
          <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.16em] uppercase text-[#1565d8]">
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
          className="mt-3 text-center text-[28px] font-black leading-tight tracking-tight text-[#0b2545] sm:text-[34px] lg:text-[40px]"
        >
          {data.title_black} <span className="text-[#1565d8]">{data.title_blue}</span>
        </motion.h2>

        {/* Subtitle */}
        {data.description && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="mx-auto mt-2.5 max-w-[620px] text-center text-[13.5px] sm:text-[14.5px] leading-relaxed text-[#4b5b73]"
          >
            {data.description}
          </motion.p>
        )}

        {/* 3x2 Grid of Team Cards with animated page transition */}
        <div className="mt-10 sm:mt-12 min-h-[580px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
            >
              {currentMembers.map((member, idx) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (idx % 3) * 0.08, duration: 0.4 }}
                  whileHover={{ y: -5 }}
                  className="group relative aspect-[4/3] w-full overflow-hidden rounded-[22px] sm:rounded-[26px] bg-slate-100 shadow-[0_8px_24px_rgba(11,37,69,0.08)] transition-all duration-300 hover:shadow-[0_16px_36px_rgba(21,101,216,0.16)]"
                >
                  {/* Background Photo */}
                  <Image
                    src={member.image}
                    alt={member.image_alt || member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Top-Right Social Icons */}
                  <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5">
                    {member.socials.facebook && (
                      <a
                        href={member.socials.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on Facebook`}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-[#1565d8]"
                      >
                        <FacebookIcon className="h-3.5 w-3.5 fill-current" />
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on Twitter`}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-[#1565d8]"
                      >
                        <TwitterIcon className="h-3.5 w-3.5 fill-current" />
                      </a>
                    )}
                    {member.socials.instagram && (
                      <a
                        href={member.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on Instagram`}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-[#1565d8]"
                      >
                        <InstagramIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Dark Gradient Overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                  {/* Bottom Member Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-20 flex items-center">
                    {/* Vertical Blue Accent Bar */}
                    <span className="w-1 self-stretch rounded-full bg-[#1565d8] mr-3 shrink-0" />

                    <div>
                      <h3 className="text-[16.5px] sm:text-[17.5px] font-black tracking-tight text-white leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-[12.5px] sm:text-[13px] font-medium text-white/85 mt-0.5">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Bar */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-10 sm:mt-12 flex items-center justify-center gap-2.5 sm:gap-3"
        >
          {/* Prev Button */}
          <button
            type="button"
            aria-label="Previous Page"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex h-10 w-10 sm:h-11 sm:w-11 min-w-[40px] sm:min-w-[44px] items-center justify-center rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white text-[#64748b] transition-all hover:bg-blue-50/50 hover:text-[#1565d8] hover:border-[#1565d8]/60 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#64748b] disabled:hover:border-slate-200/90"
          >
            <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                type="button"
                aria-label={`Page ${pageNum}`}
                onClick={() => handlePageChange(pageNum)}
                className={`flex h-10 w-10 sm:h-11 sm:w-11 min-w-[40px] sm:min-w-[44px] items-center justify-center rounded-xl sm:rounded-2xl font-bold text-[14.5px] sm:text-[15px] transition-all ${
                  isActive
                    ? 'bg-[#1565d8] text-white border-2 border-[#0b2545] shadow-sm'
                    : 'border border-slate-200/90 bg-white text-[#2b3b52] hover:bg-blue-50/50 hover:text-[#1565d8] hover:border-[#1565d8]/60'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            type="button"
            aria-label="Next Page"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex h-10 w-10 sm:h-11 sm:w-11 min-w-[40px] sm:min-w-[44px] items-center justify-center rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white text-[#64748b] transition-all hover:bg-blue-50/50 hover:text-[#1565d8] hover:border-[#1565d8]/60 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#64748b] disabled:hover:border-slate-200/90"
          >
            <ChevronRight className="h-4 w-4 stroke-[2.5]" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
