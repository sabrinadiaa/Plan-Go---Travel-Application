import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItineraryById } from "../services/itineraryService";
import { createBooking } from "../services/bookingService";
import BottomNav from "../components/BottomNav";

function Plan() {
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState(null);

  const handleCreateBooking = () => {
    const userId = 1;
    const itineraryId = 2;

    createBooking(userId, itineraryId)
      .then(() => {
        alert("Booking berhasil dibuat");
        navigate("/booking");
      })
      .catch((error) => {
        console.error(error);
        alert("Gagal membuat booking");
      });
  };

  useEffect(() => {
    const itineraryId = 2; // sementara pakai itinerary ID 2

    getItineraryById(itineraryId)
      .then((response) => {
        setItinerary(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!itinerary) {
    return (
      <div
        style={{
          maxWidth: "430px",
          margin: "0 auto",
          minHeight: "100vh",
          background: "#F6F3EE",
          padding: "20px",
        }}
      >
        <p>Loading itinerary...</p>
      </div>
    );
  }

  return (
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
        My Itinerary
      </h1>

      <div
        style={{
          background: "white",
          padding: "16px",
          borderRadius: "20px",
          marginBottom: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ margin: "0 0 8px 0", color: "#2E2E2E" }}>
          {itinerary.title}
        </h2>

        <p style={{ margin: 0, color: "#777" }}>
          Total People: {itinerary.totalPeople}
        </p>
      </div>

      <h3 style={{ color: "#2E2E2E" }}>Destinations</h3>

      {itinerary.items && itinerary.items.length > 0 ? (
        itinerary.items.map((item) => (
          <div
            key={item.id}
            style={{
              background: "white",
              borderRadius: "18px",
              overflow: "hidden",
              marginBottom: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <img
              src={item.destination.imageUrl}
              alt={item.destination.name}
              style={{
                width: "100%",
                height: "170px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "14px" }}>
              <h3
                style={{
                  margin: "0 0 6px 0",
                  color: "#2E2E2E",
                }}
              >
                {item.destination.name}
              </h3>

              <p
                style={{
                  margin: "0 0 8px 0",
                  color: "#777",
                }}
              >
                {item.destination.location}
              </p>

              <p
                style={{
                  margin: 0,
                  color: "#4F7F5F",
                  fontWeight: "bold",
                }}
              >
                Rp {item.destination.price}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>Belum ada destination di itinerary ini.</p>
      )}

      <button
        onClick={handleCreateBooking}
        style={{
          width: "100%",
          padding: "15px",
          border: "none",
          borderRadius: "24px",
          background: "#4F7F5F",
          color: "white",
          fontSize: "16px",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        Continue to Booking
      </button>

      <div
        style={{
          position: "sticky",
          bottom: 0,
          background: "white",
          display: "flex",
          justifyContent: "space-around",
          padding: "15px",
          borderRadius: "24px",
          marginTop: "24px",
          boxShadow: "0 -4px 12px rgba(0,0,0,0.08)",
        }}
      >
      </div>
      <BottomNav />
    </div>
  );
}

export default Plan;