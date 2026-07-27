import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import Dashboard from './Dashboard'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useNavigate: () => mockNavigate }
})

describe('Dashboard', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    localStorage.clear()
    mockNavigate.mockClear()
  })

  it('redirects to /login when there is no token', () => {
    render(<Dashboard />, { wrapper: MemoryRouter })
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  it('fetches and displays players when a token exists', async () => {
    localStorage.setItem('token', 'fake-token')
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        players: [{ _id: '1', playerName: 'Virat Kohli', runs: 12000, strikeRate: 93.5, internationalStatus: 'Active' }],
      }),
    })

    render(<Dashboard />, { wrapper: MemoryRouter })

    await waitFor(() => expect(screen.getByText('Virat Kohli')).toBeInTheDocument())
  })

  it('clears the token and navigates to / on logout', () => {
    localStorage.setItem('token', 'fake-token')
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ players: [] }) })
    render(<Dashboard />, { wrapper: MemoryRouter })

    fireEvent.click(screen.getByRole('button', { name: /logout/i }))

    expect(localStorage.getItem('token')).toBeNull()
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })
})
