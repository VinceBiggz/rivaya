import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import SignUpPage from '../app/auth/signup/page'
import LoginPage from '../app/auth/login/page'

describe('Authentication', () => {
  describe('SignUp Page', () => {
    it('renders signup form', () => {
      render(<SignUpPage />)
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
    })

    it('has create account button', () => {
      render(<SignUpPage />)
      expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
    })

    it('has link to login page', () => {
      render(<SignUpPage />)
      expect(screen.getByText(/already have an account/i)).toBeInTheDocument()
      expect(screen.getByText(/sign in/i)).toBeInTheDocument()
    })
  })
  
  describe('Login Page', () => {
    it('renders login form', () => {
      render(<LoginPage />)
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
    })

    it('has sign in button', () => {
      render(<LoginPage />)
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    })

    it('has link to signup page', () => {
      render(<LoginPage />)
      expect(screen.getByText(/don't have an account/i)).toBeInTheDocument()
      expect(screen.getByText(/sign up/i)).toBeInTheDocument()
    })

    it('has remember me checkbox', () => {
      render(<LoginPage />)
      expect(screen.getByText(/remember me/i)).toBeInTheDocument()
    })

    it('has forgot password link', () => {
      render(<LoginPage />)
      expect(screen.getByText(/forgot password/i)).toBeInTheDocument()
    })
  })
})
