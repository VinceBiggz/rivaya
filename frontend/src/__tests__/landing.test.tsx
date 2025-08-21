import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomePage from '../app/page'

describe('Landing Page', () => {
  it('renders hero section', () => {
    render(<HomePage />)
    expect(screen.getByText(/rivaya/i)).toBeInTheDocument()
  })
  
  it('has get started button', () => {
    render(<HomePage />)
    expect(screen.getByRole('button', { name: /get started free/i })).toBeInTheDocument()
  })

  it('has watch demo button', () => {
    render(<HomePage />)
    expect(screen.getByRole('button', { name: /watch demo/i })).toBeInTheDocument()
  })

  it('displays features section', () => {
    render(<HomePage />)
    expect(screen.getByText(/powerful features for modern groups/i)).toBeInTheDocument()
  })

  it('shows stats section', () => {
    render(<HomePage />)
    expect(screen.getByText(/10K\+/i)).toBeInTheDocument()
    expect(screen.getByText(/50K\+/i)).toBeInTheDocument()
  })
})
