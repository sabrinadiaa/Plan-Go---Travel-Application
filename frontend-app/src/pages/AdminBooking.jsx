import AdminBottomNav from "../components/AdminBottomNav";

function AdminBooking() {
  return (
    <div style={pageStyle}>
      <h1>Manage Bookings</h1>
      <p>Lihat dan kelola semua booking customer.</p>

      <div style={cardStyle}>
        <h3>Booking Data</h3>
        <p>Data booking customer nanti ditampilkan di sini.</p>
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

export default AdminBooking;