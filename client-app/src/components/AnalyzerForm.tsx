import React, { useState } from 'react';

interface AnalyzerFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const AnalyzerForm: React.FC<AnalyzerFormProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter Wikipedia URL"
        required
      />
      <button type="submit" disabled={isLoading}>
        Analyze
      </button>
    </form>
  );
};

export default AnalyzerForm;