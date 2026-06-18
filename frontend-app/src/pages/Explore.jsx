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
    bookings.find((item) => item.status === "PENDING") || bookings[0];

  const historyJourney =
    bookings.find((item) => item.status === "CONFIRMED") || bookings[1];

  const getJourneyImage = (journey) => {
    return (
      journey?.itinerary?.items?.[0]?.destination?.imageUrl ||
      destinations[0]?.imageUrl ||
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1"
    );
  };

  const getJourneyTitle = (journey) => {
    return journey?.itinerary?.title || "Autumn in Kyoto";
  };

  const getJourneyDate = (journey) => {
    return journey?.bookingDate || "Nov 15 - Nov 20, 2025";
  };

  const JourneyCard = ({ journey, label }) => {
    if (!journey && destinations.length === 0) {
      return null;
    }

    return (
      <div
        onClick={() => navigate("/booking")}
        style={{
          background: "white",
          borderRadius: "24px",
          padding: "14px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          cursor: "pointer",
        }}
      >
        <div style={{ position: "relative" }}>
          <img
            src={getJourneyImage(journey)}
            alt="journey"
            style={{
              width: "100%",
              aspectRatio: "16 / 9",
              height: "auto",
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "18px",
            }}
          />

          <span
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background:
                label === "ACTIVE JOURNEY" ? "#4F7F5F" : "#9A7B55",
              color: "white",
              fontSize: "11px",
              fontWeight: "bold",
              padding: "7px 12px",
              borderRadius: "18px",
            }}
          >
            {label}
          </span>
        </div>

        <h2
          style={{
            margin: "16px 0 6px 0",
            color: "#2E2E2E",
            fontSize: "22px",
          }}
        >
          {getJourneyTitle(journey)}
        </h2>

        <p
          style={{
            margin: "0 0 10px 0",
            color: "#777",
            fontSize: "14px",
          }}
        >
          🗓️ {getJourneyDate(journey)}
        </p>

        <p
          style={{
            margin: "0 0 16px 0",
            color: "#555",
            fontSize: "14px",
            lineHeight: "1.5",
          }}
        >
          Exploring beautiful destinations and creating your travel memories.
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
            padding: "12px 22px",
            borderRadius: "22px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          View Itinerary →
        </button>
      </div>
    );
  };

  return (
    <div className="page-container">
      <AppHeader />

      <div style={{ marginBottom: "24px" }}>
        <h1
          style={{
            color: "#2E2E2E",
            fontSize: "32px",
            margin: "0 0 6px 0",
          }}
        >
          Welcome back, Puput
        </h1>

        <p
          style={{
            color: "#777",
            margin: 0,
            fontSize: "16px",
          }}
        >
          Ready for your next adventure?
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
          marginBottom: "34px",
        }}
      >
        <JourneyCard journey={activeJourney} label="ACTIVE JOURNEY" />
        <JourneyCard journey={historyJourney} label="HISTORY JOURNEY" />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "18px",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#2E2E2E",
            fontSize: "26px",
          }}
        >
          Recommended for You
        </h2>

        <button
          onClick={() => navigate("/explore/all")}
          style={{
            border: "none",
            background: "transparent",
            color: "#4F7F5F",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Explore all →
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          paddingBottom: "100px",
        }}
      >
        {destinations.slice(0, 4).map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/destination/${item.id}`)}
            style={{
              background: "white",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              cursor: "pointer",
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "16px" }}>
              <h3
                style={{
                  margin: "0 0 8px 0",
                  color: "#2E2E2E",
                  fontSize: "18px",
                }}
              >
                {item.name}
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#777",
                  fontSize: "14px",
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