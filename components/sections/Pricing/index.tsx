'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Crown, Headphones, Leaf, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import type { PricingSectionData } from '../../types';

// Custom SVG Icons matching the reference design
function LayersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function HangerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a3 3 0 0 0-3 3c0 1.2.7 2.3 1.8 2.8L2.5 15.5A2 2 0 0 0 4 19h16a2 2 0 0 0 1.5-3.5L13.2 8.8A3 3 0 0 0 12 3z" />
      <circle cx="12" cy="6" r="1" fill="currentColor" />
    </svg>
  );
}

function WashingMachineIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="20" x="3" y="2" rx="2" />
      <circle cx="12" cy="13" r="5" />
      <path d="M12 10a3 3 0 0 1 3 3" />
      <circle cx="7" cy="5.5" r="0.8" fill="currentColor" />
      <circle cx="10" cy="5.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

function IronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18h16a3 3 0 0 0 3-3c0-3.5-3-7-7-7H7a4 4 0 0 0-4 4v6z" />
      <path d="M10 8V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" />
    </svg>
  );
}

function renderRowIcon(icon: string) {
  const iconClass = 'h-5 w-5';
  switch (icon) {
    case 'WashingMachine':
      return <WashingMachineIcon className={iconClass} />;
    case 'Iron':
      return <IronIcon className={iconClass} />;
    case 'Sparkles':
      return <Sparkles className={iconClass} />;
    case 'Leaf':
      return <Leaf className={iconClass} />;
    case 'Truck':
      return <Truck className={iconClass} />;
    case 'ShieldCheck':
      return <ShieldCheck className={iconClass} />;
    case 'Headphones':
      return <Headphones className={iconClass} />;
    default:
      return <Check className={iconClass} />;
  }
}

function renderColumnIcon(icon?: string) {
  const iconClass = 'h-5 w-5 sm:h-6 sm:w-6';
  switch (icon) {
    case 'Layers':
      return <LayersIcon className={iconClass} />;
    case 'Hanger':
      return <HangerIcon className={iconClass} />;
    case 'Crown':
      return <Crown className={iconClass} />;
    default:
      return null;
  }
}

export default function Pricing({ data }: { data: PricingSectionData }) {
  const columns = data?.columns || [];
  const rows = data?.rows || [];

  // Default active mobile tab to 'standard' (Most Popular) or the first column
  const [activePlanId, setActivePlanId] = useState(
    columns.find((c) => c.badge)?.id || columns[1]?.id || columns[0]?.id || 'standard'
  );
  const [showFullTableMobile, setShowFullTableMobile] = useState(false);

  if (!data) return null;

  const activeCol = columns.find((c) => c.id === activePlanId) || columns[0];

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6">
        {/* Eyebrow: — Why Choose Us — */}
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
          className="mt-3 text-center text-[28px] font-black leading-tight tracking-tight text-[#0b2545] sm:text-[36px] lg:text-[42px]"
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

        {/* ======================================================== */}
        {/* MOBILE VIEW (< md / 768px): Sleek Tabbed Plan Card */}
        {/* ======================================================== */}
        <div className="md:hidden mt-8">
          {/* Segmented Control Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-[#edf5fd] border border-[#dce8f8]">
            {columns.map((col) => {
              const isSelected = col.id === activePlanId;
              const isPopular = !!col.badge;

              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => setActivePlanId(col.id)}
                  className={`relative flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-center transition-all ${
                    isSelected
                      ? col.id === 'standard'
                        ? 'bg-[#1565d8] text-white shadow-md'
                        : col.id === 'premium'
                        ? 'bg-[#0b2545] text-white shadow-md'
                        : 'bg-white text-[#0b2545] shadow-md'
                      : 'text-[#4b5b73] hover:text-[#0b2545]'
                  }`}
                >
                  {isPopular && (
                    <span
                      className={`text-[9px] font-extrabold uppercase tracking-wider mb-0.5 ${
                        isSelected ? 'text-[#f5b301]' : 'text-[#f59e0b]'
                      }`}
                    >
                      ★ {col.badge || 'Popular'}
                    </span>
                  )}
                  <span className="text-[12.5px] font-bold leading-tight truncate w-full">
                    {col.name}
                  </span>
                  <span
                    className={`text-[11px] font-semibold mt-0.5 ${
                      isSelected
                        ? col.id === 'basic'
                          ? 'text-[#1565d8]'
                          : 'text-blue-100'
                        : 'text-slate-500'
                    }`}
                  >
                    {col.price.split('/')[0].trim()}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Plan Detail Card with AnimatePresence */}
          {activeCol && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCol.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="mt-5 rounded-[24px] overflow-hidden border border-[#dce8f8] bg-white shadow-[0_10px_35px_rgba(11,37,69,0.06)]"
              >
                {/* Card Header */}
                <div
                  className={`relative px-5 py-6 text-center ${
                    activeCol.id === 'basic'
                      ? 'bg-gradient-to-b from-[#d9ebff] to-[#cce3fd] text-[#0b2545]'
                      : activeCol.id === 'standard'
                      ? 'bg-gradient-to-b from-[#1976f2] to-[#1565d8] text-white'
                      : 'bg-gradient-to-b from-[#13325c] to-[#0b2545] text-white'
                  }`}
                >
                  {activeCol.badge && (
                    <div className="inline-block mb-2 rounded-full bg-[#f5b301] px-3.5 py-0.5 text-[10.5px] font-extrabold uppercase tracking-wide text-[#0b2545] shadow-xs">
                      {activeCol.badge}
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-2">
                    {renderColumnIcon(activeCol.icon)}
                    <h3 className="text-[20px] font-black tracking-tight">{activeCol.name}</h3>
                  </div>

                  {/* Big Price */}
                  <div className="mt-2.5 flex items-baseline justify-center gap-1.5">
                    <span className="text-[28px] font-black tracking-tight">
                      {activeCol.price.split('/')[0].trim()}
                    </span>
                    {activeCol.price.includes('/') && (
                      <span
                        className={`text-[13px] font-semibold ${
                          activeCol.id === 'basic' ? 'text-slate-600' : 'text-blue-100'
                        }`}
                      >
                        / {activeCol.price.split('/')[1].trim()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Feature Rows */}
                <div className="divide-y divide-[#edf3fa] px-5 py-2">
                  {rows.map((row) => {
                    const val =
                      activeCol.id === 'basic'
                        ? row.basic
                        : activeCol.id === 'standard'
                        ? row.standard
                        : row.premium;
                    const isBool = typeof val === 'boolean';

                    return (
                      <div key={row.id} className="flex items-center justify-between py-3 gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center text-[#1565d8]">
                            {renderRowIcon(row.icon)}
                          </div>
                          <span className="text-[13.5px] font-bold text-[#0b2545] leading-snug">
                            {row.feature}
                          </span>
                        </div>
                        <div className="shrink-0">
                          {isBool ? (
                            val ? (
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#22c55e] text-white shadow-xs">
                                <Check className="h-3.5 w-3.5 stroke-[3]" />
                              </div>
                            ) : (
                              <span className="text-[18px] font-bold text-[#94a3b8] leading-none select-none">
                                —
                              </span>
                            )
                          ) : (
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-[12px] font-bold text-[#1565d8]">
                              {val}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Book Plan Button */}
                <div className="p-5 pt-3 bg-[#f8fbfe] border-t border-[#edf3fa]">
                  <Link
                    href="/book-pickup"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1565d8] py-3.5 text-[14px] font-bold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-[#0e4eb5] active:scale-[0.98]"
                  >
                    <span>Book {activeCol.name}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Side-by-side Table Toggle */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setShowFullTableMobile(!showFullTableMobile)}
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#1565d8] hover:text-[#0e4eb5] transition-colors"
            >
              <span>
                {showFullTableMobile
                  ? 'Hide Full Comparison Table ▲'
                  : 'View Full Comparison Table (Side-by-Side) ▼'}
              </span>
            </button>
          </div>

          {/* Collapsible Mobile Full Table with horizontal scroll & hint */}
          {showFullTableMobile && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden rounded-[20px] border border-slate-200 shadow-sm"
            >
              <div className="bg-blue-50/70 px-4 py-2 text-center text-[11.5px] font-semibold text-[#1565d8]">
                ← Swipe horizontally to compare all 3 plans →
              </div>
              <div className="overflow-x-auto bg-white">
                <div className="min-w-[620px] w-full">
                  {/* Table Header */}
                  <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] items-stretch">
                    <div className="flex items-center bg-[#1565d8] px-4 py-3.5 text-[14px] font-bold text-white">
                      {data.table_header_title || 'Features / Benefits'}
                    </div>
                    {columns.map((col) => (
                      <div
                        key={col.id}
                        className={`flex flex-col items-center justify-center p-3 text-center border-l border-white/20 ${
                          col.id === 'basic'
                            ? 'bg-[#cce3fd] text-[#0b2545]'
                            : col.id === 'standard'
                            ? 'bg-[#1565d8] text-white'
                            : 'bg-[#0b2545] text-white'
                        }`}
                      >
                        {col.badge && (
                          <span className="mb-1 rounded-full bg-[#f5b301] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#0b2545] shadow-xs">
                            {col.badge}
                          </span>
                        )}
                        <span className="text-[13px] font-bold">{col.name}</span>
                        <span className="text-[11px] font-semibold mt-0.5 opacity-90">
                          {col.price.split('/')[0].trim()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Rows */}
                  <div className="divide-y divide-[#edf3fa]">
                    {rows.map((row) => (
                      <div
                        key={row.id}
                        className="grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center text-center text-[12.5px]"
                      >
                        <div className="px-3 py-2.5 text-left font-bold text-[#0b2545] truncate">
                          {row.feature}
                        </div>
                        <div className="flex items-center justify-center py-2.5 border-l border-[#edf3fa]">
                          {typeof row.basic === 'boolean' ? (
                            row.basic ? (
                              <Check className="h-4 w-4 text-green-600 stroke-[3]" />
                            ) : (
                              <span className="text-slate-400 font-bold">—</span>
                            )
                          ) : (
                            <span className="text-[11.5px] font-bold">{row.basic}</span>
                          )}
                        </div>
                        <div className="flex items-center justify-center py-2.5 border-l border-[#edf3fa] bg-blue-50/20">
                          {typeof row.standard === 'boolean' ? (
                            row.standard ? (
                              <Check className="h-4 w-4 text-green-600 stroke-[3]" />
                            ) : (
                              <span className="text-slate-400 font-bold">—</span>
                            )
                          ) : (
                            <span className="text-[11.5px] font-bold">{row.standard}</span>
                          )}
                        </div>
                        <div className="flex items-center justify-center py-2.5 border-l border-[#edf3fa]">
                          {typeof row.premium === 'boolean' ? (
                            row.premium ? (
                              <Check className="h-4 w-4 text-green-600 stroke-[3]" />
                            ) : (
                              <span className="text-slate-400 font-bold">—</span>
                            )
                          ) : (
                            <span className="text-[11.5px] font-bold">{row.premium}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* ======================================================== */}
        {/* DESKTOP / TABLET VIEW (md:block >= 768px): Full Matrix   */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="hidden md:block mt-12 overflow-x-auto rounded-[20px] sm:rounded-[24px] shadow-[0_12px_40px_rgba(11,37,69,0.08)] ring-1 ring-black/5"
        >
          <div className="min-w-[700px] w-full bg-white">
            {/* Table Header */}
            <div className="grid grid-cols-[1.55fr_1fr_1fr_1fr] items-stretch">
              {/* Features / Benefits Header */}
              <div className="flex items-center bg-[#1565d8] px-6 py-5 text-[16px] sm:text-[17px] font-bold text-white">
                {data.table_header_title || 'Features / Benefits'}
              </div>

              {/* Dynamic Column Headers */}
              {columns.map((col) => {
                const isBasic = col.id === 'basic';
                const isStandard = col.id === 'standard';

                return (
                  <div
                    key={col.id}
                    className={`relative flex flex-col items-center justify-center px-4 pt-7 pb-4 sm:pt-8 sm:pb-5 border-l border-white/20 transition-all ${
                      isBasic
                        ? 'bg-[#cce3fd] text-[#0b2545]'
                        : isStandard
                        ? 'bg-[#1565d8] text-white shadow-md'
                        : 'bg-[#0b2545] text-white'
                    }`}
                  >
                    {/* Floating Most Popular Badge */}
                    {col.badge && (
                      <div className="absolute top-2 sm:top-2.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap rounded-full bg-[#f5b301] px-3.5 py-0.5 text-[10.5px] sm:text-[11px] font-extrabold uppercase tracking-wide text-[#0b2545] shadow-[0_2px_8px_rgba(245,179,1,0.4)]">
                        {col.badge}
                      </div>
                    )}

                    {col.icon && (
                      <div
                        className={`mb-1 flex items-center justify-center ${
                          isBasic ? 'text-[#1565d8]' : 'text-white'
                        }`}
                      >
                        {renderColumnIcon(col.icon)}
                      </div>
                    )}

                    <h3
                      className={`text-[15px] sm:text-[16px] font-bold tracking-tight text-center ${
                        isBasic ? 'text-[#0b2545]' : 'text-white'
                      }`}
                    >
                      {col.name}
                    </h3>
                  </div>
                );
              })}
            </div>

            {/* Table Rows (Features) */}
            <div>
              {rows.map((row, idx) => {
                const isEven = idx % 2 === 0;
                const rowBg = isEven ? 'bg-white' : 'bg-[#f6f9fe]';

                return (
                  <div
                    key={row.id}
                    className={`grid grid-cols-[1.55fr_1fr_1fr_1fr] items-center border-t border-[#e5effa] ${rowBg} transition-colors hover:bg-blue-50/40`}
                  >
                    {/* Feature Name & Icon */}
                    <div className="flex items-center gap-3.5 px-6 py-3.5 sm:py-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[#1565d8]">
                        {renderRowIcon(row.icon)}
                      </div>
                      <span className="text-[14px] sm:text-[15px] font-bold text-[#0b2545]">
                        {row.feature}
                      </span>
                    </div>

                    {/* Basic Care Value */}
                    <div className="flex items-center justify-center px-4 py-3.5 sm:py-4 border-l border-[#e5effa]">
                      {typeof row.basic === 'boolean' ? (
                        row.basic ? (
                          <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-[#22c55e] text-white shadow-xs">
                            <Check className="h-3.5 w-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <span className="text-[20px] font-bold text-[#94a3b8] leading-none select-none">
                            —
                          </span>
                        )
                      ) : (
                        <span className="text-[13px] sm:text-[13.5px] font-bold text-[#0b2545] text-center">
                          {row.basic}
                        </span>
                      )}
                    </div>

                    {/* Standard Care Value */}
                    <div className="flex items-center justify-center px-4 py-3.5 sm:py-4 border-l border-[#e5effa] bg-blue-50/20">
                      {typeof row.standard === 'boolean' ? (
                        row.standard ? (
                          <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-[#22c55e] text-white shadow-xs">
                            <Check className="h-3.5 w-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <span className="text-[20px] font-bold text-[#94a3b8] leading-none select-none">
                            —
                          </span>
                        )
                      ) : (
                        <span className="text-[13px] sm:text-[13.5px] font-bold text-[#0b2545] text-center">
                          {row.standard}
                        </span>
                      )}
                    </div>

                    {/* Premium Care Value */}
                    <div className="flex items-center justify-center px-4 py-3.5 sm:py-4 border-l border-[#e5effa]">
                      {typeof row.premium === 'boolean' ? (
                        row.premium ? (
                          <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-[#22c55e] text-white shadow-xs">
                            <Check className="h-3.5 w-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <span className="text-[20px] font-bold text-[#94a3b8] leading-none select-none">
                            —
                          </span>
                        )
                      ) : (
                        <span className="text-[13px] sm:text-[13.5px] font-bold text-[#0b2545] text-center">
                          {row.premium}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Table Bottom: Starting Price */}
            <div className="grid grid-cols-[1.55fr_1fr_1fr_1fr] items-stretch border-t border-[#e5effa]">
              {/* Bottom Label */}
              <div className="flex items-center bg-[#1565d8] px-6 py-4 sm:py-5 text-[16px] sm:text-[18px] font-black text-white">
                {data.bottom_title || 'Starting Price'}
              </div>

              {/* Column Prices */}
              {columns.map((col) => {
                const isBasic = col.id === 'basic';
                const isStandard = col.id === 'standard';

                return (
                  <div
                    key={col.id}
                    className={`flex items-center justify-center px-4 py-4 sm:py-5 border-l transition-all ${
                      isBasic
                        ? 'bg-[#cce3fd] text-[#0b2545] border-[#b8d8fb]'
                        : isStandard
                        ? 'bg-[#1565d8] text-white border-[#1258be]'
                        : 'bg-[#e1f0ff] text-[#0b2545] border-[#cbe4fe]'
                    }`}
                  >
                    <span
                      className={`text-[18px] sm:text-[21px] font-black tracking-tight text-center ${
                        isStandard ? 'text-white' : 'text-[#0b2545]'
                      }`}
                    >
                      {col.price}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
