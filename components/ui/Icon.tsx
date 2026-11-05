import React from 'react';
import {
  CalendarCheck,
  Clock,
  Droplets,
  Flame,
  Gem,
  Hand,
  Layers,
  Mail,
  MapPin,
  Package,
  Phone,
  Search,
  ShieldCheck,
  Shirt,
  Sparkles,
  Tag,
  Truck,
  Users,
  WashingMachine,
  Wind,
  type LucideIcon,
} from 'lucide-react';

function WashingMachineIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="2.5" width="18" height="19" rx="3" />
      <line x1="3" y1="7.5" x2="21" y2="7.5" />
      <line x1="6" y1="5" x2="9" y2="5" />
      <circle cx="15.5" cy="5" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="18" cy="5" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="12" cy="14.2" r="4.3" />
      <circle cx="12" cy="14.2" r="2.2" strokeWidth="1.3" strokeDasharray="3 2" />
    </svg>
  );
}

function FoldedLaundryIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Top towel fold */}
      <rect x="3" y="10.5" width="12" height="4" rx="2" />
      {/* Bottom towel fold */}
      <rect x="3" y="15.5" width="12" height="4" rx="2" />
      {/* Crease fold */}
      <path d="M5.5 10.5v9" strokeWidth="1.5" />
      {/* Upper Sparkle */}
      <path
        d="M19 2.5l.6 1.8 1.9.6-1.9.6-.6 1.9-.6-1.9-1.9-.6 1.9-.6.6-1.8z"
        fill="currentColor"
        stroke="none"
      />
      {/* Lower Sparkle */}
      <path
        d="M15 5.5l.4 1.1 1.2.4-1.2.4-.4 1.2-.4-1.2-1.2-.4 1.2-.4.4-1.1z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function DeliveryTruckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* 3 speed lines on the left */}
      <path d="M2 11h4" />
      <path d="M1 14h6" />
      <path d="M3 17h3" />
      {/* Truck body */}
      <path d="M8 8.5h7a1 1 0 0 1 1 1v7.5H8a1 1 0 0 1-1-1V9.5a1 1 0 0 1 1-1z" />
      {/* Cabin & Windshield */}
      <path d="M16 11.5h3.2l2.3 2.8v2.7h-5.5v-5.5z" />
      {/* Front & rear wheels */}
      <circle cx="10.5" cy="18" r="1.8" />
      <circle cx="18" cy="18" r="1.8" />
      {/* Chassis connecting line */}
      <path d="M12.3 18h3.9" />
    </svg>
  );
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CalendarCheck,
  Clock,
  Droplets,
  Flame,
  Hand,
  Layers,
  Mail,
  MapPin,
  Package,
  Phone,
  Search,
  ShieldCheck,
  Shirt,
  Sparkles,
  Tag,
  Truck: DeliveryTruckIcon,
  Users,
  WashingMachine: WashingMachineIcon,
  Wind,
  Gem,
  FoldedLaundry: FoldedLaundryIcon,
};

export default function Icon({ name, className }: { name: string; className?: string }) {
  const Component = iconMap[name] ?? Sparkles;
  return <Component className={className} />;
}

