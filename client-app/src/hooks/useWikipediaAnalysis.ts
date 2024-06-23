import { useState } from 'react';
import axios from 'axios';
import { AnalysisResult } from '../types';

export const useWikipediaAnalysis = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeUrl = async (url: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post<AnalysisResult>('http://localhost:9000/api/analyze', { url });
      setResult(response.data);
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  return { result, loading, error, analyzeUrl };
};