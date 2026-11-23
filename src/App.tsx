/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import {
  QUIZ_QUESTIONS,
  calculatePotential,
  getResultTier,
} from './data/quizData';
import { NetpeakLogo } from './components/NetpeakLogo';
import { LandingScreen } from './components/LandingScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { AnalyzingScreen } from './components/AnalyzingScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { BookingFormScreen } from './components/BookingFormScreen';
import { ThankYouScreen } from './components/ThankYouScreen';

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        return 0;
      }
    }
    return -1;
  });

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isBookingSubmitted, setIsBookingSubmitted] = useState(false);

  useEffect(() => {
    if (!isAnalyzing) return;

    setAnalysisProgress(0);
    const startTime = Date.now();
    const durationMs = 2400;

    const timer = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / durationMs) * 100), 100);
      setAnalysisProgress(pct);

      if (elapsed >= durationMs) {
        window.clearInterval(timer);
        setIsAnalyzing(false);
        setIsFinished(true);
      }
    }, 30);

    return () => {
      window.clearInterval(timer);
    };
  }, [isAnalyzing]);

  const potential = useMemo(() => calculatePotential(answers), [answers]);
  const resultTier = useMemo(() => getResultTier(potential), [potential]);

  const answersSummary = useMemo(
    () =>
      QUIZ_QUESTIONS.map((q) => {
        const selectedId = answers[q.id];
        const option = q.options.find((opt) => opt.id === selectedId);
        return option ? option.text : 'No answer';
      }).join('; '),
    [answers],
  );

  const handleStart = () => {
    setCurrentStep(0);
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    const updatedAnswers = { ...answers, [questionId]: optionId };
    setAnswers(updatedAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsAnalyzing(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      setCurrentStep(-1);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setIsAnalyzing(false);
    setAnalysisProgress(0);
    setIsFinished(false);
    setShowBookingForm(false);
    setIsBookingSubmitted(false);
    setCurrentStep(0);
  };

  if (isAnalyzing) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 netpeak-bg-pattern selection:bg-[#5aace9]/15">
        <AnimatePresence mode="wait">
          <AnalyzingScreen progress={analysisProgress} />
        </AnimatePresence>
      </main>
    );
  }

  if (isFinished) {
    return (
      <main className="min-h-screen flex flex-col items-center py-10 md:py-14 px-4 netpeak-bg-pattern overflow-y-auto selection:bg-[#5aace9]/15">
        <NetpeakLogo />
        <AnimatePresence mode="wait">
          {showBookingForm ? (
            isBookingSubmitted ? (
              <ThankYouScreen
                onGoBack={() => {
                  setIsBookingSubmitted(false);
                  setShowBookingForm(false);
                }}
              />
            ) : (
              <BookingFormScreen
                potential={potential}
                answersSummary={answersSummary}
                onClose={() => setShowBookingForm(false)}
                onSuccess={() => setIsBookingSubmitted(true)}
              />
            )
          ) : (
            <ResultsScreen
              potential={potential}
              tier={resultTier}
              onBookConsultation={() => setShowBookingForm(true)}
              onRetake={handleRetake}
            />
          )}
        </AnimatePresence>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center md:justify-start md:pt-20 p-6 netpeak-bg-pattern selection:bg-[#5aace9]/15">
      <AnimatePresence mode="wait">
        {currentStep === -1 ? (
          <LandingScreen onStart={handleStart} />
        ) : (
          <QuestionScreen
            question={QUIZ_QUESTIONS[currentStep]}
            currentStep={currentStep}
            totalSteps={QUIZ_QUESTIONS.length}
            selectedOptionId={answers[QUIZ_QUESTIONS[currentStep].id]}
            onSelect={handleSelectOption}
            onBack={handleBack}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
