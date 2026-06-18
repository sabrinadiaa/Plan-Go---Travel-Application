import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItineraryById } from "../services/itineraryService";
import { createBooking } from "../services/bookingService";
import BottomNav from "../components/BottomNav";
import AppHeader from "../components/AppHeader";

function PlanDetail() {
  const navigate = useNavigate();

  const [itinerary, setItinerary] = useState(null);

  useEffect(() => {
    const itineraryId = 2;

    getItineraryById(itineraryId)
      .then((response) => {
        setItinerary(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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

  if (!itinerary) {
    return (
      <div className="page-container">
        <AppHeader />
        <p>Loading itinerary...</p>
      </div>
    );
  }

  const items = itinerary.items || [];

  return (
    <div className="page-container">
      <AppHeader />

      <div style={{ marginBottom: "22px" }}>
        <p
          style={{
            color: "#4F7F5F",
            fontWeight: "bold",
            fontSize: "12px",
            letterSpacing: "1px",
            margin: 0,
          }}
        >
          CURRENT TRIP
        </p>

        <h1
          style={{
            margin: "6px 0 4px 0",
            color: "#2E2E2E",
            fontSize: "34px",
            lineHeight: "1.1",
          }}
        >
          {itinerary.title || "Autumn in Kyoto"}
        </h1>

        <p style={{ margin: 0, color: "#777" }}>
          Oct 12 - Oct 18, 2024 • {itinerary.totalPeople || 2} Travelers
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        <button
          style={{
            flex: 1,
            border: "1px solid #4F7F5F",
            background: "white",
            color: "#4F7F5F",
            padding: "12px",
            borderRadius: "18px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ⬇ Export PDF
        </button>

        <button
          onClick={() => navigate("/explore/all")}
          style={{
            flex: 1,
            border: "none",
            background: "#4F7F5F",
            color: "white",
            padding: "12px",
            borderRadius: "18px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          🗺 View Destination
        </button>
      </div>

      {items.length === 0 ? (
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "24px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            marginBottom: "120px",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Belum ada destinasi</h2>
          <p style={{ color: "#777" }}>
            Tambahkan destinasi dulu dari halaman Explore All.
          </p>

          <button
            onClick={() => navigate("/explore/all")}
            style={{
              border: "none",
              background: "#4F7F5F",
              color: "white",
              padding: "12px 20px",
              borderRadius: "20px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Add Destination →
          </button>
        </div>
      ) : (
        <div style={{ marginBottom: "120px" }}>
          {items.map((item, index) => {
            const destination = item.destination;

            const times = ["09:30", "14:00", "19:30", "08:00", "12:30"];
            const icons = ["✈️", "🏨", "🍽️", "⛩️", "☕"];
            const status = index === 0 ? "CONFIRMED" : index === 2 ? "PENDING" : "UPCOMING";

            return (
              <div
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "58px 1fr",
                  gap: "14px",
                  marginBottom: "22px",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "#D8F3DC",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 8px auto",
                      fontSize: "18px",
                    }}
                  >
                    {icons[index % icons.length]}
                  </div>

                  <p
                    style={{
                      margin: 0,
                      color: "#555",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    {times[index % times.length]}
                  </p>

                  <div
                    style={{
                      width: "2px",
                      height: "100%",
                      background: "#D8D1C5",
                      position: "absolute",
                      top: "48px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      zIndex: 0,
                    }}
                  />
                </div>

                <div
                  style={{
                    background: "white",
                    borderRadius: "24px",
                    padding: "16px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "14px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={destination?.imageUrl}
                      alt={destination?.name}
                      style={{
                        width: "90px",
                        height: "90px",
                        borderRadius: "18px",
                        objectFit: "cover",
                      }}
                    />

                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "8px",
                          alignItems: "flex-start",
                        }}
                      >
                        <h3
                          style={{
                            margin: "0 0 6px 0",
                            color: "#2E2E2E",
                            fontSize: "18px",
                          }}
                        >
                          {destination?.name}
                        </h3>

                        <span
                          style={{
                            background:
                              status === "CONFIRMED"
                                ? "#D8F3DC"
                                : status === "PENDING"
                                ? "#FFE2E2"
                                : "#EEE",
                            color:
                              status === "CONFIRMED"
                                ? "#2E7D32"
                                : status === "PENDING"
                                ? "#D94A4A"
                                : "#777",
                            padding: "5px 8px",
                            borderRadius: "12px",
                            fontSize: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          {status}
                        </span>
                      </div>

                      <p
                        style={{
                          margin: "0 0 6px 0",
                          color: "#777",
                          fontSize: "13px",
                        }}
                      >
                        {destination?.location}
                      </p>

                      <p
                        style={{
                          margin: 0,
                          color: "#4F7F5F",
                          fontWeight: "bold",
                          fontSize: "13px",
                        }}
                      >
                        Rp {Number(destination?.price || 0).toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

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
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Continue to Booking
          </button>
        </div>
      )}

      <button
        onClick={() => navigate("/explore/all")}
        style={{
          position: "fixed",
          right: "24px",
          bottom: "92px",
          width: "58px",
          height: "58px",
          borderRadius: "50%",
          border: "none",
          background: "#4F7F5F",
          color: "white",
          fontSize: "30px",
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
          zIndex: 999,
        }}
      >
        +
      </button>

      <BottomNav />
    </div>
  );
}

export default PlanDetail;