import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Lock, Loader2, AlertCircle } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'AI Automation',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!formData.email.trim() || !validateEmail(formData.email)) {
      setErrorMsg('Please enter a valid work email address.');
      return;
    }

    if (!formData.message.trim()) {
      setErrorMsg('Please enter your project message or challenge.');
      return;
    }

    setIsLoading(true);

    // Simulate reliable asynchronous API dispatch
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: 'AI Automation',
      message: '',
    });
    setIsSubmitted(false);
    setErrorMsg('');
  };

  return (
    <div className="relative rounded-[24px] bg-[#0D0D0D] border border-[#252525] p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-[#FF1F26]/30 transition-all duration-300">
      
      {/* Top Red Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF1F26] to-transparent" />

      {isSubmitted ? (
        <div className="py-12 sm:py-16 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-[#FF1F26]/10 border border-[#FF1F26]/40 flex items-center justify-center text-[#FF1F26] mb-6 shadow-[0_0_30px_rgba(255,31,38,0.35)] animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Message Sent Successfully
          </h3>

          <p className="text-sm sm:text-base text-[#A8A8A8] max-w-md mb-8 leading-relaxed">
            We've received your message and will get back to you shortly. A senior AI architect has been notified.
          </p>

          <div className="p-4 rounded-xl bg-[#050505] border border-[#252525] w-full text-left mb-8 max-w-md">
            <div className="text-[11px] text-[#737373] uppercase font-mono tracking-wider">Inquiry Summary</div>
            <div className="text-sm font-semibold text-white mt-1">
              {formData.name} — <span className="text-[#FF1F26]">{formData.service}</span>
            </div>
            <div className="text-xs text-[#A8A8A8] mt-0.5">{formData.email}</div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-3 rounded-xl bg-[#111111] border border-[#252525] hover:border-[#FF1F26] text-white text-sm font-medium hover:bg-[#FF1F26] transition-all duration-300 cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <div>
          {/* Header */}
          <div className="mb-8 text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Tell Us About Your Project
            </h3>
            <p className="text-sm text-[#A8A8A8]">
              Fill out the form and our team will get back to you shortly.
            </p>
          </div>

          {/* Validation Error Alert */}
          {errorMsg && (
            <div className="mb-6 p-3.5 rounded-xl bg-[#FF1F26]/10 border border-[#FF1F26]/40 flex items-center gap-2.5 text-xs text-[#FF3030]">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            
            {/* Full Name & Email Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-[#FFFFFF] mb-2">
                  Full Name <span className="text-[#FF1F26]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#050505] border border-[#292929] focus:border-[#FF1F26] focus:shadow-[0_0_12px_rgba(255,31,38,0.25)] rounded-xl px-4 py-3 text-sm text-white placeholder-[#737373] focus:outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#FFFFFF] mb-2">
                  Email Address <span className="text-[#FF1F26]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#050505] border border-[#292929] focus:border-[#FF1F26] focus:shadow-[0_0_12px_rgba(255,31,38,0.25)] rounded-xl px-4 py-3 text-sm text-white placeholder-[#737373] focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Phone Number & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-[#FFFFFF] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 90153 23903"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#050505] border border-[#292929] focus:border-[#FF1F26] focus:shadow-[0_0_12px_rgba(255,31,38,0.25)] rounded-xl px-4 py-3 text-sm text-white placeholder-[#737373] focus:outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#FFFFFF] mb-2">
                  Company
                </label>
                <input
                  type="text"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-[#050505] border border-[#292929] focus:border-[#FF1F26] focus:shadow-[0_0_12px_rgba(255,31,38,0.25)] rounded-xl px-4 py-3 text-sm text-white placeholder-[#737373] focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Service Dropdown */}
            <div>
              <label className="block text-xs font-medium text-[#FFFFFF] mb-2">
                Service <span className="text-[#FF1F26]">*</span>
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full bg-[#050505] border border-[#292929] focus:border-[#FF1F26] focus:shadow-[0_0_12px_rgba(255,31,38,0.25)] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-200 cursor-pointer"
              >
                <option value="AI Automation">AI Automation</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Data Intelligence">Data Intelligence</option>
                <option value="Custom AI Solutions">Custom AI Solutions</option>
                <option value="AI Consulting">AI Consulting</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Message Textarea (~140-180px tall) */}
            <div>
              <label className="block text-xs font-medium text-[#FFFFFF] mb-2">
                Message <span className="text-[#FF1F26]">*</span>
              </label>
              <textarea
                rows={5}
                placeholder="Tell us about your project, goals or challenge..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full min-h-[150px] bg-[#050505] border border-[#292929] focus:border-[#FF1F26] focus:shadow-[0_0_12px_rgba(255,31,38,0.25)] rounded-xl p-4 text-sm text-white placeholder-[#737373] focus:outline-none transition-all duration-200 resize-y"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-[#FF1F26] hover:bg-[#FF3030] text-white text-base font-bold shadow-[0_0_25px_rgba(255,31,38,0.35)] hover:shadow-[0_0_35px_rgba(255,31,38,0.55)] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>

            {/* Security note */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#737373] pt-1">
              <Lock className="w-3.5 h-3.5 text-[#FF1F26]" />
              <span>Your information is secure and will only be used to respond to your inquiry.</span>
            </div>

          </form>
        </div>
      )}

    </div>
  );
};

export default ContactForm;
