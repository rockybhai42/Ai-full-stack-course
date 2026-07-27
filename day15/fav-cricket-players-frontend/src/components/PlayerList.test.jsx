import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import PlayerList from './PlayerList'

const player = {
  _id: '64a7f0c2e1b1c2a1b2c3d4e5',
  playerName: 'Virat Kohli',
  runs: 12000,
  strikeRate: 93.5,
  internationalStatus: 'Active',
}

describe('PlayerList', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'fake-token')
  })

  afterEach(() => {
    vi.restoreAllMocks()
    localStorage.clear()
  })

  it('renders a player card for each player', () => {
    render(<PlayerList players={[player]} fetchPlayers={() => {}} />)
    expect(screen.getByText('Virat Kohli')).toBeInTheDocument()
    expect(screen.getByText(/Runs: 12000/)).toBeInTheDocument()
    expect(screen.getByText(/Strike Rate: 93.5/)).toBeInTheDocument()
    expect(screen.getByText(/International Status: Active/)).toBeInTheDocument()
  })

  it('deletes a player when the Delete button is clicked', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) })
    const fetchPlayers = vi.fn()
    render(<PlayerList players={[player]} fetchPlayers={fetchPlayers} />)

    fireEvent.click(screen.getByRole('button', { name: /delete/i }))

    await waitFor(() => expect(fetchPlayers).toHaveBeenCalledTimes(1))
    expect(global.fetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/api/players/${player._id}`,
      expect.objectContaining({ method: 'DELETE' })
    )
  })

  it('opens the edit modal pre-filled with the player data', () => {
    render(<PlayerList players={[player]} fetchPlayers={() => {}} />)
    fireEvent.click(screen.getByRole('button', { name: /edit/i }))

    expect(screen.getByDisplayValue('Virat Kohli')).toBeInTheDocument()
    expect(screen.getByDisplayValue('12000')).toBeInTheDocument()
  })

  it('closes the modal when Cancel is clicked', () => {
    render(<PlayerList players={[player]} fetchPlayers={() => {}} />)
    fireEvent.click(screen.getByRole('button', { name: /edit/i }))
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }))

    expect(screen.queryByDisplayValue('Virat Kohli')).not.toBeInTheDocument()
  })

  it('updates a player when the modal Update button is clicked', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true, player }) })
    const fetchPlayers = vi.fn()
    render(<PlayerList players={[player]} fetchPlayers={fetchPlayers} />)

    fireEvent.click(screen.getByRole('button', { name: /edit/i }))
    fireEvent.change(screen.getByDisplayValue('Virat Kohli'), { target: { value: 'MS Dhoni' } })
    fireEvent.click(screen.getByRole('button', { name: /update/i }))

    await waitFor(() => expect(fetchPlayers).toHaveBeenCalledTimes(1))
    expect(global.fetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/api/players/${player._id}`,
      expect.objectContaining({ method: 'PUT' })
    )
  })
})
