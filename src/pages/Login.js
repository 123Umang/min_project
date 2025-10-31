import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // popping message
  const navigate = useNavigate();

  const handleLogin =
   (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      alert(`Welcome back, ${user.firstName} ${user.lastName}!`);
      localStorage.setItem("currentUser", JSON.stringify(user));

      // Auto logout after 5 minutes
      setTimeout(() => {
        localStorage.removeItem("currentUser");
        alert("Session expired! You have been logged out automatically.");
        navigate("/login");
      }, 5 * 60 * 1000); // 5 mins

      navigate("/dashboard");
    } else {
      // Show a temporary popping message for unverified users
      setErrorMessage("❌ Invalid credentials. Please try again or register first.");
      setTimeout(() => setErrorMessage(""), 3000); // disappear after 3 seconds
    }
  };

  return (
    <div className="auth-container">
      <h2>Credexa - Login</h2>

      {/* Popping message */}
      {errorMessage && (
        <div
          style={{
            backgroundColor: "#f87171",
            color: "white",
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "12px",
            textAlign: "center",
            animation: "fadeIn 0.5s",
          }}
        >
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p className="switch-auth">
        Don’t have an account?{" "}
        <Link to="/register" className="auth-link">
          Register
        </Link>
      </p>
    </div>
  );
}














