import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserBookings } from "../services/bookingService";
import BottomNav from "../components/BottomNav";

function Booking() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const userId = 1;

    getUserBookings(userId)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p style={{ color: "#777" }}>Belum ada booking.</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking.id}
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "16px",
              marginBottom: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  color: "#2E2E2E",
                }}
              >
                {booking.itinerary?.title}
              </h3>

              <span
                style={{
                  background:
                    booking.status === "CONFIRMED"
                      ? "#D9F2E3"
                      : booking.status === "CANCELLED"
                      ? "#F8D7DA"
                      : "#FFF3CD",
                  color:
                    booking.status === "CONFIRMED"
                      ? "#2E7D32"
                      : booking.status === "CANCELLED"
                      ? "#B00020"
                      : "#856404",
                  padding: "6px 10px",
                  borderRadius: "14px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {booking.status}
              </span>
            </div>

            <p style={{ margin: "6px 0", color: "#777" }}>
              Booking Code: {booking.bookingCode}
            </p>

            <p style={{ margin: "6px 0", color: "#777" }}>
              Total People: {booking.itinerary?.totalPeople}
            </p>

            <p
              style={{
                margin: "10px 0 0 0",
                color: "#4F7F5F",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              Rp {booking.totalPrice}
            </p>
            {booking.status === "PENDING" && (
              <button
                onClick={() => navigate(`/payment/${booking.id}`)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  borderRadius: "20px",
                  background: "#4F7F5F",
                  color: "white",
                  marginTop: "14px",
                  cursor: "pointer",
                }}
              >
                Pay Now
              </button>
            )}

            <h4 style={{ marginBottom: "8px", color: "#2E2E2E" }}>
              Destinations
            </h4>

            {booking.itinerary?.items?.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "10px",
                  alignItems: "center",
                }}
              >
                <img
                  src={item.destination.imageUrl}
                  alt={item.destination.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "12px",
                    objectFit: "cover",
                  }}
                />

                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      margin: 0,
                      color: "#2E2E2E",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    {item.destination.name}
                  </p>

                  <p
                    style={{
                      margin: "4px 0 0 0",
                      color: "#777",
                      fontSize: "12px",
                    }}
                  >
                    {item.destination.location}
                  </p>
                </div>
                    <button
            onClick={() => navigate(`/review/${item.destination.id}`)}
            style={{
              border: "none",
              background: "#4F7F5F",
              color: "white",
              padding: "8px 12px",
              borderRadius: "14px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          ></button>
              </div>
            ))}
          </div>
        ))
      )}

        <span onClick={() => navigate("/explore")}>Explore</span>
        <span onClick={() => navigate("/plan")}>Plan</span>
        <span style={{ color: "#4F7F5F", fontWeight: "bold" }}>
          Bookings
        </span>
        <span>Wallet</span>
        <span onClick={() => navigate("/profile")}>Profile</span>
      </div>
      <BottomNav />
      </div>
  );
}

export default Booking;