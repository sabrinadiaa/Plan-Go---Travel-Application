import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

function Wallet() {
  const navigate = useNavigate();

  // dummy data dulu untuk demo UI
  const paymentData = {
    amount: "Rp200.000",
    bookingId: "PG-98442-TRP",
    method: "Visa •••• 4242",
    destination: "Cascadia Highlands Retreat",
    email: "alex.morgan@traveler.com",
    image: "/images/trip1.jpg", // ganti sesuai gambar kamu
  };

  const handleDownloadReceipt = () => {
    alert("Receipt downloaded (demo)");
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div
        style={{
          width: "100%",
          background: "white",
          padding: "18px 22px",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#4F7F5F",
            fontWeight: "800",
            fontSize: "18px",
          }}
        >
          Plan & Go
        </h2>

        <img
          src="/images/profile.jpg" // ganti sesuai foto profile kamu
          alt="profile"
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "20px 14px 110px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "430px",
            background: "#F6F3EE",
            borderRadius: "28px",
            padding: "18px",
            boxSizing: "border-box",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          {/* success icon */}
          <div
            style={{
              width: "92px",
              height: "92px",
              margin: "0 auto 18px auto",
              borderRadius: "50%",
              background: "#4F7F5F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
            }}
          >
            <span style={{ fontSize: "42px", color: "white" }}>✓</span>
          </div>

          {/* title */}
          <h1
            style={{
              margin: "0 0 10px 0",
              textAlign: "center",
              color: "#2E2E2E",
              fontSize: "24px",
              lineHeight: "1.2",
              fontWeight: "800",
            }}
          >
            Payment
            <br />
            Successful
          </h1>

          <p
            style={{
              margin: "0 auto 22px auto",
              textAlign: "center",
              color: "#777",
              fontSize: "14px",
              lineHeight: "1.6",
              maxWidth: "280px",
            }}
          >
            Your adventure is officially booked.
            <br />
            We've sent a confirmation email to
            <br />
            <span style={{ color: "#4F7F5F", fontWeight: "600" }}>
              {paymentData.email}
            </span>
          </p>

          {/* total amount */}
          <div
            style={{
              background: "#EAE4D9",
              borderRadius: "18px",
              padding: "16px",
              textAlign: "center",
              marginBottom: "18px",
            }}
          >
            <p
              style={{
                margin: "0 0 6px 0",
                fontSize: "11px",
                color: "#8B8477",
                fontWeight: "700",
                letterSpacing: "1px",
              }}
            >
              TOTAL AMOUNT
            </p>

            <h2
              style={{
                margin: 0,
                color: "#7C5C2B",
                fontSize: "34px",
                fontWeight: "800",
              }}
            >
              {paymentData.amount}
            </h2>
          </div>

          {/* booking detail row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                background: "#EFECE7",
                borderRadius: "16px",
                padding: "14px",
              }}
            >
              <p
                style={{
                  margin: "0 0 6px 0",
                  fontSize: "11px",
                  color: "#777",
                  fontWeight: "700",
                }}
              >
                BOOKING ID
              </p>
              <p
                style={{
                  margin: 0,
                  color: "#2E2E2E",
                  fontWeight: "700",
                  fontSize: "13px",
                }}
              >
                {paymentData.bookingId}
              </p>
            </div>

            <div
              style={{
                background: "#EFECE7",
                borderRadius: "16px",
                padding: "14px",
              }}
            >
              <p
                style={{
                  margin: "0 0 6px 0",
                  fontSize: "11px",
                  color: "#777",
                  fontWeight: "700",
                }}
              >
                METHOD
              </p>
              <p
                style={{
                  margin: 0,
                  color: "#2E2E2E",
                  fontWeight: "700",
                  fontSize: "13px",
                }}
              >
                {paymentData.method}
              </p>
            </div>
          </div>

          {/* trip destination */}
          <div
            style={{
              background: "#EFECE7",
              borderRadius: "16px",
              padding: "12px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "22px",
            }}
          >
            <img
              src={paymentData.image}
              alt={paymentData.destination}
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "12px",
                objectFit: "cover",
              }}
            />

            <div>
              <p
                style={{
                  margin: "0 0 4px 0",
                  fontSize: "11px",
                  color: "#777",
                  fontWeight: "700",
                }}
              >
                TRIP DESTINATION
              </p>
              <p
                style={{
                  margin: 0,
                  color: "#2E2E2E",
                  fontWeight: "700",
                  fontSize: "14px",
                }}
              >
                {paymentData.destination}
              </p>
            </div>
          </div>

          {/* button */}
          <button
            onClick={() => navigate("/plan/detail")}
            style={{
              width: "100%",
              border: "none",
              borderRadius: "16px",
              background: "#4F7F5F",
              color: "white",
              padding: "15px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              marginBottom: "14px",
            }}
          >
            🧾 View Itinerary
          </button>

          <button
            onClick={handleDownloadReceipt}
            style={{
              width: "100%",
              border: "none",
              background: "transparent",
              color: "#4F7F5F",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Download Receipt
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default Wallet;