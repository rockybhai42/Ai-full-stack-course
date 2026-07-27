import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import Signup from './Signup'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useNavigate: () => mockNavigate }
})

describe('Signup', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    mockNavigate.mockClear()
  })

  it('renders username, email, password inputs and a submit button', () => {
    render(<Signup />, { wrapper: MemoryRouter })
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
  })

  it('navigates to /login on successful signup', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: 'User created successfully' }),
    })
    window.alert = vi.fn()
    render(<Signup />, { wrapper: MemoryRouter })

    fireEvent.change(screen.getByPlaceholderText('Enter username'), { target: { value: 'rajesh' } })
    fireEvent.change(screen.getByPlaceholderText('Enter email'), { target: { value: 'rajesh@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: 'secret123' } })
    fireEvent.click(screen.getByRole('button', { name: /create account/i }))

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/login'))
  })

  it('shows an alert and does not navigate when signup fails', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ success: false, message: 'Email already registered' }),
    })
    window.alert = vi.fn()
    render(<Signup />, { wrapper: MemoryRouter })

    fireEvent.change(screen.getByPlaceholderText('Enter username'), { target: { value: 'rajesh' } })
    fireEvent.change(screen.getByPlaceholderText('Enter email'), { target: { value: 'rajesh@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: 'secret123' } })
    fireEvent.click(screen.getByRole('button', { name: /create account/i }))

    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Email already registered'))
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})
