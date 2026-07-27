import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

describe('App routing', () => {
  it('redirects from / to the login page', () => {
    render(<App />, { wrapper: MemoryRouter })
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
  })
})
