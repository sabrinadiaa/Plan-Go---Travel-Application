import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookingById } from "../services/bookingService";
import { createPayment } from "../services/paymentService";

function Payment() {
  const navigate = useNavigate();
  const { bookingId } = useParams();

  const [booking, setBooking] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("E-Wallet");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBookingById(bookingId)
      .then((response) => {
        setBooking(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [bookingId]);

  const firstDestination = booking?.itinerary?.items?.[0]?.destination;

  const destinationName =
    firstDestination?.name || "The Evergreen Sanctuary";

  const destinationLocation =
    firstDestination?.location || "Kyoto, Japan";

  const totalPrice =
    booking?.totalPrice || 1600;

  const serviceFee = 120;
  const tax = 30;
  const stayPrice = totalPrice - serviceFee - tax;

  const formatRupiah = (value) => {
    return `Rp ${Number(value || 0).toLocaleString("id-ID")}`;
  };

  const handlePayment = () => {
    setLoading(true);

    createPayment(bookingId, selectedMethod)
      .then(() => {
        navigate("/profile");
      })
      .catch((error) => {
        console.error(error);
        alert("Payment gagal");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
    style={{
      width: "100%",
      minHeight: "100vh",
      background: "#F6F3EE",
      paddingBottom: "24px",
      boxSizing: "border-box",
    }}
  >
      {/* Header */}
      <div
        style={{
          width: "100%",
          background: "white",
          padding: "24px 64px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#4F7F5F",
            fontSize: "17px",
            fontWeight: "800",
          }}
        >
          Plan & Go
        </h2>

        <img
          src="/images/profile.jpg"
          alt="profile"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>

      <div
        style={{
          maxWidth: "430px",
          margin: "0 auto",
          padding: "28px 22px",
          boxSizing: "border-box",
        }}
      >
        {/* Title */}
        <h1
          style={{
            margin: "0 0 6px 0",
            color: "#111",
            fontSize: "28px",
            fontWeight: "800",
          }}
        >
          Secure Checkout
        </h1>

        <p
          style={{
            margin: "0 0 22px 0",
            color: "#666",
            fontSize: "13px",
            lineHeight: "1.5",
          }}
        >
          Review your travel details and complete payment.
        </p>

        {/* Trip Summary Card */}
        <div
          style={{
            background: "#F1F7F4",
            border: "1px solid #B7D5C5",
            borderRadius: "12px",
            padding: "18px",
            marginBottom: "22px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <h2
              style={{
                margin: "0 0 4px 0",
                color: "#2E2E2E",
                fontSize: "18px",
                fontWeight: "800",
              }}
            >
              {destinationName}
            </h2>

            <p
              style={{
                margin: 0,
                color: "#555",
                fontSize: "13px",
              }}
            >
              ⌖ {destinationLocation}
            </p>
          </div>

          <div
            style={{
              borderTop: "1px solid #D8DED8",
              borderBottom: "1px solid #D8DED8",
              padding: "14px 0",
              marginBottom: "14px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                style={{
                  margin: "0 0 6px 0",
                  color: "#777",
                  fontSize: "10px",
                  fontWeight: "700",
                }}
              >
                DATES
              </p>
              <p
                style={{
                  margin: 0,
                  color: "#333",
                  fontSize: "13px",
                }}
              >
                Oct 12 — Oct 18, 2023
              </p>
            </div>

            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  margin: "0 0 6px 0",
                  color: "#777",
                  fontSize: "10px",
                  fontWeight: "700",
                }}
              >
                GUESTS
              </p>
              <p
                style={{
                  margin: 0,
                  color: "#333",
                  fontSize: "13px",
                }}
              >
                {booking?.itinerary?.totalPeople || 2} Adults
              </p>
            </div>
          </div>

          <PriceRow label="6 Nights stay" value={formatRupiah(stayPrice)} />
          <PriceRow label="Service fee" value={formatRupiah(serviceFee)} />
          <PriceRow label="Nature preservation tax" value={formatRupiah(tax)} />

          <div
            style={{
              borderTop: "1px solid #D8DED8",
              marginTop: "14px",
              paddingTop: "14px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "#111",
                fontSize: "17px",
                fontWeight: "800",
              }}
            >
              Total price
            </span>

            <span
              style={{
                color: "#4F7F5F",
                fontSize: "22px",
                fontWeight: "800",
              }}
            >
              {formatRupiah(totalPrice)}
            </span>
          </div>
        </div>

        {/* Payment Method */}
        <h2
          style={{
            margin: "0 0 12px 0",
            color: "#111",
            fontSize: "18px",
            fontWeight: "800",
          }}
        >
          Select Payment Method
        </h2>

        <PaymentOption
          active={selectedMethod === "E-Wallet"}
          icon="▣"
          title="E-Wallet"
          subtitle="Balance: $4,230.50"
          onClick={() => setSelectedMethod("E-Wallet")}
        />

        <PaymentOption
          active={selectedMethod === "Bank Transfer"}
          icon="▦"
          title="Bank Transfer"
          subtitle="Direct deposit"
          onClick={() => setSelectedMethod("Bank Transfer")}
        />

        
        <button
          onClick={handlePayment}
          disabled={loading}
          style={{
            width: "100%",
            border: "none",
            borderRadius: "10px",
            background: "#4F7F5F",
            color: "white",
            padding: "17px",
            fontSize: "17px",
            fontWeight: "700",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading
            ? "Processing..."
            : `Confirm & Pay ${formatRupiah(totalPrice)}  →`}
        </button>
      </div>
    </div>
  );
}

function PriceRow({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "8px",
      }}
    >
      <span
        style={{
          color: "#666",
          fontSize: "13px",
        }}
      >
        {label}
      </span>

      <span
        style={{
          color: "#333",
          fontSize: "13px",
          fontWeight: "600",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function PaymentOption({ active, icon, title, subtitle, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: active ? "#F1F7F4" : "white",
        border: active ? "2px solid #4F7F5F" : "1px solid #D8D8D8",
        borderRadius: "12px",
        padding: "18px",
        marginBottom: "14px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: active
          ? "0 4px 12px rgba(79,127,95,0.12)"
          : "0 4px 10px rgba(0,0,0,0.04)",
      }}
    >
      <div>
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "8px",
            background: active ? "#B7E4C7" : "#E8E8E8",
            color: active ? "#4F7F5F" : "#777",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "18px",
            fontWeight: "800",
          }}
        >
          {icon}
        </div>

        <h3
          style={{
            margin: "0 0 4px 0",
            color: "#111",
            fontSize: "17px",
            fontWeight: "800",
          }}
        >
          {title}
        </h3>

        <p
          style={{
            margin: 0,
            color: "#777",
            fontSize: "11px",
          }}
        >
          {subtitle}
        </p>
      </div>

      {active && (
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "#4F7F5F",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          ✓
        </div>
      )}
    </div>
  );
}

export default Payment;