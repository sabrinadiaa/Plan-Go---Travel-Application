import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        minHeight: "100vh",
        background: "#F6F3EE",
        padding: "20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "24px",
          padding: "30px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "#4F7F5F",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "40px",
            margin: "0 auto 20px",
          }}
        >
          ✓
        </div>

        <h1 style={{ color: "#2E2E2E" }}>Payment Success</h1>

        <p style={{ color: "#777", lineHeight: "1.6" }}>
          Your payment has been completed successfully.
        </p>

        <button
          onClick={() => navigate("/booking")}
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
          Back to Booking
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;