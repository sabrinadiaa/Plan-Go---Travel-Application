import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPayment } from "../services/paymentService";

function Payment() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [method, setMethod] = useState("BANK_TRANSFER");

  const handlePayment = () => {
    createPayment(bookingId, method)
      .then(() => {
        alert("Payment berhasil");
        navigate("/payment-success");
      })
      .catch((error) => {
        console.error(error);
        alert("Payment gagal");
      });
  };

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
        Payment Method
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
        <p style={{ color: "#777", margin: 0 }}>Booking ID</p>
        <h2 style={{ marginTop: "8px" }}>#{bookingId}</h2>
      </div>

      <div
        style={{
          background: "white",
          padding: "16px",
          borderRadius: "20px",
          marginBottom: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h3 style={{ color: "#2E2E2E" }}>Choose Payment</h3>

        <label style={{ display: "block", marginBottom: "14px" }}>
          <input
            type="radio"
            value="BANK_TRANSFER"
            checked={method === "BANK_TRANSFER"}
            onChange={(e) => setMethod(e.target.value)}
          />
          {" "}Bank Transfer
        </label>

        <label style={{ display: "block", marginBottom: "14px" }}>
          <input
            type="radio"
            value="E_WALLET"
            checked={method === "E_WALLET"}
            onChange={(e) => setMethod(e.target.value)}
          />
          {" "}E-Wallet
        </label>

        <label style={{ display: "block", marginBottom: "14px" }}>
          <input
            type="radio"
            value="CREDIT_CARD"
            checked={method === "CREDIT_CARD"}
            onChange={(e) => setMethod(e.target.value)}
          />
          {" "}Credit Card
        </label>
      </div>

      <button
        onClick={handlePayment}
        style={{
          width: "100%",
          padding: "15px",
          border: "none",
          borderRadius: "24px",
          background: "#4F7F5F",
          color: "white",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Pay Now
      </button>
    </div>
  );
}

export default Payment;