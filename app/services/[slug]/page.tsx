import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../../components/sections/Header';
import Footer from '../../../components/sections/Footer';
import Breadcrumb from '../../../components/sections/Breadcrumb';
import ServiceDetail from '../../../components/sections/ServiceDetail';
import Cta from '../../../components/sections/Cta';
import BackToTop from '../../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../../../components/types';

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

const pageData = pages.serviceDetail;

export function generateStaticParams() {
  return Object.keys(sections.serviceDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = sections.serviceDetails[slug];
  if (!service) return { title: pageData.metadata.title, description: pageData.metadata.description };
  return {
    title: `${service.name} | ${pageData.metadata.title}`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = sections.serviceDetails[slug];

  if (!service) notFound();

  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: <Breadcrumb data={sections.breadcrumb} currentPage={pageData.pageName} />,
    ServiceDetail: <ServiceDetail data={service} services={sections.services.items} sidebar={sections.serviceSidebar} />,
    Cta: <Cta data={sections.cta} />,
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {pageData.components.map((block: PageComponent) => (
          <React.Fragment key={block.key}>{sectionMap[block.component] ?? null}</React.Fragment>
        ))}
      </main>
      <Footer data={common.Footer} />
      <BackToTop data={common.BackToTop} />
    </div>
  );
}

