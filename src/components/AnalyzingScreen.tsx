import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { NetpeakLogo } from './NetpeakLogo';

interface AnalyzingScreenProps {
  progress: number;
}

export function AnalyzingScreen({ progress }: AnalyzingScreenProps) {
  const totalDots = 10;
  const completedDots = Math.floor((progress / 100) * totalDots);

  return (
    <motion.div
      key="analyzing"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-xl w-full netpeak-card relative overflow-hidden flex flex-col items-center text-center my-auto"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#5aace9] to-[#ff4e00]"
      />

      <NetpeakLogo compact />

      <div
        className="inline-flex items-center gap-2.5 bg-slate-100 rounded-full px-4 py-2.5 mb-8 mt-2"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Analyzing quiz answers"
      >
        {Array.from({ length: totalDots }).map((_, index) => {
          const isCompleted = index < completedDots;
          const isActive = index === completedDots && progress < 100;

          return (
            <span
              key={index}
              className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-colors duration-200 ${
                isCompleted
                  ? 'bg-[#3b4754]'
                  : isActive
                    ? 'bg-slate-300/70'
                    : 'bg-slate-200/80'
              }`}
            >
              {isActive && <span className="w-2 h-2 rounded-full bg-[#3b4754]" />}
            </span>
          );
        })}
      </div>

      <h2
        className="text-xl md:text-2xl font-bold text-[#1a1a1a] leading-snug mb-4 max-w-md"
        style={{ textWrap: 'balance' }}
      >
        We&apos;re Analyzing Your Answers and Preparing Your Results
      </h2>

      <div className="flex items-center gap-2 text-[#5aace9] text-sm font-bold">
        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
        <span>Please wait…</span>
      </div>
    </motion.div>
  );
}
