import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import About from '../../components/sections/About';
import MissionVision from '../../components/sections/MissionVision';
import WhyChooseUs from '../../components/sections/WhyChooseUs';
import HowItWorks from '../../components/sections/HowItWorks';
import Testimonials from '../../components/sections/Testimonials';
import Cta from '../../components/sections/Cta';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../../components/types';

const pageData = pages.about;

export const metadata: Metadata = {
  title: pageData.metadata.title,
  description: pageData.metadata.description,
};

export default function AboutPage() {
  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: <Breadcrumb data={sections.breadcrumb} currentPage={pageData.pageName} />,
    About: <About data={sections.about} />,
    MissionVision: sections.missionVision ? <MissionVision data={sections.missionVision} /> : null,
    WhyChooseUs: sections.whyChooseUs ? <WhyChooseUs data={sections.whyChooseUs} /> : null,
    HowItWorks: <HowItWorks data={sections.howItWorks} />,
    Testimonials: <Testimonials data={sections.testimonials} />,
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

