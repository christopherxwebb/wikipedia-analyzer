function analyzeText(text) {
    const lowercaseText = text.toLowerCase();
    return {
      hasBankruptcy: lowercaseText.includes('bankruptcy'),
      hasFraud: lowercaseText.includes('fraud'),
    };
  }
  
  module.exports = { analyzeText };