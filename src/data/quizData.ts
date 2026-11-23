export interface QuizOption {
  id: string;
  text: string;
  score: number;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
}

export interface ResultTier {
  range: string;
  description: string;
  highlightedMessage: string;
}

export interface BookingFormValues {
  name: string;
  email: string;
  website: string;
  agreedToPrivacy: boolean;
}

export interface BookingFormErrors {
  name?: string;
  email?: string;
  website?: string;
  privacy?: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'visitors',
    text: 'How Many Visitors Does Your Website Get per Month?',
    options: [
      { id: 'v1', text: 'Up to 30,000', score: 0 },
      { id: 'v2', text: '30,000–100,000', score: 0 },
      { id: 'v3', text: 'More than 100,000', score: 0 },
      { id: 'v4', text: "I'm Not Sure", score: 0 },
    ],
  },
  {
    id: 'design_update',
    text: 'When Was Your Website’s Design or Structure Last Updated?',
    options: [
      { id: 'd1', text: 'Less than a year ago', score: 5 },
      { id: 'd2', text: '1–3 years ago', score: 10 },
      { id: 'd3', text: 'More than 3 years ago', score: 10 },
      { id: 'd4', text: 'The design has never been updated', score: 20 },
    ],
  },
  {
    id: 'ab_tests',
    text: 'Have You Conducted A/B Tests on Your Website’s Pages or Sections?',
    options: [
      { id: 'ab1', text: 'Yes, regularly', score: 0 },
      { id: 'ab2', text: 'Yes, a few times', score: 5 },
      { id: 'ab3', text: "We're planning to", score: 10 },
      { id: 'ab4', text: "We've never run A/B tests", score: 20 },
    ],
  },
  {
    id: 'conversion_format',
    text: 'Which Type of Inquiry Does Your Website Receive Most Often?',
    options: [
      { id: 'cf1', text: 'Online form submissions dominate (80% / 20%)', score: 0 },
      { id: 'cf2', text: 'More form submissions than phone calls (60% / 40%)', score: 5 },
      { id: 'cf3', text: 'More phone calls than form submissions (40% / 60%)', score: 15 },
      { id: 'cf4', text: 'Phone calls dominate (20% / 80%)', score: 10 },
    ],
  },
  {
    id: 'conversion_rate',
    text: 'What Is Your Website’s Conversion Rate from Visitors to Leads or Orders?',
    options: [
      { id: 'cr1', text: 'Up to 2%', score: 20 },
      { id: 'cr2', text: '2%–5%', score: 10 },
      { id: 'cr3', text: 'More than 5%', score: 0 },
      { id: 'cr4', text: "I'm Not Sure", score: 0 },
    ],
  },
  {
    id: 'value_proposition',
    text: 'Have You Tested Whether Visitors Understand Your Website’s Value Proposition?',
    options: [
      { id: 'vp1', text: 'Yes, through visitor feedback and customer interviews', score: 5 },
      { id: 'vp2', text: 'No, our messaging is based on internal assumptions', score: 10 },
      { id: 'vp3', text: "I'm not sure", score: 20 },
    ],
  },
  {
    id: 'trust_elements',
    text: 'Does Your Website Feature Customer Reviews, Portfolio Examples, or Proven Results?',
    options: [
      { id: 'te1', text: 'Yes, on the homepage and relevant product or service pages', score: 0 },
      { id: 'te2', text: 'Yes, but only on the homepage or product/service pages', score: 5 },
      { id: 'te3', text: 'Yes, but only on a separate reviews or portfolio page', score: 10 },
      { id: 'te4', text: 'No', score: 20 },
    ],
  },
];

export function calculatePotential(answers: Record<string, string>): number {
  let totalScore = 0;
  for (const question of QUIZ_QUESTIONS) {
    const selectedOptionId = answers[question.id];
    const matchedOption = question.options.find((opt) => opt.id === selectedOptionId);
    if (matchedOption) {
      totalScore += matchedOption.score;
    }
  }
  return Math.round(Math.min(Math.max(totalScore, 5), 70));
}

export function getResultTier(potential: number): ResultTier {
  const highlightedMessage = `You could generate approximately ${potential}% more orders or leads by improving your website’s conversion rate.`;

  if (potential <= 15) {
    return {
      range: '5–15%',
      description:
        'Your website is already performing at a relatively high level. Further growth could be achieved through deeper behavioral analytics and the optimization of cognitive triggers.',
      highlightedMessage,
    };
  }

  if (potential <= 30) {
    return {
      range: '15–30%',
      description:
        'Your website has a solid foundation, but certain areas may be limiting its growth potential. Optimizing the user experience (UX) and key stages of the conversion funnel could significantly improve the performance of your existing traffic without increasing your ad budget.',
      highlightedMessage,
    };
  }

  if (potential <= 50) {
    return {
      range: '30–50%',
      description:
        'Your website has significant room for growth. A comprehensive CRO strategy could substantially increase the number of key conversion actions within a few months.',
      highlightedMessage,
    };
  }

  return {
    range: '50–70%',
    description:
      'Your website’s current performance is significantly limiting your business results. There are substantial opportunities for improvement in its structure and functionality. A systematic approach to CRO could help you grow your customer base without a proportional increase in your advertising budget.',
    highlightedMessage,
  };
}

export function validateBookingForm(values: BookingFormValues): BookingFormErrors {
  const errors: BookingFormErrors = {};

  const trimmedName = values.name.trim();
  if (!trimmedName) {
    errors.name = 'Please enter your name';
  } else if (trimmedName.length < 2 || trimmedName.length > 100) {
    errors.name = 'Name must be between 2 and 100 characters';
  } else if (!/^[\p{L}\s\-'’‘`]+$/u.test(trimmedName)) {
    errors.name = 'Name contains invalid characters';
  }

  const trimmedEmail = values.email.trim();
  if (!trimmedEmail) {
    errors.email = 'Please enter your email address';
  } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address';
  }

  const trimmedWebsite = values.website.trim();
  if (!trimmedWebsite) {
    errors.website = 'Please enter your company website';
  } else if (!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i.test(trimmedWebsite)) {
    errors.website = 'Please enter a valid website URL (e.g. https://example.com)';
  }

  if (!values.agreedToPrivacy) {
    errors.privacy = 'Please accept the Privacy Policy to continue';
  }

  return errors;
}

export function normalizeWebsiteUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return '';
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}
