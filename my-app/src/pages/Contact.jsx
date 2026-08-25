import React from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import ContactHero from '../components/contact/ContactHero';
import ContactInfo from '../components/contact/ContactInfo';
import ContactForm from '../components/contact/ContactForm';
import LocationMap from '../components/contact/LocationMap';
import FAQ from '../components/contact/FAQ';
import ContactCTA from '../components/contact/ContactCTA';
import Container from '../components/common/Container';

const Contact = ({ onOpenDemo }) => {
  return (
    <PageWrapper
      title="Contact NeverquiT.ai — Let's Build Something Intelligent"
      description="Connect with NeverquiT.ai to discover tailored enterprise AI architectures, agentic workflows, and machine learning models."
    >
      <ContactHero />

      {/* Main Contact Section */}
      <section className="py-6 sm:py-10 relative">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <ContactInfo />
            </div>
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      <LocationMap />
      <FAQ />
      <ContactCTA onOpenDemo={onOpenDemo} />
    </PageWrapper>
  );
};

export default Contact;
