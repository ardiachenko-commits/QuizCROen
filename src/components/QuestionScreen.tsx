import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import type { QuizQuestion } from '../data/quizData';
import { NetpeakLogo } from './NetpeakLogo';

interface QuestionScreenProps {
  question: QuizQuestion;
  currentStep: number;
  totalSteps: number;
  selectedOptionId?: string;
  onSelect: (questionId: string, optionId: string) => void;
  onBack: () => void;
}

export function QuestionScreen({
  question,
  currentStep,
  totalSteps,
  selectedOptionId,
  onSelect,
  onBack,
}: QuestionScreenProps) {
  const progressPercent = ((currentStep + 1) / totalSteps) * 100;

  return (
    <motion.div
      key={`question-${question.id}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-2xl w-full flex flex-col items-center"
    >
      <NetpeakLogo compact />

      <div className="w-full mb-10 md:mb-12 bg-white/90 backdrop-blur-sm border border-slate-200/70 rounded-2xl p-4 md:p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-[#5aace9] transition-colors px-2.5 py-1.5 rounded-lg hover:bg-[#5aace9]/5 focus-visible:outline-2 focus-visible:outline-[#5aace9] cursor-pointer whitespace-nowrap shrink-0"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back</span>
          </button>

          <span className="text-[10px] font-black text-[#5aace9] uppercase tracking-[0.18em] tabular-nums whitespace-nowrap shrink-0 bg-[#5aace9]/8 px-3.5 py-1.5 rounded-xl border border-[#5aace9]/15">
            QUESTION {currentStep + 1} OF {totalSteps}
          </span>
        </div>

        <div
          className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={currentStep + 1}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-label={`Question ${currentStep + 1} of ${totalSteps}`}
        >
          <motion.div
            className="bg-[#5aace9] h-full rounded-full shadow-[0_0_12px_rgba(90,172,233,0.35)]"
            initial={false}
            animate={{ width: `${progressPercent}%` }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
          />
        </div>
      </div>

      <div className="text-center mb-8 md:mb-10 px-2">
        <h2
          className="text-2xl md:text-[32px] font-bold text-[#1a1a1a] leading-tight"
          style={{ textWrap: 'balance' }}
        >
          {question.text}
        </h2>
      </div>

      <div className="grid gap-3.5 md:gap-4 w-full" role="radiogroup" aria-label={question.text}>
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(question.id, option.id)}
              className={`group text-left p-4 md:p-6 rounded-xl border-2 transition-all duration-150 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5aace9] ${
                isSelected
                  ? 'border-[#5aace9] bg-[#5aace9]/8 shadow-sm'
                  : 'border-slate-100 bg-white hover:border-[#5aace9] hover:bg-[#5aace9]/5'
              }`}
            >
              <span
                className={`text-base md:text-lg font-medium leading-snug transition-colors ${
                  isSelected ? 'text-[#1a1a1a] font-semibold' : 'text-slate-800 group-hover:text-[#1a1a1a]'
                }`}
              >
                {option.text}
              </span>

              <span
                aria-hidden="true"
                className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'border-[#5aace9] bg-[#5aace9]'
                    : 'border-slate-200 group-hover:border-[#5aace9]'
                }`}
              >
                {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-white" />}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
