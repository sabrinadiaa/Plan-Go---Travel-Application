import BottomNav from "../components/BottomNav";


function Wallet() {
  return (
    <div
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        minHeight: "100vh",
        background: "#F6F3EE",
        padding: "20px",
        paddingBottom: "100px",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ color: "#4F7F5F", marginBottom: "4px" }}>
        Plan & Go
      </h2>

      <h1 style={{ color: "#2E2E2E", marginTop: 0 }}>
        Wallet
      </h1>

      <div
        style={{
          background: "white",
          borderRadius: "24px",
          padding: "24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <p style={{ color: "#777", margin: 0 }}>Current Balance</p>

        <h1 style={{ color: "#4F7F5F" }}>
          Rp 5.000.000
        </h1>
      </div>

      <BottomNav />
    </div>
  );
}

export default Wallet;