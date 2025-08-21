import React from 'react'
import { render } from '@testing-library/react-native'
import App from '../App'

describe('Mobile App', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<App />)
    expect(getByText('RIVAYA')).toBeTruthy()
  })

  it('displays welcome message', () => {
    const { getByText } = render(<App />)
    expect(getByText('Welcome to RIVAYA Mobile!')).toBeTruthy()
  })

  it('has functional buttons', () => {
    const { getByText } = render(<App />)
    expect(getByText('Get Started')).toBeTruthy()
    expect(getByText('Learn More')).toBeTruthy()
  })
})
