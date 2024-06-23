import React from 'react';
import AnalyzerForm from '../components/AnalyzerForm';
import AnalysisResult from '../components/AnalysisResult';
import { useWikipediaAnalysis } from '../hooks/useWikipediaAnalysis';
const HomePage: React.FC = () => {
  const { result, loading, error, analyzeUrl } = useWikipediaAnalysis();

  return (
    <div>
      <AnalyzerForm onSubmit={analyzeUrl} isLoading={loading} />
      {error && <p className="error">{error}</p>}
      {result && <AnalysisResult result={result} />}
    </div>
  );
};

export default HomePage;