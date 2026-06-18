import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import AppHeader from "../components/AppHeader";

function Plan() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <AppHeader />

      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(232,227,218,0.95), rgba(255,255,255,0.8))",
          borderRadius: "24px",
          padding: "22px",
          marginBottom: "22px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        <span
          style={{
            background: "#F3E7B8",
            color: "#8A6A00",
            padding: "6px 12px",
            borderRadius: "16px",
            fontSize: "11px",
            fontWeight: "bold",
          }}
        >
          NEW ITINERARY
        </span>

        <h1
          style={{
            margin: "12px 0 8px 0",
            fontSize: "34px",
            color: "#2E2E2E",
            lineHeight: "1.1",
          }}
        >
          Summer in <br /> Tuscany
        </h1>

        <p style={{ color: "#777", margin: "0 0 6px 0" }}>
          🗓 August 12 — August 24, 2024
        </p>

        <p
          onClick={() => navigate("/plan/detail")}
          style={{
            color: "#4F7F5F",
            margin: 0,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ✎ Edit Details
        </p>
      </div>
          <button
  onClick={() => navigate("/plan/detail")}
  style={{
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "24px",
    background: "#4F7F5F",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "22px",
    cursor: "pointer",
  }}
>
  View Current Itinerary →
</button>
      <div
        onClick={() => navigate("/explore/all")}
        style={{
          background: "white",
          borderRadius: "24px",
          padding: "28px",
          marginBottom: "22px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: "58px",
            height: "58px",
            borderRadius: "16px",
            background: "#D8F3DC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "26px",
            marginBottom: "28px",
          }}
        >
          🗺️
        </div>

        <h2 style={{ margin: "0 0 12px 0", color: "#2E2E2E" }}>
          Add Destination
        </h2>

        <p
          style={{
            color: "#666",
            lineHeight: "1.6",
            marginBottom: "24px",
          }}
        >
          Choose the cities, national parks, or hidden gems you want to explore
          on this journey.
        </p>

        <p style={{ color: "#4F7F5F", fontWeight: "bold", margin: 0 }}>
          Start exploring →
        </p>
      </div>

      <div
        onClick={() => navigate("/explore/all?category=HOTEL")}
        style={{
          background: "white",
          borderRadius: "24px",
          padding: "28px",
          marginBottom: "22px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: "58px",
            height: "58px",
            borderRadius: "16px",
            background: "#FFF3CD",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "26px",
            marginBottom: "28px",
          }}
        >
          🛏️
        </div>

        <h2 style={{ margin: "0 0 12px 0", color: "#2E2E2E" }}>
          Add Hotel
        </h2>

        <p
          style={{
            color: "#666",
            lineHeight: "1.6",
            marginBottom: "24px",
          }}
        >
          Find the perfect stay. From boutique eco-lodges to historic villas
          nestled in the hills.
        </p>

        <p style={{ color: "#8A6A00", fontWeight: "bold", margin: 0 }}>
          Search accommodation →
        </p>
      </div>

      <div
        onClick={() => navigate("/explore/all?category=CLUB")}
        style={{
          background: "white",
          borderRadius: "24px",
          padding: "28px",
          marginBottom: "120px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: "58px",
            height: "58px",
            borderRadius: "16px",
            background: "#F6F3EE",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "26px",
            marginBottom: "28px",
          }}
        >
          🎵
        </div>

        <h2 style={{ margin: "0 0 12px 0", color: "#2E2E2E" }}>
          Add Club
        </h2>

        <p
          style={{
            color: "#666",
            lineHeight: "1.6",
            marginBottom: "24px",
          }}
        >
          Find nightlife spots, beach clubs, and entertainment places for your
          trip.
        </p>

        <p style={{ color: "#8A6A00", fontWeight: "bold", margin: 0 }}>
          Search entertainment →
        </p>
      </div>

      <BottomNav />
    </div>
  );
}

export default Plan;