// pages/[id].test.js
import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import Details from './page'

// // Mock the useRouter hook to provide a mock value for the router.query
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('DynamicPage component', () => {
  it('renders dynamic page with received ID', () => {
    // Mock the router.query to simulate receiving an ID
    useRouter.mockImplementation(() => ({
      query: { slug: '123' },
    }))

    render(<Details />)

    // Check if the component renders the dynamic content correctly
    expect(screen.getByText('Dynamic Page')).toBeInTheDocument()
    expect(screen.getByText('Received ID: 123')).toBeInTheDocument()
  })

  // Add more test cases as needed
})
