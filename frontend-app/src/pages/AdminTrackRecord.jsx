import AdminBottomNav from "../components/AdminBottomNav";

function AdminTrackRecord() {
  return (
    <div style={pageStyle}>
      <h1>Track Record</h1>
      <p>Riwayat aktivitas admin, booking, dan pembayaran.</p>

      <div style={cardStyle}>
        <h3>Activity Record</h3>
        <p>Track record nanti ditampilkan di sini.</p>
      </div>

      <AdminBottomNav />
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#F6F7F5",
  padding: "32px 32px 120px",
  boxSizing: "border-box",
};

const cardStyle = {
  background: "white",
  borderRadius: "22px",
  padding: "24px",
  boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
};

export default AdminTrackRecord;