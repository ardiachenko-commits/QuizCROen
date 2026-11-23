import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { NetpeakLogo } from './NetpeakLogo';

interface LandingScreenProps {
  onStart: () => void;
}

export function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <motion.div
      key="landing"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-4xl w-full flex flex-col items-center text-center px-2"
    >
      <NetpeakLogo />

      <h1
        className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold leading-[1.15] tracking-tight text-[#1a1a1a] mb-6 md:mb-8 max-w-3xl"
        style={{ textWrap: 'balance' }}
      >
        How Much <span className="text-[#5aace9]">Conversion Potential</span> Is Your Website Missing?
      </h1>

      <p className="text-base md:text-[18px] text-slate-600 mb-10 md:mb-12 max-w-2xl leading-relaxed px-2">
        Take a quick quiz to find out how much more revenue your website could generate. Reveal how
        a smoother user journey and better UX can turn more visitors into customers.
      </p>

      <button
        type="button"
        onClick={onStart}
        className="netpeak-button group relative flex items-center justify-center w-full max-w-md md:max-w-2xl py-4 md:py-5 px-8 text-sm sm:text-base md:text-lg"
      >
        <span className="whitespace-nowrap">START THE 3-MINUTE QUIZ</span>
        <ArrowRight
          aria-hidden="true"
          className="w-5 h-5 md:w-6 md:h-6 absolute right-5 md:right-7 transition-transform duration-200 group-hover:translate-x-1"
        />
      </button>
    </motion.div>
  );
}
