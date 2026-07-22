import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlayerForm from "../components/PlayerForm";
import { useState } from "react";
import PlayerList from "../components/PlayerList";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);

  const fetchPlayers = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/players", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setPlayers(data.players);
      } else {
        window.alert(data.message);
      }
    } catch (error) {
      window.alert("Error occurred while fetching players:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchPlayers();
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="container">
      <button onClick={handleLogout}   className="logout-btn">Logout</button>
      <h1>Welcome to the Dashboard</h1>
      <PlayerForm fetchPlayers={fetchPlayers} />
      <PlayerList players={players} fetchPlayers={fetchPlayers} />
    </div>
  );
}

export default Dashboard;
