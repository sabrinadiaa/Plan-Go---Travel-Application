import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomNav from "../components/BottomNav";

import { getLoggedInUser, logout } from "../utils/auth";
import { getUserPayments } from "../services/paymentService";

const EMERGENCY_NUMBERS = [
  {
    name: "Darurat Umum",
    number: "112",
    description: "Panggilan darurat umum untuk berbagai keadaan darurat.",
    icon: "🚨",
  },
  {
    name: "Polisi",
    number: "110",
    description: "Hubungi saat terjadi tindak kriminal atau butuh bantuan kepolisian.",
    icon: "👮",
  },
  {
    name: "Ambulans",
    number: "119",
    description: "Hubungi untuk bantuan medis darurat atau ambulans.",
    icon: "🚑",
  },
  {
    name: "Ambulans Alternatif",
    number: "118",
    description: "Nomor ambulans lain yang juga dapat digunakan.",
    icon: "🏥",
  },
  {
    name: "Pemadam Kebakaran",
    number: "113",
    description: "Hubungi saat terjadi kebakaran atau keadaan darurat kebakaran.",
    icon: "🚒",
  },
  {
    name: "SAR / Basarnas",
    number: "115",
    description: "Hubungi untuk bantuan pencarian dan penyelamatan.",
    icon: "🛟",
  },
  {
    name: "PLN",
    number: "123",
    description: "Hubungi saat terjadi gangguan listrik atau kondisi darurat listrik.",
    icon: "⚡",
  },
];

function Profile() {
  const navigate = useNavigate();
  const user = getLoggedInUser();

  const [payments, setPayments] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      navigate("/login", { replace: true });
      return;
    }

    getUserPayments(user.id)
      .then((response) => {
        setPayments(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Gagal mengambil payment history:", error);
        setPayments([]);
      })
      .finally(() => {
        setLoadingPayments(false);
      });
  }, [navigate, user?.id]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (!user?.id) {
    return null;
  }

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <div style={topHeaderStyle}>
          <div>
            <p style={smallLabelStyle}>PLAN & GO</p>
            <h1 style={pageTitleStyle}>Informasi Akun</h1>
          </div>

          <button onClick={handleLogout} style={logoutButtonStyle}>
            Logout
          </button>
        </div>

        <section style={profileCardStyle}>
          <div style={avatarStyle}>
            {getInitial(user?.username || user?.email)}
          </div>

          <div style={{ flex: 1 }}>
            <h2 style={userNameStyle}>{user?.username || "Traveler"}</h2>
            <p style={mutedTextStyle}>{user?.email || "-"}</p>

          </div>
        </section>

        <section style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <h2 style={sectionTitleStyle}>Emergency Contact</h2>
              <p style={mutedTextStyle}>
                Nomor darurat yang bisa langsung dihubungi saat perjalanan.
              </p>
            </div>
          </div>

          <div style={emergencyGridStyle}>
            {EMERGENCY_NUMBERS.map((item) => (
              <div key={item.number} style={emergencyCardStyle}>
                <div>
                  <div style={emergencyIconStyle}>{item.icon}</div>

                  <h3 style={emergencyTitleStyle}>{item.name}</h3>

                  <p style={emergencyDescriptionStyle}>
                    {item.description}
                  </p>

                  <div style={emergencyNumberStyle}>
                    {item.number}
                  </div>
                </div>

                <button
                  onClick={() => {
                    window.location.href = `tel:${item.number}`;
                  }}
                  style={callButtonStyle}
                >
                  Hubungi
                </button>
              </div>
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <h2 style={sectionTitleStyle}>Payment History</h2>
              <p style={mutedTextStyle}>
                Semua riwayat pembayaran dari akun ini.
              </p>
            </div>
          </div>

          {loadingPayments ? (
            <p style={mutedTextStyle}>Loading payment history...</p>
          ) : payments.length === 0 ? (
            <div style={emptyCardStyle}>
              <h3 style={{ margin: "0 0 8px" }}>Belum ada pembayaran</h3>
              <p style={mutedTextStyle}>
                Setelah kamu melakukan pembayaran, riwayatnya akan tampil di sini.
              </p>
            </div>
          ) : (
            <div style={paymentListStyle}>
              {payments.map((payment) => (
                <PaymentCard key={payment.id} payment={payment} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function PaymentCard({ payment }) {
  const booking = payment.booking || {};

  const title =
    booking.snapshotTitle ||
    booking.snapshot_title ||
    booking.itinerary?.title ||
    payment.bookingTitle ||
    payment.booking_title ||
    "Trip Booking";

  const destinations =
    booking.snapshotDestinations ||
    booking.snapshot_destinations ||
    payment.destinationName ||
    payment.destination_name ||
    "Destination";

  const method =
    payment.method ||
    payment.paymentMethod ||
    payment.payment_method ||
    "-";

  const status =
    payment.status ||
    "SUCCESS";

  const paymentDate =
    payment.paymentDate ||
    payment.payment_date ||
    payment.createdAt ||
    payment.created_at;

  const amount =
    payment.amount ||
    payment.totalAmount ||
    payment.total_amount ||
    booking.totalPrice ||
    booking.total_price ||
    0;

  return (
    <div style={paymentCardStyle}>
      <div style={{ flex: 1 }}>
        <div style={paymentTopRowStyle}>
          <h3 style={paymentTitleStyle}>{title}</h3>
          <span style={statusBadgeStyle}>{status}</span>
        </div>

        <p style={destinationTextStyle}>{destinations}</p>

        <div style={paymentInfoGridStyle}>
          <div>
            <span style={infoLabelStyle}>Metode</span>
            <p style={infoValueStyle}>{method}</p>
          </div>

          <div>
            <span style={infoLabelStyle}>Tanggal</span>
            <p style={infoValueStyle}>{formatDateTime(paymentDate)}</p>
          </div>
        </div>
      </div>

      <div style={priceBoxStyle}>
        Rp {formatPrice(amount)}
      </div>
      <BottomNav/>
    </div>
  );
}

function getInitial(value) {
  if (!value) {
    return "U";
  }

  return value.charAt(0).toUpperCase();
}

function formatPrice(price) {
  return Number(price || 0).toLocaleString("id-ID");
}

function formatDateTime(value) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const pageStyle = {
  minHeight: "100vh",
  background: "#F6F3EE",
  padding: "28px 28px 110px",
  boxSizing: "border-box",
};

const containerStyle = {
  maxWidth: "1150px",
  margin: "0 auto",
};

const topHeaderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  marginBottom: "20px",
};

const smallLabelStyle = {
  margin: "0 0 6px",
  color: "#4F7F5F",
  fontSize: "13px",
  fontWeight: "800",
  letterSpacing: "1px",
};

const pageTitleStyle = {
  margin: 0,
  color: "#262626",
  fontSize: "32px",
};

const profileCardStyle = {
  background: "white",
  borderRadius: "26px",
  padding: "24px",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.07)",
  marginBottom: "24px",
};

const avatarStyle = {
  width: "82px",
  height: "82px",
  borderRadius: "50%",
  background: "#4F7F5F",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "34px",
  fontWeight: "800",
  flexShrink: 0,
};

const userNameStyle = {
  margin: "0 0 6px",
  color: "#252525",
  fontSize: "24px",
};

const mutedTextStyle = {
  margin: 0,
  color: "#777",
  lineHeight: 1.5,
};

const saldoBoxStyle = {
  marginTop: "14px",
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  background: "#EDF5EF",
  color: "#3F704E",
  borderRadius: "999px",
  padding: "9px 14px",
};

const logoutButtonStyle = {
  border: "none",
  borderRadius: "16px",
  padding: "11px 18px",
  background: "#C94C4C",
  color: "white",
  fontWeight: "800",
  cursor: "pointer",
};

const sectionStyle = {
  background: "white",
  borderRadius: "26px",
  padding: "24px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.07)",
  marginBottom: "24px",
};

const sectionHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const sectionTitleStyle = {
  margin: "0 0 6px",
  color: "#252525",
  fontSize: "24px",
};

const emergencyGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px",
};

const emergencyCardStyle = {
  border: "1px solid #EEEEEE",
  borderRadius: "22px",
  padding: "18px",
  background: "#FAFAFA",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "230px",
};

const emergencyIconStyle = {
  width: "48px",
  height: "48px",
  borderRadius: "16px",
  background: "#F1E7DF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
  marginBottom: "14px",
};

const emergencyTitleStyle = {
  margin: "0 0 8px",
  color: "#252525",
  fontSize: "18px",
};

const emergencyDescriptionStyle = {
  margin: 0,
  color: "#777",
  lineHeight: 1.5,
  fontSize: "14px",
};

const emergencyNumberStyle = {
  marginTop: "16px",
  color: "#C94C4C",
  fontSize: "34px",
  fontWeight: "900",
  letterSpacing: "1px",
};

const callButtonStyle = {
  marginTop: "18px",
  border: "none",
  borderRadius: "16px",
  padding: "12px 16px",
  background: "#C94C4C",
  color: "white",
  fontWeight: "800",
  cursor: "pointer",
};

const emptyCardStyle = {
  border: "1px dashed #D8D8D8",
  borderRadius: "20px",
  padding: "22px",
  background: "#FAFAFA",
};

const paymentListStyle = {
  display: "grid",
  gap: "16px",
};

const paymentCardStyle = {
  border: "1px solid #EEEEEE",
  borderRadius: "22px",
  padding: "18px",
  display: "flex",
  justifyContent: "space-between",
  gap: "18px",
  background: "#FAFAFA",
};

const paymentTopRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap",
  marginBottom: "8px",
};

const paymentTitleStyle = {
  margin: 0,
  color: "#252525",
  fontSize: "18px",
};

const statusBadgeStyle = {
  background: "#E8F3EB",
  color: "#4F7F5F",
  padding: "5px 10px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "800",
};

const destinationTextStyle = {
  margin: "0 0 16px",
  color: "#777",
};

const paymentInfoGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: "14px",
};

const infoLabelStyle = {
  display: "block",
  color: "#888",
  fontSize: "12px",
  marginBottom: "4px",
};

const infoValueStyle = {
  margin: 0,
  color: "#333",
  fontWeight: "700",
};

const priceBoxStyle = {
  color: "#4F7F5F",
  fontWeight: "900",
  fontSize: "20px",
  whiteSpace: "nowrap",
  alignSelf: "center",
};

export default Profile;