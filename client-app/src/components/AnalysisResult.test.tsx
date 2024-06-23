import { describe, it, expect } from 'vitest'
import { render, screen } from '../test-utils'
import AnalysisResult from './AnalysisResult'

const mockResult = {
  companyName: 'Test Company',
  summary: 'This is a test summary.',
  bankruptcy: {
    detected: true,
    confidenceScore: 8,
    context: 'Test bankruptcy context',
    definitiveStatement: true
  },
  fraud: {
    detected: false,
    confidenceScore: 2,
    context: 'Test fraud context',
    isKnownFraudulent: false,
    definitiveStatement: false
  }
}

describe('AnalysisResult', () => {
  it('renders result correctly', () => {
    render(<AnalysisResult result={mockResult} />)
    
    expect(screen.getByText('Results for Test Company:')).toBeInTheDocument()
    expect(screen.getByText('This is a test summary.')).toBeInTheDocument()
    expect(screen.getByText('Detected: Yes')).toBeInTheDocument()
    expect(screen.getByText('Confidence Score: 8 / 10')).toBeInTheDocument()
    expect(screen.getByText('Definitive statement found about bankruptcy.')).toBeInTheDocument()
    expect(screen.getByText('Context: Test bankruptcy context')).toBeInTheDocument()
    expect(screen.getByText('Detected: No')).toBeInTheDocument()
    expect(screen.getByText('Confidence Score: 2 / 10')).toBeInTheDocument()
    expect(screen.getByText('Context: Test fraud context')).toBeInTheDocument()
  })
})