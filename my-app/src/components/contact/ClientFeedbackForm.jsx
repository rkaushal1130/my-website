import React, { useState } from 'react';
import { Star, Send, CheckCircle2, MessageSquareHeart, ArrowRight, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';
import feedbackService from '../../services/feedbackService';

const SERVICE_OPTIONS = [
  'Full-Stack Web App Development',
  'UI/UX & Modern Frontend Engineering',
  'Cloud Architecture & Microservices',
  'AI & Autonomous Workflow Automation',
  'Mobile Application Development',
  'Custom Enterprise Software',
];

const ClientFeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    stars: 5,
    quote: '',
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleStarClick = (rating) => {
    setFormData((prev) => ({ ...prev, stars: rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.quote.trim()) {
      setErrorMessage('Please write your feedback message.');
      return;
    }
    if (formData.quote.trim().length < 10) {
      setErrorMessage('Please write a detailed feedback of at least 10 characters.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await feedbackService.addFeedback({
        name: formData.name,
        service: formData.service || 'Digital Engineering',
        quote: formData.quote,
        stars: formData.stars,
      });

      if (res.success) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          service: '',
          stars: 5,
          quote: '',
        });
      } else {
        setErrorMessage(res.error || 'Failed to save feedback. Please try again.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="leave-feedback" className="py-16 sm:py-24 relative overflow-hidden bg-[#0A0A0E] border-t border-[#1C1C22]">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#FF1F26]/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12 space-y-3 font-sans">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FF1F26]/30 bg-[#FF1F26]/10 text-xs sm:text-[13px] font-semibold tracking-wider text-[#FF3030] uppercase shadow-[0_0_15px_rgba(255,31,38,0.15)] select-none">
              <MessageSquareHeart className="w-3.5 h-3.5 text-[#FF1F26]" />
              <span>CLIENT TESTIMONIALS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.15]">
              Leave Your <span className="text-[#FF1F26] text-glow">Feedback</span>
            </h2>

            <p className="text-sm sm:text-base text-[#A1A1AA] max-w-xl mx-auto font-normal leading-relaxed">
              Have you collaborated with Avaura? Share your feedback below and see it displayed live on our Portfolio page!
            </p>
          </div>

          {/* Form Container */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-[#0D0D14] border border-white/10 p-7 sm:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-sm">
            {isSubmitted ? (
              <div className="text-center py-8 sm:py-10 space-y-5 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-[#FF1F26]/15 border border-[#FF1F26]/40 text-[#FF3030] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(255,31,38,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold text-white">Thank You for Your Feedback!</h3>
                <p className="text-sm sm:text-base text-[#A1A1AA] max-w-md mx-auto leading-relaxed">
                  Your review has been successfully submitted and is now featured live in our Portfolio client feedback showcase.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
                  <Link
                    to="/portfolio#clients-feedback"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FF1F26] text-white font-semibold text-sm shadow-[0_0_20px_rgba(255,31,38,0.35)] hover:bg-[#FF3030] hover:shadow-[0_0_30px_rgba(255,31,38,0.5)] transition-all duration-300"
                  >
                    <span>View on Portfolio</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/15 text-white/80 hover:text-white hover:border-white/30 text-sm font-medium transition-colors"
                  >
                    Submit Another Review
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-[#FF1F26]/10 border border-[#FF1F26]/30 text-[#FF5A60] text-sm font-medium">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-xs sm:text-sm font-semibold text-white/90">
                      Your Name <span className="text-[#FF1F26]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Aman Mahajan"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#14141D] border border-white/10 text-white placeholder-[#71717A] text-sm focus:outline-none focus:border-[#FF1F26] focus:ring-1 focus:ring-[#FF1F26] transition-colors"
                    />
                  </div>

                  {/* Usable Option: Project / Service Type */}
                  <div className="space-y-2">
                    <label className="block text-xs sm:text-sm font-semibold text-white/90">
                      Service / Project Type
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="service"
                        list="services-list"
                        value={formData.service}
                        onChange={handleChange}
                        placeholder="e.g. Full-Stack Web App, UI/UX Design, Cloud APIs"
                        className="w-full px-4 py-3 rounded-xl bg-[#14141D] border border-white/10 text-white placeholder-[#71717A] text-sm focus:outline-none focus:border-[#FF1F26] focus:ring-1 focus:ring-[#FF1F26] transition-colors"
                      />
                      <datalist id="services-list">
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} />
                        ))}
                      </datalist>
                    </div>
                  </div>
                </div>

                {/* Rating Selector */}
                <div className="space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-white/90">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-2 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = star <= (hoveredStar || formData.stars);
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleStarClick(star)}
                          onMouseEnter={() => setHoveredStar(star)}
                          onMouseLeave={() => setHoveredStar(0)}
                          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                          className="p-1 cursor-pointer transition-transform hover:scale-115 focus:outline-none"
                        >
                          <Star
                            className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                              isFilled
                                ? 'fill-[#FBBF24] text-[#FBBF24] drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]'
                                : 'text-[#3F3F46] fill-transparent hover:text-[#71717A]'
                            }`}
                          />
                        </button>
                      );
                    })}
                    <span className="text-sm font-semibold text-[#FBBF24] ml-2">
                      {formData.stars}.0 / 5.0
                    </span>
                  </div>
                </div>

                {/* Feedback Quote with Detailed Placeholder */}
                <div className="space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-white/90">
                    Your Feedback Message <span className="text-[#FF1F26]">*</span>
                  </label>
                  <textarea
                    name="quote"
                    rows={4}
                    value={formData.quote}
                    onChange={handleChange}
                    placeholder="Describe your experience collaborating with Avaura... Tell us about the technical delivery, team communication, project speed, and overall business outcome."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#14141D] border border-white/10 text-white placeholder-[#71717A] text-sm focus:outline-none focus:border-[#FF1F26] focus:ring-1 focus:ring-[#FF1F26] transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#FF1F26] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,31,38,0.35)] hover:bg-[#FF3030] hover:shadow-[0_0_35px_rgba(255,31,38,0.55)] transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Publishing Feedback...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Feedback & Feature Live</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ClientFeedbackForm;
