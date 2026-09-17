import React from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import ContactHero from '../components/contact/ContactHero';
import ContactInfo from '../components/contact/ContactInfo';
import ContactForm from '../components/contact/ContactForm';
import ClientFeedbackForm from '../components/contact/ClientFeedbackForm';
import LocationMap from '../components/contact/LocationMap';
import FAQ from '../components/contact/FAQ';
import Container from '../components/common/Container';

const Contact = () => {
  return (
    <PageWrapper
      title="Contact Avaura — Let's Build Something Intelligent"
      description="Connect with Avaura to discover tailored enterprise AI architectures, agentic workflows, and machine learning models."
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

      {/* Client Feedback Submission Form */}
      <ClientFeedbackForm />

      <LocationMap />
      <FAQ />
    </PageWrapper>
  );
};

export default Contact;
