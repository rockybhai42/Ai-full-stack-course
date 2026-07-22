import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import "./../styles/Signup.css";

function Signup() {

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
 const navigate = useNavigate();

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await fetch("http://localhost:5000/api/auth/signup",{

        method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({ username, email, password }),
    })
    const data = await response.json();
    if (response.ok) {
      // Signup successful
      window.alert(data.message);
      navigate("/login");
    } else {
      // Signup failed
      window.alert( data.message);
    }
  } catch (error) {
    window.alert("Error occurred while signing up:", error);
  }
}

  return (
    <div className="signup-container">

      <div className="signup-card">

        <h1>Create Account</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit">
            Create Account
          </button>

        </form>

        <p>Already have an account?</p>

      </div>

    </div>
  );
}

export default Signup;