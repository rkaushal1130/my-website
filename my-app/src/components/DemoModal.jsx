import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Calendar, Mail, Building, User, Phone, ArrowRight } from 'lucide-react';
import Button from './Button';

const DemoModal = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: 'AI Automation',
    timeline: 'Within 1 month',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-xl rounded-3xl bg-[#0B0B0B] border border-[#242424] shadow-[0_0_50px_rgba(255,31,38,0.25)] overflow-hidden z-10 transition-all my-8">
        {/* Glow Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF1F26] to-transparent" />
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#111111] border border-[#242424] text-[#B5B5B5] hover:text-white hover:border-[#FF1F26] flex items-center justify-center transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="p-8 sm:p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-[#FF1F26]/10 border border-[#FF1F26]/40 flex items-center justify-center text-[#FF1F26] mb-6 shadow-[0_0_25px_rgba(255,31,38,0.35)] animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Demo Request Received!</h3>
            <p className="text-sm sm:text-base text-[#B5B5B5] max-w-md mb-6 leading-relaxed">
              Thank you, <span className="text-white font-medium">{formData.name || 'there'}</span>. An AI architect from NeverquiT AI will contact you at <span className="text-[#FF1F26] font-medium">{formData.email || 'your email'}</span> within 2 hours with an interactive tailored demo.
            </p>
            <div className="p-4 rounded-xl bg-[#111111] border border-[#242424] w-full text-left mb-6">
              <div className="text-xs text-[#737373] uppercase tracking-wider mb-1">Selected Focus</div>
              <div className="text-sm font-semibold text-white flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#FF1F26]" />
                {formData.service} ({formData.timeline})
              </div>
            </div>
            <Button onClick={handleClose} variant="primary" icon={false} size="md">
              Back to Website
            </Button>
          </div>
        ) : (
          <div className="p-6 sm:p-8 md:p-10">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] border border-[#242424] text-[11px] font-semibold tracking-wider text-[#FF2B30] uppercase mb-3 w-fit">
              <Calendar className="w-3 h-3 text-[#FF1F26]" />
              Schedule 1-on-1 Consultation
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Book a Live <span className="text-[#FF1F26]">AI Demo</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#B5B5B5] mb-6">
              Discover how our enterprise-ready AI agents and machine learning architectures can accelerate your business operations.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#B5B5B5] mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#737373] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#111111] border border-[#242424] focus:border-[#FF1F26] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#737373] focus:outline-none focus:ring-1 focus:ring-[#FF1F26] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#B5B5B5] mb-1.5">
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#737373] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#111111] border border-[#242424] focus:border-[#FF1F26] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#737373] focus:outline-none focus:ring-1 focus:ring-[#FF1F26] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#B5B5B5] mb-1.5">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-[#737373] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Enterprise Inc."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-[#111111] border border-[#242424] focus:border-[#FF1F26] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#737373] focus:outline-none focus:ring-1 focus:ring-[#FF1F26] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#B5B5B5] mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#737373] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="+91 90153 23903"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#111111] border border-[#242424] focus:border-[#FF1F26] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#737373] focus:outline-none focus:ring-1 focus:ring-[#FF1F26] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#B5B5B5] mb-1.5">
                    Solution of Interest
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[#111111] border border-[#242424] focus:border-[#FF1F26] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#FF1F26] transition-colors"
                  >
                    <option value="AI Automation">AI Automation</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Data Intelligence">Data Intelligence</option>
                    <option value="Custom AI Solutions">Custom AI Solutions</option>
                    <option value="Enterprise Advisory">Enterprise Advisory</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#B5B5B5] mb-1.5">
                    Target Deployment
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full bg-[#111111] border border-[#242424] focus:border-[#FF1F26] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#FF1F26] transition-colors"
                  >
                    <option value="Immediately">Immediately (Next 2 weeks)</option>
                    <option value="Within 1 month">Within 1 month</option>
                    <option value="1-3 months">1 - 3 months</option>
                    <option value="Exploring options">Exploring options</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  className="w-full justify-center"
                >
                  Confirm Demo Booking
                </Button>
              </div>

              <p className="text-[11px] text-[#737373] text-center">
                By submitting, you agree to our Terms of Service & Privacy Policy.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoModal;
