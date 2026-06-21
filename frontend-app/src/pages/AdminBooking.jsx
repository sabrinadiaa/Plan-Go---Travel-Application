import { useMemo, useState } from "react";
import AdminBottomNav from "../components/AdminBottomNav";

const INITIAL_BOOKINGS = [
  {
    id: 1,
    bookingCode: "PG-8271",
    customerName: "Eleanor Whispering",
    customerInitial: "EW",
    destination: "Kyoto, Japan",
    travelDate: "Oct 12 - Oct 20, 2023",
    payment: "Confirmed",
    status: "Active",
    total: 1250000,
  },
  {
    id: 2,
    bookingCode: "PG-9102",
    customerName: "Marcus Chen",
    customerInitial: "MC",
    destination: "Swiss Alps, Switzerland",
    travelDate: "Nov 05 - Nov 12, 2023",
    payment: "Pending",
    status: "Upcoming",
    total: 2450000,
  },
  {
    id: 3,
    bookingCode: "PG-7629",
    customerName: "Sarah Davidson",
    customerInitial: "SD",
    destination: "Santorini, Greece",
    travelDate: "Sep 20 - Sep 28, 2023",
    payment: "Confirmed",
    status: "Completed",
    total: 1800000,
  },
  {
    id: 4,
    bookingCode: "PG-1033",
    customerName: "Robert Taylor",
    customerInitial: "RT",
    destination: "Masai Mara, Kenya",
    travelDate: "Dec 15 - Dec 22, 2023",
    payment: "Confirmed",
    status: "Upcoming",
    total: 3100000,
  },
  {
    id: 5,
    bookingCode: "PG-5541",
    customerName: "Lisa Kudrow",
    customerInitial: "LK",
    destination: "Reykjavik, Iceland",
    travelDate: "Aug 10 - Aug 18, 2023",
    payment: "Confirmed",
    status: "Completed",
    total: 1650000,
  },
];

function AdminBooking() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        booking.bookingCode.toLowerCase().includes(keyword) ||
        booking.customerName.toLowerCase().includes(keyword) ||
        booking.destination.toLowerCase().includes(keyword) ||
        booking.status.toLowerCase().includes(keyword) ||
        booking.payment.toLowerCase().includes(keyword);

      const matchFilter =
        filter === "ALL" ||
        booking.status.toUpperCase() === filter ||
        booking.payment.toUpperCase() === filter;

      return matchSearch && matchFilter;
    });
  }, [bookings, search, filter]);

  const totalBookings = bookings.length;
  const activeBookings = bookings.filter(
    (booking) => booking.status === "Active"
  ).length;
  const upcomingBookings = bookings.filter(
    (booking) => booking.status === "Upcoming"
  ).length;
  const monthlyRevenue = bookings.reduce(
    (total, booking) => total + Number(booking.total || 0),
    0
  );

  const handleConfirmPayment = (id) => {
    setBookings((currentBookings) =>
      currentBookings.map((booking) =>
        booking.id === id
          ? {
              ...booking,
              payment: "Confirmed",
            }
          : booking
      )
    );
  };

  const handleCancelBooking = (id) => {
    const confirmCancel = window.confirm("Batalkan booking ini?");

    if (!confirmCancel) {
      return;
    }

    setBookings((currentBookings) =>
      currentBookings.filter((booking) => booking.id !== id)
    );
  };

  const handleExportCsv = () => {
    const header = [
      "Booking ID",
      "Customer Name",
      "Destination",
      "Travel Date",
      "Payment",
      "Status",
      "Total",
    ];

    const rows = filteredBookings.map((booking) => [
      booking.bookingCode,
      booking.customerName,
      booking.destination,
      booking.travelDate,
      booking.payment,
      booking.status,
      booking.total,
    ]);

    const csvContent = [header, ...rows]
      .map((row) => row.map((value) => `"${value}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "admin-bookings.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div style={pageStyle}>
      <header style={topBarStyle}>
        <div style={searchWrapperStyle}>
          <span style={searchIconStyle}>🔍</span>
          <input
            type="text"
            placeholder="Search bookings..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            style={searchInputStyle}
          />
        </div>

        <div style={topActionStyle}>
          <button style={newBookingButtonStyle}>+ New Booking</button>
        </div>
      </header>

      <main style={contentStyle}>
        <p style={breadcrumbStyle}>ADMIN / BOOKINGS</p>

        <h1 style={titleStyle}>Booking Management</h1>

        <section style={tableSectionStyle}>
          <div style={tableHeaderStyle}>
            <div style={tabsStyle}>
              <button
                onClick={() => setFilter("ALL")}
                style={filter === "ALL" ? activeTabStyle : tabStyle}
              >
                All Bookings
              </button>

              <button
                onClick={() => setFilter("ACTIVE")}
                style={filter === "ACTIVE" ? activeTabStyle : tabStyle}
              >
                Active
              </button>

              <button
                onClick={() => setFilter("UPCOMING")}
                style={filter === "UPCOMING" ? activeTabStyle : tabStyle}
              >
                Upcoming
              </button>

              <button
                onClick={() => setFilter("COMPLETED")}
                style={filter === "COMPLETED" ? activeTabStyle : tabStyle}
              >
                Completed
              </button>

              <button
                onClick={() => setFilter("PENDING")}
                style={filter === "PENDING" ? activeTabStyle : tabStyle}
              >
                Pending Payment
              </button>
            </div>

            <button onClick={handleExportCsv} style={exportButtonStyle}>
              ⇩ Export CSV
            </button>
          </div>

          <div style={tableWrapperStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Booking ID</th>
                  <th style={thStyle}>Customer Name</th>
                  <th style={thStyle}>Destination</th>
                  <th style={thStyle}>Travel Date</th>
                  <th style={thStyle}>Payment</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} style={trStyle}>
                    <td style={tdCodeStyle}>#{booking.bookingCode}</td>

                    <td style={tdStyle}>
                      <div style={customerStyle}>
                        <div style={avatarStyle}>
                          {booking.customerInitial}
                        </div>
                        <span>{booking.customerName}</span>
                      </div>
                    </td>

                    <td style={tdStyle}>{booking.destination}</td>

                    <td style={tdStyle}>{booking.travelDate}</td>

                    <td style={tdStyle}>
                      <PaymentBadge status={booking.payment} />
                    </td>

                    <td style={tdStyle}>
                      <StatusBadge status={booking.status} />
                    </td>

                    <td style={tdStyle}>
                      <div style={actionStyle}>
                        {booking.payment === "Pending" && (
                          <button
                            onClick={() => handleConfirmPayment(booking.id)}
                            style={confirmButtonStyle}
                          >
                            Confirm
                          </button>
                        )}

                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          style={deleteButtonStyle}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredBookings.length === 0 && (
              <div style={emptyStateStyle}>
                <h3>Tidak ada booking ditemukan</h3>
                <p>Coba ubah keyword pencarian atau filter booking.</p>
              </div>
            )}
          </div>

          <div style={paginationStyle}>
            <p style={paginationTextStyle}>
              Showing 1 to {filteredBookings.length} of {bookings.length} bookings
            </p>

            <div style={paginationButtonGroupStyle}>
              <button style={pageButtonStyle}>‹</button>
              <button style={activePageButtonStyle}>1</button>
              <button style={pageButtonStyle}>2</button>
              <button style={pageButtonStyle}>3</button>
              <button style={pageButtonStyle}>›</button>
            </div>
          </div>
        </section>
      </main>

      <AdminBottomNav />
    </div>
  );
}

function SummaryCard({ title, value, note, tone }) {
  return (
    <div style={summaryCardStyle}>
      <p style={summaryTitleStyle}>{title}</p>
      <h2 style={summaryValueStyle}>{value}</h2>
      <p
        style={{
          ...summaryNoteStyle,
          color: tone === "green" ? "#0F7A37" : "#B7791F",
        }}
      >
        {tone === "green" ? "↗" : "⏱"} {note}
      </p>
    </div>
  );
}

function PaymentBadge({ status }) {
  const isConfirmed = status === "Confirmed";

  return (
    <span
      style={{
        ...badgeStyle,
        background: isConfirmed ? "#E7F5EA" : "#FFF1E5",
        color: isConfirmed ? "#0F7A37" : "#C05621",
      }}
    >
      {status}
    </span>
  );
}

function StatusBadge({ status }) {
  const isActive = status === "Active";
  const isCompleted = status === "Completed";

  return (
    <span
      style={{
        ...statusBadgeStyle,
        background: isActive
          ? "#E7F5EA"
          : isCompleted
          ? "#F0F0F0"
          : "#FFF3DA",
        color: isActive
          ? "#0F7A37"
          : isCompleted
          ? "#555"
          : "#9A6415",
      }}
    >
      <span style={dotStyle}>●</span>
      {status}
    </span>
  );
}

function formatPrice(value) {
  return Number(value || 0).toLocaleString("id-ID");
}

const pageStyle = {
  minHeight: "100vh",
  background: "#F7F8F6",
  paddingBottom: "120px",
  boxSizing: "border-box",
};

const topBarStyle = {
  height: "64px",
  background: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 32px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
  position: "sticky",
  top: 0,
  zIndex: 50,
};

const searchWrapperStyle = {
  width: "360px",
  maxWidth: "50%",
  background: "#F3F4F2",
  borderRadius: "999px",
  padding: "0 14px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const searchIconStyle = {
  fontSize: "13px",
  color: "#777",
};

const searchInputStyle = {
  width: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
  padding: "12px 0",
  fontSize: "14px",
};

const topActionStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const iconButtonStyle = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: "16px",
};

const newBookingButtonStyle = {
  border: "none",
  background: "#0F6B28",
  color: "#FFFFFF",
  borderRadius: "4px",
  padding: "12px 18px",
  fontWeight: "800",
  cursor: "pointer",
};

const contentStyle = {
  padding: "28px 32px",
};

const breadcrumbStyle = {
  margin: "0 0 8px",
  color: "#6B7280",
  fontSize: "12px",
  fontWeight: "800",
  letterSpacing: "0.5px",
};

const titleStyle = {
  margin: "0 0 24px",
  color: "#222",
  fontSize: "30px",
};

const summaryGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
  gap: "18px",
  marginBottom: "28px",
};

const summaryCardStyle = {
  background: "#FFFFFF",
  borderRadius: "10px",
  padding: "22px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
};

const summaryTitleStyle = {
  margin: "0 0 10px",
  color: "#6B7280",
  fontSize: "12px",
  fontWeight: "900",
  textTransform: "uppercase",
};

const summaryValueStyle = {
  margin: "0 0 14px",
  color: "#222",
  fontSize: "26px",
};

const summaryNoteStyle = {
  margin: 0,
  fontSize: "12px",
  fontWeight: "700",
};

const tableSectionStyle = {
  background: "#FFFFFF",
  borderRadius: "12px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
  overflow: "hidden",
};

const tableHeaderStyle = {
  padding: "18px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "14px",
  borderBottom: "1px solid #F0F0F0",
};

const tabsStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
};

const tabStyle = {
  border: "none",
  borderRadius: "6px",
  background: "#F4F5F3",
  color: "#555",
  padding: "8px 12px",
  fontWeight: "800",
  cursor: "pointer",
};

const activeTabStyle = {
  ...tabStyle,
  background: "#E7F5EA",
  color: "#0F6B28",
};

const exportButtonStyle = {
  border: "none",
  background: "transparent",
  color: "#555",
  fontWeight: "800",
  cursor: "pointer",
};

const tableWrapperStyle = {
  width: "100%",
  overflowX: "auto",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: "900px",
};

const thStyle = {
  textAlign: "left",
  padding: "16px 20px",
  color: "#777",
  background: "#FAFAFA",
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const trStyle = {
  borderBottom: "1px solid #F0F0F0",
};

const tdStyle = {
  padding: "18px 20px",
  color: "#333",
  fontSize: "14px",
  verticalAlign: "middle",
};

const tdCodeStyle = {
  ...tdStyle,
  color: "#0F6B28",
  fontWeight: "900",
};

const customerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const avatarStyle = {
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  background: "#EEF2EE",
  color: "#777",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "11px",
  fontWeight: "900",
};

const badgeStyle = {
  display: "inline-flex",
  alignItems: "center",
  borderRadius: "999px",
  padding: "5px 10px",
  fontSize: "12px",
  fontWeight: "900",
};

const statusBadgeStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  borderRadius: "999px",
  padding: "5px 10px",
  fontSize: "12px",
  fontWeight: "900",
};

const dotStyle = {
  fontSize: "8px",
};

const actionStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const confirmButtonStyle = {
  border: "none",
  borderRadius: "6px",
  background: "#E7F5EA",
  color: "#0F6B28",
  padding: "8px 10px",
  fontWeight: "900",
  cursor: "pointer",
};

const deleteButtonStyle = {
  border: "none",
  borderRadius: "6px",
  background: "#FDE8E8",
  color: "#C94C4C",
  padding: "8px 10px",
  fontWeight: "900",
  cursor: "pointer",
};

const emptyStateStyle = {
  padding: "32px",
  textAlign: "center",
  color: "#777",
};

const paginationStyle = {
  padding: "18px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
};

const paginationTextStyle = {
  margin: 0,
  color: "#777",
  fontSize: "13px",
};

const paginationButtonGroupStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const pageButtonStyle = {
  width: "32px",
  height: "32px",
  border: "none",
  borderRadius: "8px",
  background: "#F4F5F3",
  color: "#555",
  fontWeight: "800",
  cursor: "pointer",
};

const activePageButtonStyle = {
  ...pageButtonStyle,
  background: "#0F6B28",
  color: "#FFFFFF",
};

export default AdminBooking;