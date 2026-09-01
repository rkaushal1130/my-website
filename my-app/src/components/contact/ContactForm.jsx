import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, ShieldCheck, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import ButtonLoader from '../common/ButtonLoader';
import { contactService } from '../../services';

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

  const services = [
    'AI Automation',
    'Machine Learning',
    'Data Intelligence',
    'Custom AI Solutions',
    'AI Consulting',
    'Other',
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMessage) setErrorMessage('');
    if (fieldErrors.length) setFieldErrors([]);
  };

  const validateClientSide = () => {
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMessage('Please enter your full name (minimum 2 characters).');
      return false;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setErrorMessage('Please tell us a bit about your project or challenge (minimum 5 characters).');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    // 1. Do not reload the page
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

      // 7. Show useful validation errors if request fails without exposing raw backend internals
      const friendlyMessage =
        err.message || 'Unable to send your message right now. Please try again.';

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
    <div className="relative rounded-[24px] bg-[#101010]/95 border border-[#242424] hover:border-[#FF1F26]/40 backdrop-blur-md p-6 sm:p-8 lg:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] transition-all duration-400 overflow-hidden text-left">
      {/* Ambient Red Glow & Top Gradient Border */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF1F26]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF1F26]/40 to-transparent" />

      {isSubmitted ? (
        /* 5. Success Message Screen */
        <div className="py-12 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Message Sent Successfully
          </h3>

          <p className="text-sm sm:text-base text-[#A7A7A7] max-w-md mx-auto leading-relaxed">
            Your message has been received. We'll get back to you soon.
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
        /* Form View */
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

          {/* Error Message & Field Validation Errors Alert */}
          <ErrorMessage
            message={errorMessage}
            errors={fieldErrors}
            variant="banner"
          />

          {/* Row 1: Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium">
                Full Name <span className="text-[#FF1F26]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                disabled={isSubmitting}
                value={formData.name}
                onChange={handleChange}
                placeholder="Rahul Kaushal"
                className="w-full min-h-[48px] px-4 rounded-xl bg-[#050505] border border-[#242424] text-white placeholder-[#666666] text-sm focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all duration-200 disabled:opacity-60"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium">
                Email Address <span className="text-[#FF1F26]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                disabled={isSubmitting}
                value={formData.email}
                onChange={handleChange}
                placeholder="rahul@example.com"
                className="w-full min-h-[48px] px-4 rounded-xl bg-[#050505] border border-[#242424] text-white placeholder-[#666666] text-sm focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all duration-200 disabled:opacity-60"
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
                disabled={isSubmitting}
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 90153 23903"
                className="w-full min-h-[48px] px-4 rounded-xl bg-[#050505] border border-[#242424] text-white placeholder-[#666666] text-sm focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all duration-200 disabled:opacity-60"
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
                disabled={isSubmitting}
                value={formData.company}
                onChange={handleChange}
                placeholder="Example Enterprise"
                className="w-full min-h-[48px] px-4 rounded-xl bg-[#050505] border border-[#242424] text-white placeholder-[#666666] text-sm focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all duration-200 disabled:opacity-60"
              />
            </div>
          </div>

          {/* Row 3: Service Selection */}
          <div>
            <label htmlFor="service" className="block text-xs sm:text-sm text-[#CCCCCC] mb-1.5 font-medium">
              Area of Interest / Service
            </label>
            <select
              id="service"
              name="service"
              disabled={isSubmitting}
              value={formData.service}
              onChange={handleChange}
              className="w-full min-h-[48px] px-4 rounded-xl bg-[#050505] border border-[#242424] text-white text-sm focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all duration-200 cursor-pointer disabled:opacity-60"
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
              Project Details or Message <span className="text-[#FF1F26]">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              disabled={isSubmitting}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your objectives, timeline, or challenge..."
              className="w-full p-4 rounded-xl bg-[#050505] border border-[#242424] text-white placeholder-[#666666] text-sm focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all duration-200 resize-none disabled:opacity-60"
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
