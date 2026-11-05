import data from '../data/data.json';

export interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
}

export type LinkType = NavItem;

export interface HeaderData {
  logo: string;
  logo_text: string;
  logo_subtext?: string;
  links: LinkType[];
  button_text?: string;
  button_link?: string;
  menu_aria_label?: string;
  close_aria_label?: string;
}

export interface FooterContact {
  address_lines: string[];
  phone: string;
  phone_href?: string;
  email: string;
  email_href?: string;
}

export interface FooterData {
  logo: string;
  logo_text: string;
  image?: string;
  image_alt?: string;
  quick_links_title?: string;
  quick_links: LinkType[];
  contact_title?: string;
  contact: FooterContact;
  copyright: string;
}

export interface BackToTopData {
  aria_label: string;
}

export interface ImageItem {
  src: string;
  alt: string;
}

export interface HeroSectionData {
  title_line1: string;
  title_line2: string;
  description: string;
  button_text: string;
  button_link: string;
  images: ImageItem[];
}

export interface AboutItem {
  icon: string;
  text: string;
}

export interface AboutSectionData {
  eyebrow: string;
  title?: string;
  title_black?: string;
  title_blue?: string;
  items?: AboutItem[];
  paragraphs?: string[];
  image: string;
  image_alt: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  short_title: string;
  icon: string;
  description: string;
  image: string;
  image_alt: string;
  href: string;
  show_on_home?: boolean;
}

export interface ServicesSectionData {
  eyebrow: string;
  title_black: string;
  title_blue: string;
  description: string;
  button_text?: string;
  items: ServiceItem[];
}

export interface HowItWorksStep {
  number: string;
  icon: string;
  title: string;
  description: string;
}

export interface HowItWorksSectionData {
  eyebrow: string;
  title_black: string;
  title_blue: string;
  description: string;
  image: string;
  image_alt: string;
  steps: HowItWorksStep[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
  avatar: string;
}

export interface TestimonialsSectionData {
  eyebrow: string;
  title: string;
  description?: string;
  autoplay_interval?: number;
  prev_aria_label?: string;
  next_aria_label?: string;
  items: TestimonialItem[];
}

export interface CtaSectionData {
  title_black: string;
  title_blue: string;
  title_end: string;
  description: string;
  button_text: string;
  button_link: string;
  image: string;
  image_alt: string;
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface BreadcrumbData {
  title?: string;
  background_image?: string;
  background_alt?: string;
  items?: BreadcrumbItem[];
}

export interface ServiceSidebarData {
  title: string;
  cta: {
    image: string;
    image_alt: string;
    title: string;
    description: string;
    button_text: string;
    button_link: string;
  };
}

export interface IncludedItem {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceDetailData {
  slug: string;
  name: string;
  title_black: string;
  title_blue: string;
  description: string;
  image: string;
  image_alt?: string;
  overview_title: string;
  overview_description: string;
  included_title: string;
  included: IncludedItem[];
  benefits_title: string;
  benefits: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  button_text: string;
  button_link: string;
}

export interface PricingTableColumn {
  id: string;
  name: string;
  icon?: string;
  badge?: string;
  header_bg?: string;
  header_text_color?: string;
  price: string;
  price_bg?: string;
  price_text_color?: string;
}

export interface PricingTableRow {
  id: string;
  feature: string;
  icon: string;
  basic: string | boolean;
  standard: string | boolean;
  premium: string | boolean;
}

export interface PricingSectionData {
  eyebrow: string;
  title_black: string;
  title_blue: string;
  description: string;
  table_header_title?: string;
  bottom_title?: string;
  columns?: PricingTableColumn[];
  rows?: PricingTableRow[];
  popular_label?: string;
  plans?: PricingPlan[];
  rates_title?: string;
  rates?: { item: string; price: string }[];
}

export interface ContactInfoItem {
  icon: string;
  title: string;
  lines: string[];
  href?: string;
}

export interface ContactFormData {
  title: string;
  first_name_placeholder?: string;
  last_name_placeholder?: string;
  name_placeholder?: string;
  email_placeholder: string;
  phone_placeholder: string;
  subject_placeholder?: string;
  message_placeholder: string;
  button_text: string;
  sending_text: string;
  success_title: string;
  success_message: string;
  reset_text: string;
}

export interface ContactSectionData {
  eyebrow: string;
  title_black: string;
  title_blue: string;
  description: string;
  image?: string;
  image_alt?: string;
  info: ContactInfoItem[];
  form: ContactFormData;
  map_title?: string;
  map_embed?: string;
}

export interface BookPickupFormData {
  title: string;
  first_name_placeholder?: string;
  last_name_placeholder?: string;
  name_placeholder?: string;
  phone_placeholder: string;
  email_placeholder: string;
  address_placeholder: string;
  service_placeholder: string;
  date_label: string;
  time_placeholder: string;
  time_slots: string[];
  notes_placeholder: string;
  button_text: string;
  sending_text: string;
  success_title: string;
  success_message: string;
  reset_text: string;
}

export interface BookPickupSectionData {
  eyebrow: string;
  title_black: string;
  title_blue: string;
  description: string;
  image: string;
  image_alt: string;
  highlights: IncludedItem[];
  form: BookPickupFormData;
}

export interface PageComponent {
  key: string;
  component: string;
}

export interface PageMeta {
  title: string;
  pageName: string;
  metadata: { title: string; description?: string };
  components: PageComponent[];
}

export interface MissionVisionCard {
  title: string;
  description: string;
  image: string;
  image_alt: string;
}

export interface MissionVisionSectionData {
  eyebrow: string;
  title: string;
  description: string;
  items: MissionVisionCard[];
}

export interface WhyChooseUsFeature {
  icon: string;
  title: string;
}

export interface PartnerItem {
  name: string;
  color?: string;
}

export interface WhyChooseUsSectionData {
  eyebrow: string;
  title_black: string;
  title_blue: string;
  image: string;
  image_alt: string;
  features: WhyChooseUsFeature[];
  partners_title: string;
  partners: PartnerItem[];
}

export interface TeamSocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  image_alt: string;
  socials: TeamSocialLinks;
}

export interface TeamPagination {
  current_page: number;
  total_pages: number;
  items_per_page?: number;
}

export interface TeamSectionData {
  eyebrow: string;
  title_black: string;
  title_blue: string;
  description: string;
  members: TeamMember[];
  pagination?: TeamPagination;
}

export interface SiteSections {
  hero: HeroSectionData;
  about: AboutSectionData;
  services: ServicesSectionData;
  howItWorks: HowItWorksSectionData;
  testimonials: TestimonialsSectionData;
  cta: CtaSectionData;
  breadcrumb: BreadcrumbData;
  serviceSidebar: ServiceSidebarData;
  serviceDetails: Record<string, ServiceDetailData>;
  pricing: PricingSectionData;
  contact: ContactSectionData;
  bookPickup: BookPickupSectionData;
  missionVision?: MissionVisionSectionData;
  whyChooseUs?: WhyChooseUsSectionData;
  team?: TeamSectionData;
}

export interface SitePages {
  home: PageMeta;
  about: PageMeta;
  services: PageMeta;
  serviceDetail: PageMeta;
  howItWorks: PageMeta;
  pricing: PageMeta;
  contact: PageMeta;
  bookPickup: PageMeta;
  team?: PageMeta;
}

export interface TemplateComponents {
  pages: SitePages;
  sections: SiteSections;
}

export interface SiteData {
  common: {
    Header: HeaderData;
    Footer: FooterData;
    BackToTop: BackToTopData;
  };
  categories: {
    LaundryService: {
      templateComponents: {
        'template-1': TemplateComponents;
      };
    };
  };
}

export const siteJson: SiteData = data as unknown as SiteData;
export const common = siteJson.common;
export const template = siteJson.categories.LaundryService.templateComponents['template-1'];
export const pages = template.pages;
export const sections = template.sections;

export function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

