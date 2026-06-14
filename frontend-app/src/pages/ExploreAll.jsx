import { useEffect, useState } from "react";
import { getDestinations } from "../services/destinationService";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

function Explore() {
  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDestinations()
      .then((response) => {
        setDestinations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const activeButtonStyle = {
    border: "none",
    background: "#4F7F5F",
    color: "white",
    padding: "10px 18px",
    borderRadius: "20px",
  };

  const normalButtonStyle = {
    border: "none",
    background: "#E8E3DA",
    color: "#444",
    padding: "10px 18px",
    borderRadius: "20px",
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
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h2
            style={{
              color: "#4F7F5F",
              margin: 0,
            }}
          >
            Plan & Go
          </h2>

          <h1
            style={{
              color: "#2E2E2E",
              margin: "8px 0 0 0",
              fontSize: "28px",
            }}
          >
            Explore
          </h1>
        </div>

        <img
          src="https://placehold.co/50"
          alt="profile"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search destinations..."
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "24px",
          border: "none",
          outline: "none",
          background: "#D8D1C5",
          marginBottom: "20px",
          boxSizing: "border-box",
        }}
      />

      {/* Category */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          overflowX: "auto",
        }}
      >
        <button style={activeButtonStyle}>All</button>
        <button style={normalButtonStyle}>Nature</button>
        <button style={normalButtonStyle}>Shopping</button>
        <button style={normalButtonStyle}>Cafe</button>
      </div>

      {/* Destination Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
          paddingBottom: "80px",
        }}
      >
        {destinations.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/destination/${item.id}`)}
            style={{
              background: "white",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              cursor: "pointer",
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{
                width: "100%",
                height: "130px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "10px" }}>
              <h3
                style={{
                  fontSize: "14px",
                  margin: "0 0 6px 0",
                  color: "#2E2E2E",
                }}
              >
                {item.name}
              </h3>

              <p
                style={{
                  fontSize: "12px",
                  margin: "0 0 6px 0",
                  color: "#777",
                }}
              >
                {item.location}
              </p>

              <p
                style={{
                  fontSize: "13px",
                  margin: 0,
                  color: "#4F7F5F",
                  fontWeight: "bold",
                }}
              >
                Rp {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default Explore;