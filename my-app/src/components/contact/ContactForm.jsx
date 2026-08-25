import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, ShieldCheck, Sparkles } from 'lucide-react';
import Button from '../common/Button';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'AI Automation',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const services = [
    'AI Automation',
    'Machine Learning',
    'Data Intelligence',
    'Custom AI',
    'Enterprise Consultation',
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Please tell us a bit about your project or inquiry.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: 'AI Automation',
      message: '',
    });
  };

  return (
    <div className="relative rounded-[24px] bg-[#101010]/95 border border-[#242424] hover:border-[#FF1F26]/40 backdrop-blur-md p-6 sm:p-8 lg:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] transition-all duration-400 overflow-hidden text-left">
      
      {/* Ambient Red Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF1F26]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF1F26]/40 to-transparent" />

      {isSubmitted ? (
        <div className="py-12 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Message Transmitted
          </h3>

          <p className="text-sm sm:text-base text-[#A7A7A7] max-w-md mx-auto leading-relaxed">
            Thank you, <span className="text-white font-semibold">{formData.name}</span>. Our engineering team has received your message and will respond within one business day.
          </p>

          <div className="pt-4">
            <Button
              onClick={handleReset}
              variant="outline"
              size="md"
              icon={false}
            >
              Send Another Message
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="flex items-center justify-between pb-3 border-b border-[#1D1D1D]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF1F26] animate-ping" />
              <span className="text-sm text-white font-semibold">
                Direct Inquiry Channel
              </span>
            </div>
            <span className="text-xs text-[#FF3030] flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#FF1F26]" />
              Encrypted
            </span>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#FF1F26]" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full min-h-[48px] px-4 rounded-xl bg-[#050505] border border-[#242424] text-white placeholder-[#666666] text-sm focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@company.com"
                className="w-full min-h-[48px] px-4 rounded-xl bg-[#050505] border border-[#242424] text-white placeholder-[#666666] text-sm focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Row 2: Phone & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 90153 23903"
                className="w-full min-h-[48px] px-4 rounded-xl bg-[#050505] border border-[#242424] text-white placeholder-[#666666] text-sm focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Acme Corp"
                className="w-full min-h-[48px] px-4 rounded-xl bg-[#050505] border border-[#242424] text-white placeholder-[#666666] text-sm focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Row 3: Service */}
          <div>
            <label htmlFor="service" className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium">
              Area of Interest
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full min-h-[48px] px-4 rounded-xl bg-[#050505] border border-[#242424] text-white text-sm focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all duration-200 cursor-pointer"
            >
              {services.map((srv, idx) => (
                <option key={idx} value={srv} className="bg-[#101010] text-white">
                  {srv}
                </option>
              ))}
            </select>
          </div>

          {/* Row 4: Message */}
          <div>
            <label htmlFor="message" className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium">
              Project Details or Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your objectives, timeline, or current technical stack..."
              className="w-full p-4 rounded-xl bg-[#050505] border border-[#242424] text-white placeholder-[#666666] text-sm focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all duration-200 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="w-full"
              icon={false}
              customIcon={<Send className="w-4 h-4" />}
            >
              {isSubmitting ? 'Transmitting Message...' : 'Send Message'}
            </Button>
          </div>

          <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-[#737373]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF1F26]" />
            <span>Strict NDA & zero third-party data sharing policy.</span>
          </div>

        </form>
      )}

    </div>
  );
};

export default ContactForm;
