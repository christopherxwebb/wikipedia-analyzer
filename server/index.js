const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const natural = require('natural');
const tokenizer = new natural.SentenceTokenizer();

const app = express();

const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

const knownFraudulentCompanies = ['enron', 'worldcom', 'tyco', 'waste management', 'healthsouth'];
const fraudKeyPhrases = ['accounting fraud', 'corporate fraud', 'found guilty', 'convicted of', 'pleaded guilty', 'scandal'];
const bankruptcyKeyPhrases = [
  'filed for bankruptcy', 
  'declared bankruptcy', 
  'chapter 11',
  'went bankrupt',
  'bankruptcy filing',
  'filed for chapter 11',
  'declared chapter 11'
];

function analyzeContext(sentences, keywords, companyName) {
  let score = 0;
  let relevantSentences = [];
  let definitiveStatement = false;

  sentences.forEach(sentence => {
    const lowercaseSentence = sentence.toLowerCase();
    if (lowercaseSentence.includes(companyName.toLowerCase())) {
      keywords.forEach(keyword => {
        if (lowercaseSentence.includes(keyword)) {
          // Check for definitive statements
          if (lowercaseSentence.includes(companyName.toLowerCase() + ' ' + keyword) ||
              lowercaseSentence.includes(keyword + ' ' + companyName.toLowerCase())) {
            score += 5;
            definitiveStatement = true;
          } else {
            score += 1;
          }
          relevantSentences.push(sentence);
        }
      });
    }
  });

  return {
    isRelevant: score > 0,
    score: Math.min(score, 10), // Cap the score at 10
    context: relevantSentences.join(' ') || 'No relevant context found.',
    definitiveStatement
  };
}

function generateSummary(sentences, maxLength = 5) {
  return sentences.slice(0, maxLength).join(' ');
}

app.post('/api/analyze', async (req, res) => {
  try {
    const { url } = req.body;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    const pageText = $('p').text(); // Focus on paragraph text for better summary
    const sentences = tokenizer.tokenize(pageText);
    
    const title = $('h1#firstHeading').text().trim();
    const companyName = title.split('(')[0].trim();

    const isKnownFraudulent = knownFraudulentCompanies.some(company => 
      companyName.toLowerCase().includes(company)
    );

    const bankruptcyAnalysis = analyzeContext(sentences, bankruptcyKeyPhrases, companyName);
    const fraudAnalysis = analyzeContext(sentences, fraudKeyPhrases, companyName);

    const summary = generateSummary(sentences);

    res.json({
      companyName,
      summary,
      bankruptcy: {
        detected: bankruptcyAnalysis.isRelevant,
        confidenceScore: bankruptcyAnalysis.score,
        context: bankruptcyAnalysis.context,
        definitiveStatement: bankruptcyAnalysis.definitiveStatement
      },
      fraud: {
        detected: fraudAnalysis.isRelevant || isKnownFraudulent,
        confidenceScore: Math.min(fraudAnalysis.score + (isKnownFraudulent ? 5 : 0), 10),
        context: fraudAnalysis.context,
        isKnownFraudulent,
        definitiveStatement: fraudAnalysis.definitiveStatement
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

