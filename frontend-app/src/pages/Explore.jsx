import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDestinations } from "../services/destinationService";
import { getUserBookings } from "../services/bookingService";
import BottomNav from "../components/BottomNav";
import AppHeader from "../components/AppHeader";

function Explore() {
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getDestinations()
      .then((response) => {
        setDestinations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    getUserBookings(1)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const activeJourney =
    bookings.find((booking) => booking.status === "PENDING") || bookings[0];

  const historyJourney =
    bookings.find((booking) => booking.status === "CONFIRMED") || bookings[1];

  const getJourneyImage = (booking) => {
    return (
      booking?.itinerary?.items?.[0]?.destination?.imageUrl ||
      destinations[0]?.imageUrl ||
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e"
    );
  };

  const getJourneyTitle = (booking) => {
    return booking?.itinerary?.title || "Autumn in Kyoto";
  };

  const JourneyCard = ({ booking, label }) => (
    <div
      onClick={() => navigate("/booking")}
      style={{
        background: "white",
        borderRadius: "24px",
        padding: "14px",
        marginBottom: "18px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        cursor: "pointer",
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={getJourneyImage(booking)}
          alt="journey"
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "18px",
          }}
        />

        <span
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: label === "ACTIVE JOURNEY" ? "#4F7F5F" : "#9A7B55",
            color: "white",
            fontSize: "10px",
            fontWeight: "bold",
            padding: "6px 10px",
            borderRadius: "14px",
          }}
        >
          {label}
        </span>
      </div>

      <h2
        style={{
          margin: "14px 0 4px 0",
          color: "#2E2E2E",
          fontSize: "20px",
        }}
      >
        {getJourneyTitle(booking)}
      </h2>

      <p
        style={{
          margin: "0 0 8px 0",
          color: "#777",
          fontSize: "12px",
        }}
      >
        📅 {booking?.bookingDate || "Nov 15 - Nov 20, 2025"}
      </p>

      <p
        style={{
          margin: "0 0 14px 0",
          color: "#777",
          fontSize: "13px",
          lineHeight: "1.5",
        }}
      >
        Exploring the hidden temples of Arashiyama and the traditional tea
        houses.
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate("/booking");
        }}
        style={{
          border: "none",
          background: "#4F7F5F",
          color: "white",
          padding: "10px 18px",
          borderRadius: "18px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        View Itinerary →
      </button>
    </div>
  );

  return (
    <div className="page-container">
      <AppHeader />
      {/* Welcome */}
      <div style={{ marginBottom: "18px" }}>
        <h1
          style={{
            color: "#2E2E2E",
            fontSize: "26px",
            margin: "0 0 4px 0",
          }}
        >
          Welcome back, Puput
        </h1>

        <p
          style={{
            color: "#777",
            margin: 0,
            fontSize: "14px",
          }}
        >
          Ready for your next adventure?
        </p>
      </div>

      {/* Active Journey */}
      <JourneyCard booking={activeJourney} label="ACTIVE JOURNEY" />

      {/* History Journey */}
      <JourneyCard booking={historyJourney} label="HISTORY JOURNEY" />

      {/* Recommended */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "8px",
          marginBottom: "12px",
        }}
      >
        <h3
          style={{
            margin: 0,
            color: "#2E2E2E",
          }}
        >
          Recommended for You
        </h3>

        <button
          onClick={() => navigate("/explore/all")}
          style={{
            border: "none",
            background: "transparent",
            color: "#4F7F5F",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Explore all →
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "14px",
          paddingBottom: "20px",
        }}
      >
        {destinations.slice(0, 2).map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/destination/${item.id}`)}
            style={{
              background: "white",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              cursor: "pointer",
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{
                width: "100%",
                height: "135px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "10px" }}>
              <h4
                style={{
                  margin: "0 0 4px 0",
                  fontSize: "13px",
                  color: "#2E2E2E",
                }}
              >
                {item.name}
              </h4>

              <p
                style={{
                  margin: 0,
                  fontSize: "11px",
                  color: "#777",
                }}
              >
                📍 {item.location}
              </p>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}

export default Explore;