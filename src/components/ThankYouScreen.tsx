import { motion } from 'motion/react';
import { CheckCircle2, ExternalLink } from 'lucide-react';

interface ThankYouScreenProps {
  onGoBack: () => void;
}

export function ThankYouScreen({ onGoBack }: ThankYouScreenProps) {
  return (
    <motion.div
      key="thank-you"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-xl w-full netpeak-card text-center py-10 px-6 flex flex-col items-center"
    >
      <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-11 h-11 text-[#5aace9]" aria-hidden="true" />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4">Thank You!</h2>

      <p className="text-slate-600 text-base md:text-lg mb-8 max-w-md leading-relaxed">
        Your consultation request has been received. Our team will contact you shortly to discuss
        the details.
      </p>

      <a
        href="https://netpeak.us/services/conversion-rate-optimization"
        target="_blank"
        rel="noopener noreferrer"
        className="netpeak-button w-full py-4 flex items-center justify-center gap-2 text-sm md:text-base whitespace-nowrap"
      >
        <span>LEARN MORE ABOUT CRO</span>
        <ExternalLink className="w-5 h-5 shrink-0" aria-hidden="true" />
      </a>

      <button
        type="button"
        onClick={onGoBack}
        className="mt-6 text-sm font-bold text-slate-500 hover:text-[#5aace9] transition-colors cursor-pointer px-4 py-2 rounded-lg"
      >
        Go Back
      </button>
    </motion.div>
  );
}
