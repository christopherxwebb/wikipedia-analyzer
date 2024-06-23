import React from 'react';
import { AnalysisResult as AnalysisResultType } from '../types';

interface AnalysisResultProps {
  result: AnalysisResultType;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  return (
    <div className="result">
      <h2>Results for {result.companyName}:</h2>
      <h3>Summary:</h3>
      <p>{result.summary}</p>
      <h3>Bankruptcy:</h3>
      <p>Detected: {result.bankruptcy.detected ? 'Yes' : 'No'}</p>
      <p>Confidence Score: {result.bankruptcy.confidenceScore} / 10</p>
      {result.bankruptcy.definitiveStatement && (
        <p><strong>Definitive statement found about bankruptcy.</strong></p>
      )}
      {result.bankruptcy.context && <p>Context: {result.bankruptcy.context}</p>}
      <h3>Fraud:</h3>
      <p>Detected: {result.fraud.detected ? 'Yes' : 'No'}</p>
      <p>Confidence Score: {result.fraud.confidenceScore} / 10</p>
      {result.fraud.isKnownFraudulent && (
        <p><strong>This company is known for fraudulent activities.</strong></p>
      )}
      {result.fraud.definitiveStatement && (
        <p><strong>Definitive statement found about fraud.</strong></p>
      )}
      {result.fraud.context && <p>Context: {result.fraud.context}</p>}
    </div>
  );
};

export default AnalysisResult;