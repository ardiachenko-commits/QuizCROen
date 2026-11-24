import { useState } from 'react';
import { motion } from 'motion/react';
import { RotateCcw } from 'lucide-react';
import type { ResultTier } from '../data/quizData';
import { NetpeakLogo } from './NetpeakLogo';

interface ResultsScreenProps {
  potential: number;
  tier: ResultTier;
  onBookConsultation: () => void;
  onRetake: () => void;
}

export function ResultsScreen({
  potential,
  tier,
  onBookConsultation,
  onRetake,
}: ResultsScreenProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      key="results"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-4xl w-full px-2 md:px-0 space-y-5 md:space-y-6"
    >
      {/* Main Potential Score Card */}
      <section className="netpeak-card !p-6 md:!p-8 text-center relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#5aace9] to-[#ff4e00]"
        />

        <h1 className="text-lg md:text-2xl font-black text-[#1a1a1a] uppercase tracking-tight mb-5 md:mb-6 mt-1">
          YOUR CONVERSION GROWTH POTENTIAL
        </h1>

        <div className="flex justify-center mb-5 md:mb-6">
          <motion.div
            initial={{ scale: 0.65, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="w-32 h-32 md:w-36 md:h-36 rounded-full border-[9px] md:border-[10px] border-[#5aace9] flex items-center justify-center bg-white shadow-[0_18px_40px_rgba(90,172,233,0.26)]"
          >
            <span className="text-3xl md:text-5xl font-black text-[#5aace9] tabular-nums">
              {potential}%
            </span>
          </motion.div>
        </div>

        <div className="text-left space-y-4 max-w-2xl mx-auto">
          <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed font-medium">
            {tier.description}
          </p>

          <div className="p-4 md:p-5 bg-blue-50/70 rounded-2xl border border-blue-100">
            <p className="font-bold text-[#3f95d6] text-sm md:text-base leading-snug">
              {tier.highlightedMessage}
            </p>
          </div>
        </div>
      </section>

      {/* Offer Card */}
      <section className="netpeak-card !p-6 md:!p-7 relative overflow-hidden border border-orange-100">
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-1 bg-[#ff4e00]"
        />

        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-6 mb-5">
          <div className="w-16 h-16 md:w-[72px] md:h-[72px] bg-[#fff7ed] rounded-2xl flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 64 64"
              className="w-11 h-11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Left & right box faces */}
              <path d="M12 29L32 39V57L12 46V29Z" fill="#E39D10" />
              <path d="M52 29L32 39V57L52 46V29Z" fill="#F6B828" />
              {/* Box lid sides */}
              <path d="M10 22L32 33V40L10 29V22Z" fill="#F4B21D" />
              <path d="M54 22L32 33V40L54 29V22Z" fill="#FFCA45" />
              {/* Lid top */}
              <path d="M32 11L54 22L32 33L10 22L32 11Z" fill="#FFD45A" />
              {/* Subtle lid shadow */}
              <path d="M12 29.8L32 40L52 29.8V31.5L32 41.7L12 31.5V29.8Z" fill="#B87606" opacity="0.45" />
              {/* Vertical red ribbons on box sides */}
              <path d="M20 33L25 35.5V53L20 50.3V33Z" fill="#D92D20" />
              <path d="M44 33L39 35.5V53L44 50.3V33Z" fill="#F04438" />
              {/* Ribbon on lid sides */}
              <path d="M19 26.5L24.5 29.2V36.2L19 33.5V26.5Z" fill="#E12D24" />
              <path d="M45 26.5L39.5 29.2V36.2L45 33.5V26.5Z" fill="#F4483C" />
              {/* Cross ribbon on top */}
              <path d="M20.5 16.8L25.5 14.3L45 24L39.5 26.8L20.5 16.8Z" fill="#F04438" />
              <path d="M43.5 16.8L38.5 14.3L19 24L24.5 26.8L43.5 16.8Z" fill="#E12D24" />
              {/* Red bow loops */}
              <path
                d="M31.5 18.5C25.5 17.5 18.5 15.5 18.5 10.5C18.5 6.8 23.2 6.2 27.5 9.8C29.5 11.5 30.8 14.2 31.5 18.5Z"
                fill="#F04438"
              />
              <path
                d="M32.5 18.5C38.5 17.5 45.5 15.5 45.5 10.5C45.5 6.8 40.8 6.2 36.5 9.8C34.5 11.5 33.2 14.2 32.5 18.5Z"
                fill="#FF5A4E"
              />
              <path
                d="M20 11.5C20.5 9.5 23.5 9.2 27 12C28.5 13.2 29.8 15 30.5 17.2C26 16.2 20.8 14.2 20 11.5Z"
                fill="#C92218"
              />
              <path
                d="M44 11.5C43.5 9.5 40.5 9.2 37 12C35.5 13.2 34.2 15 33.5 17.2C38 16.2 43.2 14.2 44 11.5Z"
                fill="#D92D20"
              />
              {/* Bow knot */}
              <ellipse cx="32" cy="17.2" rx="4.2" ry="3.4" fill="#F4483C" />
              <ellipse cx="32" cy="16.5" rx="2.8" ry="2" fill="#FF6B60" opacity="0.65" />
            </svg>
          </div>

          <div className="flex-1 text-center md:text-left">
            <p className="text-slate-600 text-sm md:text-lg mb-1.5">
              Book a call with our UX/UI experts and grab a special bonus:
            </p>
            <p className="font-bold text-[#1a1a1a] text-base md:text-xl leading-snug mb-1.5">
              3 free CRO hypotheses that could increase your website’s conversion rate by 20% or
              more
            </p>
            <p className="text-xs md:text-sm text-slate-500">
              (Bonus available after the consultation)
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onBookConsultation}
          className="netpeak-button w-full py-4 md:py-5 text-sm md:text-base"
        >
          BOOK A CONSULTATION
        </button>
      </section>

      {/* Expert Profile Card */}
      <section className="netpeak-card !px-6 md:!px-10 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-1 bg-[#5aace9]"
        />

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-slate-100 shadow-lg bg-slate-50 flex items-center justify-center shrink-0">
            {imageError ? (
              <div className="w-full h-full bg-gradient-to-br from-[#5aace9] to-[#3a8cc9] flex items-center justify-center text-white font-bold text-2xl md:text-3xl">
                DM
              </div>
            ) : (
              <img
                src="/danylo-minin.jpg"
                alt="Danylo Minin, Head of UX/UI Design & CRO Department"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
              />
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="mb-3">
              <h2 className="text-xl font-black text-[#1a1a1a] mb-1">Danylo Minin</h2>
              <p className="text-[11px] font-extrabold text-[#3f95d6] uppercase tracking-[0.18em]">
                HEAD OF UX/UI DESIGN &amp; CRO DEPARTMENT
              </p>
            </div>

            <blockquote className="text-slate-600 italic text-xs md:text-[13px] leading-relaxed">
              &ldquo;We&apos;ll help you unlock your website’s full potential by improving its
              conversion rate. Grow your customer base without a proportional increase in
              advertising costs.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      <div className="flex flex-col items-center gap-6 pt-2 pb-4">
        <button
          type="button"
          onClick={onRetake}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#5aace9] transition-colors px-4 py-2 rounded-lg cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          <span>Retake Quiz</span>
        </button>

        <NetpeakLogo size="sm" />
      </div>
    </motion.div>
  );
}
