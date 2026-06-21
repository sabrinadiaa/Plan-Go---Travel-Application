import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserBookings } from "../services/bookingService";
import { getLoggedInUser } from "../utils/auth";
import BottomNav from "../components/BottomNav";
import AppHeader from "../components/AppHeader";

const TABS = [
  { key: "ACTIVE", label: "Active" },
  { key: "UPCOMING", label: "Upcoming" },
  { key: "COMPLETED", label: "Completed" },
];

function Booking() {
  const navigate = useNavigate();
  const user = getLoggedInUser();

  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("ACTIVE");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      navigate("/login", { replace: true });
      return;
    }

    getUserBookings(user.id)
      .then((response) => {
        setBookings(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error(error);
        setBookings([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate, user?.id]);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => getBookingCategory(booking) === activeTab);
  }, [bookings, activeTab]);

  const countByTab = useMemo(() => {
    return bookings.reduce(
      (result, booking) => {
        const category = getBookingCategory(booking);
        result[category] = (result[category] || 0) + 1;
        return result;
      },
      { ACTIVE: 0, UPCOMING: 0, COMPLETED: 0 }
    );
  }, [bookings]);

  return (
    <div className="page-container">
      <AppHeader />

      <h1>Your Bookings</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              border: "none",
              padding: "9px 16px",
              borderRadius: "20px",
              background: activeTab === tab.key ? "#4F7F5F" : "#E8E3DA",
              color: activeTab === tab.key ? "white" : "#555",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            {tab.label} ({countByTab[tab.key] || 0})
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading booking...</p>
      ) : filteredBookings.length === 0 ? (
        <p>Belum ada booking di kategori ini.</p>
      ) : (
        <div style={{ display: "grid", gap: "18px", marginBottom: "120px" }}>
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              navigate={navigate}
            />
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  );
}

function BookingCard({ booking, navigate }) {
  const category = getBookingCategory(booking);

  const title =
    booking.snapshotTitle ||
    booking.itinerary?.title ||
    "Trip Booking";

  const destinations =
    booking.snapshotDestinations ||
    booking.itinerary?.items?.map((item) => item.destination?.name).join(", ") ||
    "Destination";

  const location =
    booking.snapshotLocation ||
    booking.itinerary?.items?.[0]?.destination?.location ||
    "Indonesia";

  const image =
    booking.snapshotImageUrl ||
    booking.itinerary?.items?.[0]?.destination?.imageUrl ||
    "https://placehold.co/800x450?text=Plan+%26+Go";

  return (
    <div
      style={{
        background: "white",
        borderRadius: "24px",
        padding: "14px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      <img
        src={image}
        alt={title}
        onError={(event) => {
          event.currentTarget.src = "https://placehold.co/800x450?text=Plan+%26+Go";
        }}
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
          objectFit: "cover",
          borderRadius: "18px",
        }}
      />

      <h2 style={{ marginBottom: "6px" }}>{title}</h2>

      <p style={{ color: "#777" }}>{destinations}</p>
      <p style={{ color: "#777" }}>📍 {location}</p>

      <p>
        <b>Status:</b> {category}
      </p>

      <p>
        <b>Total:</b> Rp {formatPrice(booking.totalPrice)}
      </p>

      <p>
        <b>Tanggal Trip:</b> {formatDate(booking.tripStart)}
      </p>

      {!isPaid(booking.status) ? (
        <button
          onClick={() => navigate(`/payment/${booking.id}`)}
          style={buttonStyle}
        >
          Pay Now
        </button>
      ) : (
        <button
          onClick={() => navigate(`/plan/${booking.itinerary?.id}`)}
          style={buttonStyle}
        >
          View Details
        </button>
      )}
    </div>
  );
}

function getBookingCategory(booking) {
  const status = booking.status;
  const tripStart = toDate(booking.tripStart);
  const tripEnd = toDate(booking.tripEnd || booking.tripStart);

  if (isPaid(status) && isTodayOrBetween(tripStart, tripEnd)) {
    return "ACTIVE";
  }

  if (isPaid(status) && isPastDay(tripEnd)) {
    return "COMPLETED";
  }

  if (!isPaid(status)) {
    return "UPCOMING";
  }

  return "UPCOMING";
}

function isPaid(status) {
  return ["CONFIRMED", "PAID", "SUCCESS", "COMPLETED"].includes(
    String(status || "").toUpperCase()
  );
}

function isTodayOrBetween(start, end) {
  if (!start) return false;

  const today = startOfDay(new Date());
  const startDay = startOfDay(start);
  const endDay = startOfDay(end || start);

  return startDay <= today && today <= endDay;
}

function isPastDay(date) {
  if (!date) return false;
  return startOfDay(date) < startOfDay(new Date());
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function toDate(value) {
  if (!value) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatPrice(price) {
  return Number(price || 0).toLocaleString("id-ID");
}

function formatDate(value) {
  const date = toDate(value);

  if (!date) return "-";

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const buttonStyle = {
  width: "100%",
  border: "none",
  borderRadius: "18px",
  background: "#4F7F5F",
  color: "white",
  padding: "12px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default Booking;