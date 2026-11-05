'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Truck,
  User,
} from 'lucide-react';
import type { BookPickupSectionData, ServiceItem } from '../../types';

function LaundryBasketIcon({ className }: { className?: string }) {
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
      <path d="M4 8h16l-1.5 11.5a2 2 0 0 1-2 1.5H7.5a2 2 0 0 1-2-1.5L4 8z" />
      <path d="M9 4a3 3 0 0 1 6 0v4H9V4z" />
    </svg>
  );
}

function renderHighlightIcon(icon: string) {
  switch (icon) {
    case 'Clock':
      return <Clock className="h-5 w-5" />;
    case 'ShieldCheck':
      return <ShieldCheck className="h-5 w-5" />;
    case 'Truck':
    default:
      return <Truck className="h-5 w-5" />;
  }
}

interface CustomSelectProps {
  name: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  icon: React.ReactNode;
  options: string[];
  required?: boolean;
}

function CustomSelect({
  name,
  value,
  onChange,
  placeholder,
  icon,
  options,
  required,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const handleSelect = (opt: string) => {
    onChange(opt);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <input type="hidden" name={name} value={value} required={required} />

      {/* Dropdown Trigger Button */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group relative flex w-full items-center justify-between rounded-[14px] border bg-white pl-11 pr-4 py-3.5 text-left text-[14px] font-medium outline-none transition-all cursor-pointer ${
          isOpen
            ? 'border-[#1565d8] ring-4 ring-[#1565d8]/10'
            : 'border-slate-200/90 hover:border-slate-300'
        }`}
      >
        {/* Left Icon */}
        <span
          className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
            isOpen || value ? 'text-[#1565d8]' : 'text-slate-400'
          }`}
        >
          {icon}
        </span>

        {/* Selected text or placeholder */}
        <span className={`block truncate ${value ? 'text-slate-800 font-semibold' : 'text-slate-400'}`}>
          {value || placeholder}
        </span>

        {/* Chevron Icon with rotation */}
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-250 ${
            isOpen ? 'rotate-180 text-[#1565d8]' : 'text-slate-400 group-hover:text-slate-600'
          }`}
        />
      </button>

      {/* Custom Dropdown Menu with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-full mt-2 z-50 max-h-[260px] overflow-y-auto rounded-[18px] border border-slate-200/90 bg-white p-2 shadow-[0_16px_40px_rgba(11,37,69,0.14)]"
            role="listbox"
          >
            {options.map((opt) => {
              const isSelected = value === opt;
              return (
                <div
                  key={opt}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt)}
                  className={`flex items-center justify-between rounded-[12px] px-3.5 py-2.5 text-[14px] font-medium cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#eaf3ff] text-[#1565d8] font-bold'
                      : 'text-[#2b3b52] hover:bg-[#f2f7fe] hover:text-[#1565d8]'
                  }`}
                >
                  <span>{opt}</span>
                  {isSelected && <Check className="h-4 w-4 text-[#1565d8]" />}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface BookPickupProps {
  data: BookPickupSectionData;
  services?: ServiceItem[];
}

export default function BookPickup({ data, services }: BookPickupProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const form = data.form;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setSelectedTime('');
      setSelectedService('');
      (e.target as HTMLFormElement).reset();
    }, 700);
  };

  const serviceOptions =
    services && services.length > 0
      ? services.map((s) => s.title)
      : [
          'Wash & Fold',
          'Dry Cleaning',
          'Steam Ironing',
          'Stain Removal',
          'Delicate Fabric Care',
          'Doorstep Pickup & Delivery',
        ];

  const timeOptions = form.time_slots || [
    '8:00 AM – 10:00 AM',
    '10:00 AM – 12:00 PM',
    '12:00 PM – 3:00 PM',
    '3:00 PM – 6:00 PM',
    '6:00 PM – 9:00 PM',
  ];

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Eyebrow: — Book a Pickup — */}
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
            className="mx-auto mt-2.5 max-w-[650px] text-center text-[13.5px] sm:text-[14.5px] leading-relaxed text-[#4b5b73]"
          >
            {data.description}
          </motion.p>
        )}

        {/* Two-Column Booking Layout */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[410px_1fr] gap-8 items-stretch">
          {/* Left Column: Image & Highlights Card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="flex flex-col justify-between self-stretch h-full rounded-[28px] sm:rounded-[32px] bg-[#edf5fd] p-5 sm:p-6 border border-[#e1effe] shadow-[0_8px_30px_rgba(11,37,69,0.04)]"
          >
            {/* Basket Image */}
            <div className="relative h-[280px] sm:h-[310px] lg:h-[330px] w-full shrink-0 overflow-hidden rounded-[22px] bg-slate-100 shadow-sm">
              <Image
                src={data.image}
                alt={data.image_alt || 'Fresh laundry in woven basket'}
                fill
                sizes="(max-width: 1024px) 100vw, 410px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* White Highlights Card */}
            <div className="mt-5 flex-1 rounded-[22px] bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-around space-y-4">
              {data.highlights.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1, duration: 0.4 }}
                  className="flex items-center gap-4 py-1"
                >
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-[#1565d8] text-white shadow-xs">
                    {renderHighlightIcon(item.icon)}
                  </div>
                  <div>
                    <h4 className="text-[14.5px] sm:text-[15.5px] font-bold text-[#0b2545] leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[12px] sm:text-[13px] text-[#556987] mt-0.5 leading-snug">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Book a Pickup Now Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="flex flex-col justify-between self-stretch h-full rounded-[28px] sm:rounded-[32px] bg-white p-7 sm:p-10 shadow-[0_12px_45px_rgba(11,37,69,0.06)] border border-slate-100"
          >
            {/* Form Title & Accent Bar */}
            <h3 className="text-[24px] sm:text-[28px] font-black text-[#0b2545] tracking-tight">
              {form.title || 'Book a Pickup Now'}
            </h3>
            <span className="mt-2.5 mb-7 block h-[3.5px] w-14 rounded-full bg-[#1565d8]" />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center py-16 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-[#1565d8]">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h4 className="mt-4 text-[22px] font-extrabold text-[#0b2545]">
                    {form.success_title || 'Pickup Scheduled!'}
                  </h4>
                  <p className="mt-2 max-w-sm text-[14px] text-[#556987] leading-relaxed">
                    {form.success_message ||
                      'Thank you! Your pickup request has been received. Our team will contact you shortly.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-full bg-[#1565d8] px-7 py-3 text-[14px] font-bold text-white shadow-md transition-all hover:bg-[#0e4eb5]"
                  >
                    {form.reset_text || 'Book Another Pickup'}
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
                        placeholder={form.first_name_placeholder || 'First Name *'}
                        className="w-full rounded-[14px] border border-slate-200/90 bg-white pl-11 pr-4 py-3.5 text-[14px] font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-[#1565d8] focus:ring-4 focus:ring-[#1565d8]/10"
                      />
                    </div>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-slate-400 pointer-events-none" />
                      <input
                        type="text"
                        name="last_name"
                        required
                        placeholder={form.last_name_placeholder || 'Last Name *'}
                        className="w-full rounded-[14px] border border-slate-200/90 bg-white pl-11 pr-4 py-3.5 text-[14px] font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-[#1565d8] focus:ring-4 focus:ring-[#1565d8]/10"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone Number & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-slate-400 pointer-events-none" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder={form.phone_placeholder || 'Phone Number *'}
                        className="w-full rounded-[14px] border border-slate-200/90 bg-white pl-11 pr-4 py-3.5 text-[14px] font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-[#1565d8] focus:ring-4 focus:ring-[#1565d8]/10"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-slate-400 pointer-events-none" />
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder={form.email_placeholder || 'Email Address *'}
                        className="w-full rounded-[14px] border border-slate-200/90 bg-white pl-11 pr-4 py-3.5 text-[14px] font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-[#1565d8] focus:ring-4 focus:ring-[#1565d8]/10"
                      />
                    </div>
                  </div>

                  {/* Row 3: Pickup Address */}
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      name="address"
                      required
                      placeholder={form.address_placeholder || 'Pickup Address *'}
                      className="w-full rounded-[14px] border border-slate-200/90 bg-white pl-11 pr-4 py-3.5 text-[14px] font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-[#1565d8] focus:ring-4 focus:ring-[#1565d8]/10"
                    />
                  </div>

                  {/* Row 4: Preferred Pickup Date & Preferred Time (Custom Select) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-slate-400 pointer-events-none" />
                      <input
                        type="date"
                        name="pickup_date"
                        required
                        className="w-full rounded-[14px] border border-slate-200/90 bg-white pl-11 pr-4 py-3.5 text-[14px] font-medium text-slate-700 outline-none transition-all focus:border-[#1565d8] focus:ring-4 focus:ring-[#1565d8]/10"
                      />
                    </div>
                    <CustomSelect
                      name="pickup_time"
                      value={selectedTime}
                      onChange={setSelectedTime}
                      placeholder={form.time_placeholder || 'Preferred Time *'}
                      icon={<Clock className="h-[18px] w-[18px]" />}
                      options={timeOptions}
                      required
                    />
                  </div>

                  {/* Row 5: Laundry Service (Custom Select) */}
                  <CustomSelect
                    name="service"
                    value={selectedService}
                    onChange={setSelectedService}
                    placeholder={form.service_placeholder || 'Laundry Service *'}
                    icon={<LaundryBasketIcon className="h-[18px] w-[18px]" />}
                    options={serviceOptions}
                    required
                  />

                  {/* Row 6: Additional Notes */}
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 h-[18px] w-[18px] text-slate-400 pointer-events-none" />
                    <textarea
                      name="notes"
                      rows={3}
                      placeholder={form.notes_placeholder || 'Additional Notes (Optional)'}
                      className="w-full rounded-[14px] border border-slate-200/90 bg-white pl-11 pr-4 py-3.5 text-[14px] font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-[#1565d8] focus:ring-4 focus:ring-[#1565d8]/10 resize-none"
                    />
                  </div>

                  {/* Submit Button (Centered Pill) */}
                  <div className="pt-3 flex justify-center">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#1565d8] px-8 sm:px-9 py-3.5 text-[14.5px] sm:text-[15px] font-bold text-white shadow-[0_8px_20px_rgba(21,101,216,0.3)] transition-all hover:bg-[#0e4eb5] hover:shadow-[0_12px_28px_rgba(21,101,216,0.4)] disabled:opacity-60 cursor-pointer"
                    >
                      <Truck className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
                      <span>{submitting ? form.sending_text || 'Booking...' : form.button_text || 'Book Pickup'}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
