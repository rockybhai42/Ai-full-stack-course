import { useState } from "react";
import "../styles/PlayerList.css";

function PlayerList({ players, fetchPlayers }) {
  const [editingPlayer, setEditingPlayer] = useState(null);

  const deletePlayer = async (playerId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5000/api/players/${playerId}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (response.ok) {
        fetchPlayers();
      } else {
        window.alert(data.message);
      }
    } catch (error) {
      window.alert("Error occurred while deleting player:", error);
    }
  };

  const updatePlayer = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/api/players/${editingPlayer._id}`,

      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(editingPlayer),
      },
    );

    const data = await response.json();

    if (response.ok) {
      alert(data.message);

      setEditingPlayer(null);

      fetchPlayers();
    }
  };

  return (
    <div>
      <h2>Your Favorite Players</h2>

      {players.map((player) => (
        <div key={player._id} className="card">
          <h3>{player.playerName}</h3>

          <p>Runs: {player.runs}</p>

          <p>Strike Rate: {player.strikeRate}</p>

          <p>International Status: {player.internationalStatus}</p>

          <button onClick={() => deletePlayer(player._id)}>Delete</button>
          <button onClick={() => setEditingPlayer(player)}>Edit</button>
        </div>
      ))}

      {editingPlayer && (
        <div>
          <input
            value={editingPlayer.playerName}
            onChange={(e) =>
              setEditingPlayer({
                ...editingPlayer,

                playerName: e.target.value,
              })
            }
          />

          <input
            value={editingPlayer.runs}
            onChange={(e) =>
              setEditingPlayer({
                ...editingPlayer,

                runs: e.target.value,
              })
            }
          />
          <select
            value={editingPlayer.internationalStatus}
            onChange={(e) =>
              setEditingPlayer({
                ...editingPlayer,
                internationalStatus: e.target.value,
              })
            }
          >
            <option value="Active">Active</option>
            <option value="Retired">Retired</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button onClick={updatePlayer}>Update</button>
        </div>
      )}
    </div>
  );
}

export default PlayerList;
