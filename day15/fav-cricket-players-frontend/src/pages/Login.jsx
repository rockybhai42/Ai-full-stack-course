import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/Login.css";





function Login() {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const navigate = useNavigate();
 const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Login successful
        localStorage.setItem("token", data.token);
        window.alert(data.message);
        navigate("/dashboard");
        
      } else {
        // Login failed
        window.alert(data.message);
      }
    } catch (error) {
      window.alert("Error occurred while logging in:", error);
    }
  };

  return  (

        <div className="signup-container">

            <div className="signup-card">

                <h1>Login</h1>

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <button type="submit">

                        Login

                    </button>

                </form>

                <p>

                    Don't have an account?

                    <Link to="/signup">

                        Signup

                    </Link>

                </p>

            </div>

        </div>

    );
 
}

export default Login;