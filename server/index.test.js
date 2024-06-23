const { analyzeText } = require('./utils');

describe('analyzeText', () => {
  it('should detect bankruptcy and fraud in text', () => {
    const text = 'The company filed for bankruptcy after a fraud scandal.';
    const result = analyzeText(text);
    expect(result.hasBankruptcy).toBe(true);
    expect(result.hasFraud).toBe(true);
  });

  it('should not detect bankruptcy or fraud in unrelated text', () => {
    const text = 'The company had a successful year.';
    const result = analyzeText(text);
    expect(result.hasBankruptcy).toBe(false);
    expect(result.hasFraud).toBe(false);
  });
});