import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/auth/login/", {
        username,
        password,
      });
      const token = response.data.access;
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem('access_token', token)
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <button type="submit">Sign In</button>
    </form>
  );
}

export default SignIn;