import test from 'node:test';
import assert from 'node:assert/strict';
import {
  QUIZ_QUESTIONS,
  calculatePotential,
  getResultTier,
  validateBookingForm,
  normalizeWebsiteUrl,
} from './quizData';

test('quiz contains exactly 7 questions matching specification', () => {
  assert.equal(QUIZ_QUESTIONS.length, 7);
  assert.equal(QUIZ_QUESTIONS[5].options.length, 3);
});

test('calculatePotential caps maximum score at 70% and handles minimum', () => {
  const minAnswers = {
    visitors: 'v1',
    design_update: 'd1',
    ab_tests: 'ab1',
    conversion_format: 'cf1',
    conversion_rate: 'cr3',
    value_proposition: 'vp1',
    trust_elements: 'te1',
  };
  assert.equal(calculatePotential(minAnswers), 10);

  const maxAnswers = {
    visitors: 'v4',
    design_update: 'd4',
    ab_tests: 'ab4',
    conversion_format: 'cf3',
    conversion_rate: 'cr1',
    value_proposition: 'vp3',
    trust_elements: 'te4',
  };
  assert.equal(calculatePotential(maxAnswers), 70);

  const midAnswers = {
    visitors: 'v1',
    design_update: 'd1',
    ab_tests: 'ab1',
    conversion_format: 'cf1',
    conversion_rate: 'cr1',
    value_proposition: 'vp1',
    trust_elements: 'te1',
  };
  assert.equal(calculatePotential(midAnswers), 30);
});

test('getResultTier maps percentages into the four copy tiers', () => {
  const low = getResultTier(15);
  assert.equal(low.range, '5–15%');
  assert.match(low.description, /behavioral analytics/i);
  assert.match(low.highlightedMessage, /15% more orders or leads/);

  const midLow = getResultTier(30);
  assert.equal(midLow.range, '15–30%');
  assert.match(midLow.description, /solid foundation/i);
  assert.match(midLow.highlightedMessage, /30% more orders or leads/);

  const midHigh = getResultTier(45);
  assert.equal(midHigh.range, '30–50%');
  assert.match(midHigh.description, /significant room for growth/i);
  assert.match(midHigh.highlightedMessage, /45% more orders or leads/);

  const high = getResultTier(70);
  assert.equal(high.range, '50–70%');
  assert.match(high.description, /significantly limiting/i);
  assert.match(high.highlightedMessage, /70% more orders or leads/);
});

test('validateBookingForm validates all required fields and checkbox', () => {
  const emptyErrors = validateBookingForm({
    name: '',
    email: '',
    website: '',
    agreedToPrivacy: false,
  });
  assert.ok(emptyErrors.name);
  assert.ok(emptyErrors.email);
  assert.ok(emptyErrors.website);
  assert.ok(emptyErrors.privacy);

  const badEmailErrors = validateBookingForm({
    name: 'Alex Morgan',
    email: 'invalid-email',
    website: 'example.com',
    agreedToPrivacy: true,
  });
  assert.ok(badEmailErrors.email);
  assert.equal(badEmailErrors.name, undefined);
  assert.equal(badEmailErrors.website, undefined);
  assert.equal(badEmailErrors.privacy, undefined);

  const validErrors = validateBookingForm({
    name: 'Alex Morgan',
    email: 'alex@company.com',
    website: 'https://company.com',
    agreedToPrivacy: true,
  });
  assert.deepEqual(validErrors, {});
});

test('normalizeWebsiteUrl prepends https:// when protocol is missing', () => {
  assert.equal(normalizeWebsiteUrl('example.com'), 'https://example.com');
  assert.equal(normalizeWebsiteUrl('https://example.com'), 'https://example.com');
});
