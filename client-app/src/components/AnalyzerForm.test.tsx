import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent, screen } from '../test-utils'
import AnalyzerForm from './AnalyzerForm'

describe('AnalyzerForm', () => {
  it('renders input and button', () => {
    render(<AnalyzerForm onSubmit={() => {}} isLoading={false} />)
    expect(screen.getByPlaceholderText('Enter Wikipedia URL')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Analyze' })).toBeInTheDocument()
  })

  it('calls onSubmit with input value when form is submitted', () => {
    const mockOnSubmit = vi.fn()
    render(<AnalyzerForm onSubmit={mockOnSubmit} isLoading={false} />)
    
    const input = screen.getByPlaceholderText('Enter Wikipedia URL')
    fireEvent.change(input, { target: { value: 'https://en.wikipedia.org/wiki/Test' } })
    
    const button = screen.getByRole('button', { name: 'Analyze' })
    fireEvent.click(button)

    expect(mockOnSubmit).toHaveBeenCalledWith('https://en.wikipedia.org/wiki/Test')
  })

  it('disables button when isLoading is true', () => {
    render(<AnalyzerForm onSubmit={() => {}} isLoading={true} />)
    expect(screen.getByRole('button', { name: 'Analyze' })).toBeDisabled()
  })
})