'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Mail, MessageSquare, Phone, Send, User } from 'lucide-react';
import Icon from '../../ui/Icon';
import type { ContactSectionData } from '../../types';

export default function Contact({ data }: { data: ContactSectionData }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      (e.target as HTMLFormElement).reset();
    }, 700);
  };

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center">
          {/* Eyebrow */}
          {data.eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center justify-center gap-2.5"
            >
              <span className="h-[2px] w-6 sm:w-8 bg-[#1565d8] rounded-full" />
              <span className="text-[12.5px] sm:text-[13.5px] font-extrabold uppercase tracking-[0.18em] text-[#1565d8]">
                {data.eyebrow}
              </span>
              <span className="h-[2px] w-6 sm:w-8 bg-[#1565d8] rounded-full" />
            </motion.div>
          )}

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="mt-3 text-[28px] sm:text-[36px] lg:text-[40px] font-black text-[#0b2545] tracking-tight"
          >
            {data.title_black}{' '}
            <span className="text-[#1565d8]">{data.title_blue}</span>
          </motion.h2>

          {/* Subtitle */}
          {data.description && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: 0.14 }}
              className="mx-auto mt-2.5 max-w-[650px] text-center text-[13.5px] sm:text-[14.5px] leading-relaxed text-[#4b5b73]"
            >
              {data.description}
            </motion.p>
          )}
        </div>

        {/* Top 2-Column Grid: Form + Image */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-8 items-stretch">
          {/* Left Column: Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="flex flex-col justify-between self-stretch h-full rounded-[28px] sm:rounded-[32px] bg-[#edf5fd] p-6 sm:p-9 border border-[#e1effe] shadow-[0_8px_30px_rgba(11,37,69,0.04)]"
          >
            <div>
              {/* Form Title & Accent Bar */}
              <h3 className="text-[22px] sm:text-[26px] font-black text-[#0b2545] tracking-tight">
                {data.form.title}
              </h3>
              <span className="mt-2.5 mb-6 block h-[3.5px] w-12 rounded-full bg-[#1565d8]" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center py-14 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#1565d8] shadow-sm">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h4 className="mt-4 text-[22px] font-extrabold text-[#0b2545]">
                      {data.form.success_title}
                    </h4>
                    <p className="mt-2 max-w-sm text-[14px] text-[#556987] leading-relaxed">
                      {data.form.success_message}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-6 rounded-full bg-[#1565d8] px-7 py-3 text-[14px] font-bold text-white shadow-md transition-all hover:bg-[#0e4eb5]"
                    >
                      {data.form.reset_text}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* Row 1: First Name & Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-slate-400 pointer-events-none" />
                        <input
                          type="text"
                          name="first_name"
                          required
                          placeholder={data.form.first_name_placeholder || 'First Name *'}
                          className="w-full rounded-[14px] border border-slate-200/90 bg-white pl-11 pr-4 py-3.5 text-[14px] font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-[#1565d8] focus:ring-4 focus:ring-[#1565d8]/10"
                        />
                      </div>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-slate-400 pointer-events-none" />
                        <input
                          type="text"
                          name="last_name"
                          required
                          placeholder={data.form.last_name_placeholder || 'Last Name *'}
                          className="w-full rounded-[14px] border border-slate-200/90 bg-white pl-11 pr-4 py-3.5 text-[14px] font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-[#1565d8] focus:ring-4 focus:ring-[#1565d8]/10"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email Address & Phone Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-slate-400 pointer-events-none" />
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder={data.form.email_placeholder || 'Email Address *'}
                          className="w-full rounded-[14px] border border-slate-200/90 bg-white pl-11 pr-4 py-3.5 text-[14px] font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-[#1565d8] focus:ring-4 focus:ring-[#1565d8]/10"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-slate-400 pointer-events-none" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder={data.form.phone_placeholder || 'Phone Number *'}
                          className="w-full rounded-[14px] border border-slate-200/90 bg-white pl-11 pr-4 py-3.5 text-[14px] font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-[#1565d8] focus:ring-4 focus:ring-[#1565d8]/10"
                        />
                      </div>
                    </div>

                    {/* Row 3: Your Message */}
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 h-[18px] w-[18px] text-slate-400 pointer-events-none" />
                      <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder={data.form.message_placeholder || 'Your Message *'}
                        className="w-full rounded-[14px] border border-slate-200/90 bg-white pl-11 pr-4 py-3.5 text-[14px] font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-[#1565d8] focus:ring-4 focus:ring-[#1565d8]/10 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center gap-2.5 rounded-full bg-[#1565d8] px-7 py-3.5 text-[14px] font-bold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-[#0e4eb5] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70"
                      >
                        <span>{submitting ? data.form.sending_text : data.form.button_text}</span>
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Column: Image Card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="relative self-stretch h-full min-h-[380px] lg:min-h-full rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(11,37,69,0.04)] border border-slate-100/80"
          >
            <Image
              src={data.image || '/images/pickup-basket.webp'}
              alt={data.image_alt || 'Fresh laundry in woven basket'}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
          </motion.div>
        </div>

        {/* Middle Row: 3 Contact Info Cards */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {data.info.map((info, idx) => {
            const content = (
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1565d8] text-white shadow-md shadow-blue-500/20">
                  <Icon name={info.icon} className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[15px] sm:text-[16px] font-bold text-[#0b2545]">
                    {info.title}
                  </h4>
                  {info.lines.map((line) => (
                    <p
                      key={line}
                      className="text-[13px] sm:text-[13.5px] text-[#4b5b73] leading-snug"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            );

            return (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 * idx }}
                className="h-full"
              >
                {info.href ? (
                  <a
                    href={info.href}
                    className="block h-full rounded-[22px] bg-white p-5 sm:p-6 border border-slate-100 shadow-[0_4px_24px_rgba(11,37,69,0.04)] transition-all hover:shadow-[0_10px_30px_rgba(11,37,69,0.08)] hover:-translate-y-1"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="h-full rounded-[22px] bg-white p-5 sm:p-6 border border-slate-100 shadow-[0_4px_24px_rgba(11,37,69,0.04)] transition-all hover:shadow-[0_10px_30px_rgba(11,37,69,0.08)]">
                    {content}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Row: Google Map Embed */}
        {data.map_embed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 sm:mt-10 overflow-hidden rounded-[24px] sm:rounded-[28px] border border-slate-100 shadow-[0_8px_30px_rgba(11,37,69,0.05)] h-[280px] sm:h-[340px]"
          >
            <iframe
              title={data.map_title || 'FreshFold Laundry location map'}
              src={data.map_embed}
              loading="lazy"
              className="h-full w-full border-0"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
