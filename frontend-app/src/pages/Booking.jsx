import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserBookings } from "../services/bookingService";
import BottomNav from "../components/BottomNav";
import AppHeader from "../components/AppHeader";

function Booking() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("ACTIVE");

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

  const getFirstDestination = (booking) => {
    return booking.itinerary?.items?.[0]?.destination;
  };

  const getBookingImage = (booking) => {
    return getFirstDestination(booking)?.imageUrl || "/images/default-trip.jpg";
  };

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "ACTIVE") {
      return booking.status !== "CANCELLED";
    }

    if (activeTab === "UPCOMING") {
      return booking.status === "PENDING";
    }

    if (activeTab === "COMPLETED") {
      return booking.status === "CONFIRMED";
    }

    return true;
  });

  const tabStyle = (tab) => ({
    border: "none",
    padding: "8px 16px",
    borderRadius: "20px",
    background: activeTab === tab ? "#4F7F5F" : "#E8E3DA",
    color: activeTab === tab ? "white" : "#555",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
  });

  const getStatusStyle = (status) => {
    if (status === "CONFIRMED") {
      return {
        background: "#D8F3DC",
        color: "#2E7D32",
        label: "Confirmed",
      };
    }

    if (status === "PENDING") {
      return {
        background: "#FFE8D6",
        color: "#C06C00",
        label: "Pending",
      };
    }

    return {
      background: "#E8E3DA",
      color: "#777",
      label: status,
    };
  };

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("id-ID");
  };

  const formatDate = (date) => {
    if (!date) return "Oct 12";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
  };

  return (
    <div className="page-container">
      <AppHeader />

      {/* Title */}
      <div
        style={{
          marginTop: "24px",
          marginBottom: "24px",
          maxWidth: "720px",
        }}
      >
        <h1
          style={{
            margin: "0 0 8px 0",
            color: "#2E2E2E",
            fontSize: "34px",
            fontWeight: "800",
          }}
        >
          Your Bookings
        </h1>

        <p
          style={{
            margin: 0,
            color: "#777",
            fontSize: "15px",
            lineHeight: "1.5",
          }}
        >
          Manage your upcoming adventures and view past memories. Your journey,
          organized and grounded.
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "24px",
          overflowX: "auto",
        }}
      >
        <button
          style={tabStyle("ACTIVE")}
          onClick={() => setActiveTab("ACTIVE")}
        >
          Active
        </button>

        <button
          style={tabStyle("UPCOMING")}
          onClick={() => setActiveTab("UPCOMING")}
        >
          Upcoming
        </button>

        <button
          style={tabStyle("COMPLETED")}
          onClick={() => setActiveTab("COMPLETED")}
        >
          Completed
        </button>
      </div>

      {/* Booking List */}
      {filteredBookings.length === 0 ? (
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "24px",
            textAlign: "center",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            marginBottom: "120px",
          }}
        >
          <h2 style={{ color: "#2E2E2E", marginTop: 0 }}>
            Belum ada booking
          </h2>

          <p style={{ color: "#777", fontSize: "13px" }}>
            Silakan buat booking dari halaman Plan.
          </p>

          <button
            onClick={() => navigate("/plan/detail")}
            style={{
              border: "none",
              background: "#4F7F5F",
              color: "white",
              padding: "12px 22px",
              borderRadius: "20px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Go to Plan
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          {filteredBookings.map((booking) => {
            const destination = getFirstDestination(booking);
            const status = getStatusStyle(booking.status);

            return (
              <div
                key={booking.id}
                style={{
                  background: "white",
                  borderRadius: "24px",
                  padding: "12px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              >
                {/* Image */}
                <div style={{ position: "relative" }}>
                  <img
                    src={getBookingImage(booking)}
                    alt={booking.itinerary?.title}
                    style={{
                      width: "100%",
                      aspectRatio: "16 / 9",
                      height: "auto",
                      objectFit: "cover",
                      borderRadius: "18px",
                    }}
                  />

                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: status.background,
                      color: status.color,
                      padding: "6px 12px",
                      borderRadius: "16px",
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}
                  >
                    {status.label}
                  </span>
                </div>

                {/* Main Info */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                    marginTop: "14px",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h2
                      style={{
                        margin: "0 0 6px 0",
                        color: "#2E2E2E",
                        fontSize: "17px",
                        fontWeight: "800",
                      }}
                    >
                      {booking.itinerary?.title || "Trip Booking"}
                    </h2>

                    <p
                      style={{
                        margin: "0 0 4px 0",
                        color: "#777",
                        fontSize: "12px",
                      }}
                    >
                      {destination?.name || "Destination"}
                    </p>

                    <p
                      style={{
                        margin: 0,
                        color: "#777",
                        fontSize: "12px",
                      }}
                    >
                      📍 {destination?.location || "Indonesia"}
                    </p>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <p
                      style={{
                        margin: "0 0 4px 0",
                        color: "#777",
                        fontSize: "11px",
                      }}
                    >
                      {formatDate(booking.bookingDate)}
                    </p>

                    <p
                      style={{
                        margin: "0 0 4px 0",
                        color: "#4F7F5F",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      Code {booking.bookingCode}
                    </p>

                    <p
                      style={{
                        margin: 0,
                        color: "#2E2E2E",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      Rp {formatPrice(booking.totalPrice)}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                {booking.status === "CONFIRMED" && (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "16px",
                    }}
                  >
                    <button
                      onClick={() => navigate("/plan/detail")}
                      style={{
                        flex: 1,
                        border: "none",
                        background: "#4F7F5F",
                        color: "white",
                        padding: "12px",
                        borderRadius: "18px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      View Details
                    </button>

                    {destination && (
                      <button
                        onClick={() => navigate(`/review/${destination.id}`)}
                        style={{
                          flex: 1,
                          border: "1px solid #4F7F5F",
                          background: "white",
                          color: "#4F7F5F",
                          padding: "12px",
                          borderRadius: "18px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        Review
                      </button>
                    )}
                  </div>
                )}

                {booking.status === "PENDING" && (
                  <button
                    onClick={() => navigate(`/payment/${booking.id}`)}
                    style={{
                      width: "100%",
                      border: "none",
                      background: "#E8E3DA",
                      color: "#6A5B45",
                      padding: "12px",
                      borderRadius: "18px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      marginTop: "16px",
                      cursor: "pointer",
                    }}
                  >
                    Check Status / Pay Now
                  </button>
                )}

                {/* Trip Detail */}
                <div
                  style={{
                    background: "#F6F3EE",
                    borderRadius: "18px",
                    padding: "14px",
                    marginTop: "14px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "12px",
                    }}
                  >
                    <span
                      style={{
                        color: "#6A5B45",
                        fontSize: "11px",
                        fontWeight: "bold",
                      }}
                    >
                      🧳 TRIP DETAIL
                    </span>

                    <span
                      style={{
                        color: "#777",
                        fontSize: "11px",
                      }}
                    >
                      {booking.itinerary?.totalPeople || 1} Traveler
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          margin: "0 0 4px 0",
                          color: "#2E2E2E",
                          fontWeight: "bold",
                          fontSize: "13px",
                        }}
                      >
                        Start
                      </p>

                      <p
                        style={{
                          margin: 0,
                          color: "#777",
                          fontSize: "12px",
                        }}
                      >
                        Indonesia
                      </p>
                    </div>

                    <div
                      style={{
                        flex: 1,
                        height: "1px",
                        background: "#C8BFAF",
                        margin: "0 12px",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "-9px",
                          transform: "translateX(-50%)",
                          background: "#F6F3EE",
                          fontSize: "14px",
                        }}
                      >
                        ✈
                      </span>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <p
                        style={{
                          margin: "0 0 4px 0",
                          color: "#2E2E2E",
                          fontWeight: "bold",
                          fontSize: "13px",
                        }}
                      >
                        Destination
                      </p>

                      <p
                        style={{
                          margin: 0,
                          color: "#777",
                          fontSize: "12px",
                        }}
                      >
                        {destination?.location || "Indonesia"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reservation Button */}
                {booking.status === "CONFIRMED" && (
                  <button
                    onClick={() => navigate("/plan/detail")}
                    style={{
                      width: "100%",
                      border: "1px solid #4F7F5F",
                      background: "white",
                      color: "#4F7F5F",
                      padding: "12px",
                      borderRadius: "18px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      marginTop: "14px",
                      cursor: "pointer",
                    }}
                  >
                    Manage Reservation
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Help Card */}
      <div
        style={{
          background: "#A8D5BA",
          borderRadius: "24px",
          padding: "22px",
          textAlign: "center",
          marginTop: "10px",
          marginBottom: "120px",
          color: "white",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            margin: "0 0 8px 0",
            fontSize: "19px",
          }}
        >
          Need help with your booking?
        </h2>

        <p
          style={{
            margin: "0 0 18px 0",
            fontSize: "13px",
            lineHeight: "1.5",
          }}
        >
          Our concierge team is available 24/7 to assist with your travel plans.
        </p>

        <button
          style={{
            border: "none",
            background: "white",
            color: "#4F7F5F",
            padding: "12px 22px",
            borderRadius: "20px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Chat with Support
        </button>
      </div>

      <BottomNav />
    </div>
  );
}

export default Booking;