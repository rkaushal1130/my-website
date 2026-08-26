import React, { useEffect } from 'react';

/**
 * Helper to update or inject meta tag dynamically into document.head
 */
const setMetaTag = (attrName, attrVal, content) => {
  if (!content) return;
  let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrVal);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

/**
 * Helper to update or inject link tag (like canonical)
 */
const setLinkTag = (rel, href) => {
  if (!href) return;
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

const PageWrapper = ({
  children,
  title = 'NeverquiT AI — AI That Works As Hard As You Do',
  description = 'NeverquiT AI builds intelligent AI solutions that help businesses automate, innovate and scale.',
  canonicalUrl = '',
  ogTitle = '',
  ogDescription = '',
  ogImage = '',
  ogType = 'website',
  className = '',
}) => {
  useEffect(() => {
    // 1. Primary Page Title
    document.title = title;

    // 2. Meta Description
    setMetaTag('name', 'description', description);

    // 3. Canonical URL
    if (canonicalUrl) {
      const fullCanonical = canonicalUrl.startsWith('http')
        ? canonicalUrl
        : `${window.location.origin}${canonicalUrl.startsWith('/') ? canonicalUrl : `/${canonicalUrl}`}`;
      setLinkTag('canonical', fullCanonical);
      setMetaTag('property', 'og:url', fullCanonical);
    }

    // 4. Open Graph Meta Tags
    setMetaTag('property', 'og:title', ogTitle || title);
    setMetaTag('property', 'og:description', ogDescription || description);
    setMetaTag('property', 'og:type', ogType);
    if (ogImage) {
      setMetaTag('property', 'og:image', ogImage);
      setMetaTag('name', 'twitter:image', ogImage);
    }

    // 5. Twitter Meta Tags
    setMetaTag('name', 'twitter:card', ogImage ? 'summary_large_image' : 'summary');
    setMetaTag('name', 'twitter:title', ogTitle || title);
    setMetaTag('name', 'twitter:description', ogDescription || description);
  }, [title, description, canonicalUrl, ogTitle, ogDescription, ogImage, ogType]);

  return (
    <div className={`relative min-h-screen bg-[#050505] text-white selection:bg-[#FF1F26] selection:text-white animate-fade-in ${className}`}>
      {children}
    </div>
  );
};

export default PageWrapper;
