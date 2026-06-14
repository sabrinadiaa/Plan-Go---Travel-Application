import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

function Profile() {
  const navigate = useNavigate();

  const user = {
    username: "nadia",
    email: "nadia@gmail.com",
    saldo: 5000000,
  };

  return (
    <div className="page-container">
    <div
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        minHeight: "100vh",
        background: "#F6F3EE",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ color: "#4F7F5F", marginBottom: "4px" }}>
        Plan & Go
      </h2>

      <h1 style={{ color: "#2E2E2E", marginTop: 0 }}>
        Profile
      </h1>

      <div
        style={{
          background: "white",
          borderRadius: "24px",
          padding: "24px",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          marginBottom: "20px",
        }}
      >
        <img
          src="https://placehold.co/100"
          alt="profile"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            marginBottom: "16px",
          }}
        />

        <h2 style={{ margin: "0 0 6px 0", color: "#2E2E2E" }}>
          {user.username}
        </h2>

        <p style={{ margin: 0, color: "#777" }}>
          {user.email}
        </p>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "16px",
          marginBottom: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <p style={{ color: "#777", margin: 0 }}>Saldo</p>
        <h2 style={{ color: "#4F7F5F", marginBottom: 0 }}>
          Rp {user.saldo}
        </h2>
      </div>

      <button
        onClick={() => navigate("/booking")}
        style={{
          width: "100%",
          padding: "14px",
          border: "none",
          borderRadius: "24px",
          background: "#4F7F5F",
          color: "white",
          fontSize: "16px",
          marginBottom: "12px",
          cursor: "pointer",
        }}
      >
        My Bookings
      </button>

      <button
        onClick={() => navigate("/explore")}
        style={{
          width: "100%",
          padding: "14px",
          border: "none",
          borderRadius: "24px",
          background: "#E8E3DA",
          color: "#444",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Back to Explore
      </button>

      <BottomNav />
      </div>
    </div>
  );
}

export default Profile;