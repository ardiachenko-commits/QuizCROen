import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import {
  validateBookingForm,
  normalizeWebsiteUrl,
  type BookingFormErrors,
  type BookingFormValues,
} from '../data/quizData';

interface BookingFormScreenProps {
  potential: number;
  answersSummary: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function BookingFormScreen({
  potential,
  answersSummary,
  onClose,
  onSuccess,
}: BookingFormScreenProps) {
  const [values, setValues] = useState<BookingFormValues>({
    name: '',
    email: '',
    website: '',
    agreedToPrivacy: false,
  });
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validateBookingForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      website: normalizeWebsiteUrl(values.website),
      percentage: potential,
      answers: answersSummary,
      submittedAt: new Date().toISOString(),
    };

    try {
      const webhookUrl = import.meta.env.VITE_BOOKING_WEBHOOK_URL as string | undefined;
      if (webhookUrl) {
        const params = new URLSearchParams({
          name: payload.name,
          email: payload.email,
          website: payload.website,
          percentage: String(payload.percentage),
          answers: payload.answers,
        });
        await fetch(`${webhookUrl}?${params.toString()}`, {
          method: 'POST',
          mode: 'no-cors',
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 650));
      }

      try {
        const existingRaw = localStorage.getItem('netpeak_cro_bookings');
        const existing = existingRaw ? (JSON.parse(existingRaw) as unknown[]) : [];
        localStorage.setItem('netpeak_cro_bookings', JSON.stringify([...existing, payload]));
      } catch {
        // Ignore storage errors in restricted browser contexts
      }

      onSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      key="booking-form"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-xl w-full netpeak-card relative"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close booking form"
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-700 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5aace9]"
      >
        <X className="w-6 h-6" aria-hidden="true" />
      </button>

      <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2 pr-10">Book a Consultation</h2>
      <p className="text-slate-500 mb-8">Leave your contact information so we can get in touch.</p>

      <form noValidate onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="booking-name" className="block text-sm font-bold text-slate-700 mb-1.5">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="booking-name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={(e) => {
              setValues({ ...values, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'booking-name-error' : undefined}
            className={`w-full p-4 rounded-xl border-2 outline-none transition-colors text-[#1a1a1a] ${
              errors.name ? 'border-red-500' : 'border-slate-100 focus:border-[#5aace9]'
            }`}
          />
          {errors.name && (
            <p id="booking-name-error" className="text-red-600 text-xs font-medium mt-1.5">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="booking-email" className="block text-sm font-bold text-slate-700 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="booking-email"
            type="email"
            autoComplete="email"
            placeholder="example@email.com"
            value={values.email}
            onChange={(e) => {
              setValues({ ...values, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'booking-email-error' : undefined}
            className={`w-full p-4 rounded-xl border-2 outline-none transition-colors text-[#1a1a1a] ${
              errors.email ? 'border-red-500' : 'border-slate-100 focus:border-[#5aace9]'
            }`}
          />
          {errors.email && (
            <p id="booking-email-error" className="text-red-600 text-xs font-medium mt-1.5">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="booking-website" className="block text-sm font-bold text-slate-700 mb-1.5">
            Company Website <span className="text-red-500">*</span>
          </label>
          <input
            id="booking-website"
            type="url"
            autoComplete="url"
            placeholder="https://..."
            value={values.website}
            onChange={(e) => {
              setValues({ ...values, website: e.target.value });
              if (errors.website) setErrors({ ...errors, website: undefined });
            }}
            aria-invalid={Boolean(errors.website)}
            aria-describedby={errors.website ? 'booking-website-error' : undefined}
            className={`w-full p-4 rounded-xl border-2 outline-none transition-colors text-[#1a1a1a] ${
              errors.website ? 'border-red-500' : 'border-slate-100 focus:border-[#5aace9]'
            }`}
          />
          {errors.website && (
            <p id="booking-website-error" className="text-red-600 text-xs font-medium mt-1.5">
              {errors.website}
            </p>
          )}
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              id="booking-privacy"
              type="checkbox"
              checked={values.agreedToPrivacy}
              onChange={(e) => {
                setValues({ ...values, agreedToPrivacy: e.target.checked });
                if (errors.privacy) setErrors({ ...errors, privacy: undefined });
              }}
              aria-invalid={Boolean(errors.privacy)}
              className="mt-0.5 w-4 h-4 accent-[#5aace9] rounded border-slate-300 cursor-pointer shrink-0"
            />
            <span className="text-xs md:text-sm text-slate-600 leading-snug">
              I agree to the processing of my personal data in accordance with the{' '}
              <a
                href="https://netpeak.net/uk/blog/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[#3f95d6] hover:underline font-semibold"
              >
                Privacy Policy
              </a>
              .
            </span>
          </label>
          {errors.privacy && (
            <p className="text-red-600 text-xs font-medium mt-1.5">{errors.privacy}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`netpeak-button w-full py-4 md:py-5 mt-4 ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Submitting…' : 'CONFIRM BOOKING'}
        </button>
      </form>
    </motion.div>
  );
}
