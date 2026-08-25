import React, { useEffect } from 'react';

const PageWrapper = ({
  children,
  title = 'NeverquiT.ai — AI That Works As Hard As You Do',
  description = 'NeverquiT.ai builds intelligent AI solutions that help businesses automate, innovate and scale.',
  className = '',
}) => {
  useEffect(() => {
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  }, [title, description]);

  return (
    <div className={`relative min-h-screen bg-[#050505] text-white selection:bg-[#FF1F26] selection:text-white animate-fade-in ${className}`}>
      {children}
    </div>
  );
};

export default PageWrapper;
