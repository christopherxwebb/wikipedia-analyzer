export interface AnalysisResult {
    companyName: string;
    summary: string;
    bankruptcy: {
      detected: boolean;
      confidenceScore: number;
      context: string;
      definitiveStatement: boolean;
    };
    fraud: {
      detected: boolean;
      confidenceScore: number;
      context: string;
      isKnownFraudulent: boolean;
      definitiveStatement: boolean;
    };
  }