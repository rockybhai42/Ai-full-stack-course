import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import Login from './Login'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useNavigate: () => mockNavigate }
})

describe('Login', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    localStorage.clear()
    mockNavigate.mockClear()
  })

  it('renders email, password inputs and a login button', () => {
    render(<Login />, { wrapper: MemoryRouter })
    expect(screen.getByPlaceholderText('Enter Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('stores the token and navigates to /dashboard on successful login', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: 'Login successful', token: 'fake-token' }),
    })
    window.alert = vi.fn()
    render(<Login />, { wrapper: MemoryRouter })

    fireEvent.change(screen.getByPlaceholderText('Enter Email'), { target: { value: 'rajesh@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('Enter Password'), { target: { value: 'secret123' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/dashboard'))
    expect(localStorage.getItem('token')).toBe('fake-token')
  })

  it('shows an alert and does not navigate on failed login', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ success: false, message: 'Invalid email or password' }),
    })
    window.alert = vi.fn()
    render(<Login />, { wrapper: MemoryRouter })

    fireEvent.change(screen.getByPlaceholderText('Enter Email'), { target: { value: 'rajesh@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('Enter Password'), { target: { value: 'wrongpass' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Invalid email or password'))
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})
