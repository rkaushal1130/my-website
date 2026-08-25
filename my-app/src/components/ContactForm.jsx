import React, { useState } from 'react';
import { Send, CheckCircle2, Lock, Loader2, AlertCircle } from 'lucide-react';
import { contactService } from '../services';

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
  const [fieldErrors, setFieldErrors] = useState([]);

  const validateClientSide = () => {
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMessage('Please enter your full name (minimum 2 characters).');
      return false;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid work email address.');
      return false;
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setErrorMessage('Please enter your project message or challenge (minimum 5 characters).');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    // 1. Do not reload page
    e.preventDefault();

    // Prevent duplicate submissions
    if (isSubmitting) return;

    setErrorMessage('');
    setFieldErrors([]);

    // 1. Validate client-side
    if (!validateClientSide()) {
      return;
    }

    // 2. Disable submit button & 3. Show "Sending..."
    setIsSubmitting(true);

    try {
      // 4. Send request to backend POST /api/contact
      await contactService.submitContactForm({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        company: formData.company.trim() || undefined,
        service: formData.service || undefined,
        message: formData.message.trim(),
      });

      // 5. Show success message & 6. Clear form after successful submission
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: 'AI Automation',
        message: '',
      });
    } catch (err) {
      console.error('Contact submission error:', err);

      // 7. Show useful validation errors if request fails without exposing raw backend errors
      const friendlyMessage =
        err.status === 400 && err.message
          ? err.message
          : 'Unable to send your message right now. Please try again.';

      setErrorMessage(friendlyMessage);

      if (err.errors && Array.isArray(err.errors) && err.errors.length > 0) {
        setFieldErrors(err.errors);
      }
    } finally {
      // 8. Re-enable button
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setErrorMessage('');
    setFieldErrors([]);
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
    <div className="relative rounded-[24px] bg-[#0D0D0D] border border-[#252525] p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-[#FF1F26]/30 transition-all duration-300">
      {/* Top Red Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF1F26] to-transparent" />

      {isSubmitted ? (
        /* 5. Success Message Screen */
        <div className="py-12 sm:py-16 text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-2xl bg-[#FF1F26]/10 border border-[#FF1F26]/40 flex items-center justify-center text-[#FF1F26] mb-6 shadow-[0_0_30px_rgba(255,31,38,0.35)] animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Message Sent Successfully
          </h3>

          <p className="text-sm sm:text-base text-[#A8A8A8] max-w-md mb-8 leading-relaxed">
            Your message has been received. We'll get back to you soon.
          </p>

          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-3 rounded-xl bg-[#111111] border border-[#252525] hover:border-[#FF1F26] text-white text-sm font-medium hover:bg-[#FF1F26] transition-all duration-300 cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        /* Form View */
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

          {/* 7. Error Message & Field Validation Errors Alert */}
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-[#FF1F26]/10 border border-[#FF1F26]/40 flex flex-col gap-1.5 text-xs text-[#FF3030] animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span className="font-semibold">{errorMessage}</span>
              </div>
              {fieldErrors.length > 0 && (
                <ul className="list-disc list-inside pl-1 text-[11px] text-[#FF6B6B]">
                  {fieldErrors.map((err, idx) => (
                    <li key={idx}>
                      <span className="capitalize">{err.field}</span>: {err.message}
                    </li>
                  ))}
                </ul>
              )}
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
                  required
                  disabled={isSubmitting}
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#050505] border border-[#292929] focus:border-[#FF1F26] focus:shadow-[0_0_12px_rgba(255,31,38,0.25)] rounded-xl px-4 py-3 text-sm text-white placeholder-[#737373] focus:outline-none transition-all duration-200 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#FFFFFF] mb-2">
                  Email Address <span className="text-[#FF1F26]">*</span>
                </label>
                <input
                  type="email"
                  required
                  disabled={isSubmitting}
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#050505] border border-[#292929] focus:border-[#FF1F26] focus:shadow-[0_0_12px_rgba(255,31,38,0.25)] rounded-xl px-4 py-3 text-sm text-white placeholder-[#737373] focus:outline-none transition-all duration-200 disabled:opacity-60"
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
                  disabled={isSubmitting}
                  placeholder="+91 90153 23903"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#050505] border border-[#292929] focus:border-[#FF1F26] focus:shadow-[0_0_12px_rgba(255,31,38,0.25)] rounded-xl px-4 py-3 text-sm text-white placeholder-[#737373] focus:outline-none transition-all duration-200 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#FFFFFF] mb-2">
                  Company
                </label>
                <input
                  type="text"
                  disabled={isSubmitting}
                  placeholder="Company name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-[#050505] border border-[#292929] focus:border-[#FF1F26] focus:shadow-[0_0_12px_rgba(255,31,38,0.25)] rounded-xl px-4 py-3 text-sm text-white placeholder-[#737373] focus:outline-none transition-all duration-200 disabled:opacity-60"
                />
              </div>
            </div>

            {/* Service Dropdown */}
            <div>
              <label className="block text-xs font-medium text-[#FFFFFF] mb-2">
                Service
              </label>
              <select
                disabled={isSubmitting}
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full bg-[#050505] border border-[#292929] focus:border-[#FF1F26] focus:shadow-[0_0_12px_rgba(255,31,38,0.25)] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-200 cursor-pointer disabled:opacity-60"
              >
                <option value="AI Automation">AI Automation</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Data Intelligence">Data Intelligence</option>
                <option value="Custom AI Solutions">Custom AI Solutions</option>
                <option value="AI Consulting">AI Consulting</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-xs font-medium text-[#FFFFFF] mb-2">
                Message <span className="text-[#FF1F26]">*</span>
              </label>
              <textarea
                rows={5}
                required
                disabled={isSubmitting}
                placeholder="Tell us about your project, goals or challenge..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full min-h-[150px] bg-[#050505] border border-[#292929] focus:border-[#FF1F26] focus:shadow-[0_0_12px_rgba(255,31,38,0.25)] rounded-xl p-4 text-sm text-white placeholder-[#737373] focus:outline-none transition-all duration-200 resize-y disabled:opacity-60"
              />
            </div>

            {/* Submit Button (2. Disable submit button & 3. Show "Sending...") */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[#FF1F26] hover:bg-[#FF3030] text-white text-base font-bold shadow-[0_0_25px_rgba(255,31,38,0.35)] hover:shadow-[0_0_35px_rgba(255,31,38,0.55)] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
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
