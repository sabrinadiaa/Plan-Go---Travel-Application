import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login, register } from "../services/authService";
import { saveLoggedInUser } from "../utils/auth";

function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("LOGIN");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const request =
      mode === "LOGIN"
        ? login(email, password)
        : register(username, email, password);

    request
      request
      .then((response) => {
        const data = response.data;

        console.log("DATA LOGIN:", data);

        if (!data || data.success === false || !data.id) {
          alert(data?.message || "Login gagal");
          return;
        }

        const role = String(data.role || "CUSTOMER").toUpperCase();

        saveLoggedInUser({
          id: data.id,
          username: data.username,
          email: data.email,
          saldo: data.saldo,
          token: data.token,
          role: role,
        });

        if (role === "ADMIN") {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate("/explore", { replace: true });
        }
      })
      .catch((error) => {
        console.error("LOGIN ERROR:", error);
        alert("Gagal login. Pastikan backend Spring Boot sudah berjalan.");
      })
      .catch((error) => {
        console.error("LOGIN ERROR:", error);
        alert("Gagal login. Pastikan backend Spring Boot sudah berjalan.");
      });
  };

  return (
    <div style={pageStyle}>
      <form onSubmit={handleSubmit} style={cardStyle}>
        <p style={brandStyle}>PLAN & GO</p>

        <h1 style={titleStyle}>
          {mode === "LOGIN" ? "Masuk ke Akun" : "Buat Akun Baru"}
        </h1>

        <p style={subtitleStyle}>
          {mode === "LOGIN"
            ? "Login untuk melanjutkan perjalananmu."
            : "Daftar sebagai customer baru."}
        </p>

        {mode === "REGISTER" && (
          <input
            required
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            style={inputStyle}
          />
        )}

        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          style={inputStyle}
        />

        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          {mode === "LOGIN" ? "Login" : "Register"}
        </button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "LOGIN" ? "REGISTER" : "LOGIN");
          }}
          style={switchButtonStyle}
        >
          {mode === "LOGIN"
            ? "Belum punya akun? Register"
            : "Sudah punya akun? Login"}
        </button>
      </form>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#F6F3EE",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  boxSizing: "border-box",
};

const cardStyle = {
  width: "100%",
  maxWidth: "430px",
  background: "white",
  borderRadius: "28px",
  padding: "30px",
  boxShadow: "0 14px 36px rgba(0,0,0,0.12)",
};

const brandStyle = {
  margin: "0 0 8px",
  color: "#4F7F5F",
  fontWeight: "900",
  letterSpacing: "1px",
};

const titleStyle = {
  margin: "0 0 8px",
  color: "#252525",
};

const subtitleStyle = {
  margin: "0 0 22px",
  color: "#777",
};

const inputStyle = {
  width: "100%",
  marginBottom: "14px",
  border: "1px solid #DDD",
  borderRadius: "16px",
  padding: "13px 14px",
  fontSize: "15px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  border: "none",
  borderRadius: "20px",
  background: "#4F7F5F",
  color: "white",
  padding: "14px",
  fontSize: "16px",
  fontWeight: "800",
  cursor: "pointer",
};

const switchButtonStyle = {
  width: "100%",
  border: "none",
  background: "transparent",
  color: "#4F7F5F",
  marginTop: "16px",
  fontWeight: "800",
  cursor: "pointer",
};

export default Login;