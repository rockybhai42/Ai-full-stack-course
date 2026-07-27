import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import PlayerForm from './PlayerForm'

describe('PlayerForm', () => {
  it('renders the form with input fields and submit button', () => {
    render(<PlayerForm fetchPlayers={() => {}} />)
    expect(screen.getByPlaceholderText('Player Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Runs')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Strike Rate')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Add Player/i })).toBeInTheDocument()
  })

  it('updates the player name input field when the user types', () => {
    render(<PlayerForm fetchPlayers={() => {}} />)
    const playerNameInput = screen.getByPlaceholderText('Player Name')
    fireEvent.change(playerNameInput, { target: { value: 'Virat Kohli' } })
    expect(playerNameInput.value).toBe('Virat Kohli')
  })
})

describe('PlayerForm submission', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'fake-token')
  })

  afterEach(() => {
    vi.restoreAllMocks()
    localStorage.clear()
  })

  const fillForm = () => {
    fireEvent.change(screen.getByPlaceholderText('Player Name'), { target: { value: 'Virat Kohli' } })
    fireEvent.change(screen.getByPlaceholderText('Runs'), { target: { value: '12000' } })
    fireEvent.change(screen.getByPlaceholderText('Strike Rate'), { target: { value: '93.5' } })
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Active' } })
  }

  it('calls fetch and resets the form on successful submission', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, player: {} }),
    })
    const fetchPlayers = vi.fn()
    render(<PlayerForm fetchPlayers={fetchPlayers} />)

    fillForm()
    fireEvent.click(screen.getByRole('button', { name: /add player/i }))

    await waitFor(() => expect(fetchPlayers).toHaveBeenCalledTimes(1))
    expect(global.fetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/api/players`,
      expect.objectContaining({ method: 'POST' })
    )
    expect(screen.getByPlaceholderText('Player Name').value).toBe('')
  })

  it('shows an alert and keeps form data when the server rejects', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ success: false, message: 'Validation failed' }),
    })
    window.alert = vi.fn()
    const fetchPlayers = vi.fn()
    render(<PlayerForm fetchPlayers={fetchPlayers} />)

    fillForm()
    fireEvent.click(screen.getByRole('button', { name: /add player/i }))

    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Validation failed'))
    expect(fetchPlayers).not.toHaveBeenCalled()
    expect(screen.getByPlaceholderText('Player Name').value).toBe('Virat Kohli')
  })

  it('shows an alert when the network request throws', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))
    window.alert = vi.fn()
    render(<PlayerForm fetchPlayers={() => {}} />)

    fillForm()
    fireEvent.click(screen.getByRole('button', { name: /add player/i }))

    await waitFor(() => expect(window.alert).toHaveBeenCalled())
  })
})
