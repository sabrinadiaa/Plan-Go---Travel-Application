import { useEffect, useMemo, useState } from "react";
import AdminBottomNav from "../components/AdminBottomNav";
import { getSafetyRecords, saveSafetyRecords } from "../utils/safetyRecord";

const INITIAL_RECORDS = [
  {
    id: 1,
    customerName: "Jane Doe",
    customerCode: "APP-94382",
    initials: "JD",
    destination: "Kyoto, Japan",
    safetyStatus: "Safe",
    emergencyHistory: "No History",
    lastUpdated: "2 mins ago",
  },
  {
    id: 2,
    customerName: "Mark Stevenson",
    customerCode: "APP-10531",
    initials: "MS",
    destination: "Reykjavik, Iceland",
    safetyStatus: "Unsafe",
    emergencyHistory: "2 Incidents",
    lastUpdated: "Just now",
  },
  {
    id: 3,
    customerName: "Linda Wu",
    customerCode: "APP-22301",
    initials: "LW",
    destination: "Zurich, Switzerland",
    safetyStatus: "Safe",
    emergencyHistory: "No History",
    lastUpdated: "15 mins ago",
  },
  {
    id: 4,
    customerName: "Robert Chen",
    customerCode: "APP-00912",
    initials: "RC",
    destination: "Nairobi, Kenya",
    safetyStatus: "Unsafe",
    emergencyHistory: "No History",
    lastUpdated: "8 mins ago",
  },
  {
    id: 5,
    customerName: "Elena Garcia",
    customerCode: "APP-11820",
    initials: "EG",
    destination: "Berlin, Germany",
    safetyStatus: "Safe",
    emergencyHistory: "No History",
    lastUpdated: "1 hour ago",
  },
];

function AdminTrackRecord() {
  const [records, setRecords] = useState(() => {
    const safetyRecords = getSafetyRecords();
    return [...safetyRecords, ...INITIAL_RECORDS];
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    const reloadSafetyRecords = () => {
      const safetyRecords = getSafetyRecords();
      setRecords([...safetyRecords, ...INITIAL_RECORDS]);
    };

    window.addEventListener("safety-record-updated", reloadSafetyRecords);
    window.addEventListener("storage", reloadSafetyRecords);

    reloadSafetyRecords();

    return () => {
      window.removeEventListener("safety-record-updated", reloadSafetyRecords);
      window.removeEventListener("storage", reloadSafetyRecords);
    };
  }, []);

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const keyword = search.toLowerCase();

      return (
        String(record.customerName || "").toLowerCase().includes(keyword) ||
        String(record.customerCode || "").toLowerCase().includes(keyword) ||
        String(record.destination || "").toLowerCase().includes(keyword) ||
        String(record.safetyStatus || "").toLowerCase().includes(keyword)
      );
    });
  }, [records, search]);

  const activeTravelers = records.length;

  const safeTravelers = records.filter(
    (record) => record.safetyStatus === "Safe"
  ).length;

  const urgentAttention = records.filter(
    (record) => record.safetyStatus === "Unsafe"
  ).length;

  const handleUpdateStatus = (id) => {
    setRecords((currentRecords) => {
      const updatedRecords = currentRecords.map((record) =>
        record.id === id
          ? {
              ...record,
              safetyStatus:
                record.safetyStatus === "Safe" ? "Unsafe" : "Safe",
              emergencyHistory:
                record.safetyStatus === "Safe"
                  ? "Emergency Button Pressed"
                  : "Resolved",
              lastUpdated: "Just now",
            }
          : record
      );

      const onlyCustomerEmergencyRecords = updatedRecords.filter(
        (record) => record.customerId
      );

      saveSafetyRecords(onlyCustomerEmergencyRecords);

      return updatedRecords;
    });
  };

  const handleExportReport = () => {
    const header = [
      "Customer Name",
      "Customer Code",
      "Destination",
      "Safety Status",
      "Emergency History",
      "Last Updated",
    ];

    const rows = filteredRecords.map((record) => [
      record.customerName,
      record.customerCode,
      record.destination,
      record.safetyStatus,
      record.emergencyHistory,
      record.lastUpdated,
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
    link.download = "track-record.csv";
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
            placeholder="Search safety records..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            style={searchInputStyle}
          />
        </div>

        <div style={topActionStyle}>
          <button style={iconButtonStyle}>🔔</button>
          <button style={iconButtonStyle}>ⓘ</button>
        </div>
      </header>

      <main style={contentStyle}>
        <div style={heroStyle}>
          <div>
            <h1 style={titleStyle}>Customer Safety Tracking</h1>

            <p style={subtitleStyle}>
              Real-time monitoring of active travelers and safety status across
              all destinations.
            </p>
          </div>

          <div style={heroActionStyle}>
            <button onClick={handleExportReport} style={exportButtonStyle}>
              ⇩ Export Report
            </button>

            <button style={globalAlertButtonStyle}>🚨 Global Alert</button>
          </div>
        </div>

        <section style={summaryGridStyle}>
          <SummaryCard
            icon="🌍"
            title="Active Travelers"
            value={activeTravelers}
            tone="green"
          />

          <SummaryCard
            icon="🛡️"
            title="Status: Safe"
            value={safeTravelers}
            tone="green"
          />

          <SummaryCard
            icon="⚠️"
            title="Urgent Attention"
            value={urgentAttention}
            tone="red"
          />
        </section>

        <section style={tableSectionStyle}>
          <div style={tableHeaderStyle}>
            <h2 style={tableTitleStyle}>Live Track Record</h2>

            <span style={refreshBadgeStyle}>● Refreshes in 45s</span>
          </div>

          <div style={tableWrapperStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Customer Name</th>
                  <th style={thStyle}>Destination</th>
                  <th style={thStyle}>Safety Status</th>
                  <th style={thStyle}>Emergency History</th>
                  <th style={thStyle}>Last Updated</th>
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id} style={trStyle}>
                    <td style={tdStyle}>
                      <div style={customerStyle}>
                        <div style={avatarStyle}>{record.initials}</div>

                        <div>
                          <p style={customerNameStyle}>
                            {record.customerName}
                          </p>

                          <p style={customerCodeStyle}>
                            {record.customerCode}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td style={tdStyle}>
                      <span style={destinationStyle}>
                        📍 {record.destination}
                      </span>
                    </td>

                    <td style={tdStyle}>
                      <SafetyBadge status={record.safetyStatus} />
                    </td>

                    <td style={tdStyle}>
                      <EmergencyHistory value={record.emergencyHistory} />
                    </td>

                    <td
                      style={{
                        ...tdStyle,
                        color:
                          record.lastUpdated === "Just now"
                            ? "#C53030"
                            : "#555",
                        fontWeight:
                          record.lastUpdated === "Just now" ? "900" : "700",
                      }}
                    >
                      {record.lastUpdated}
                    </td>

                    <td style={tdStyle}>
                      <button
                        onClick={() => handleUpdateStatus(record.id)}
                        style={
                          record.safetyStatus === "Unsafe"
                            ? urgentButtonStyle
                            : updateButtonStyle
                        }
                      >
                        Update Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredRecords.length === 0 && (
              <div style={emptyStateStyle}>
                <h3>Tidak ada track record ditemukan</h3>
                <p>Coba ubah keyword pencarian.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <AdminBottomNav />
    </div>
  );
}

function SummaryCard({ icon, title, value, tone }) {
  return (
    <div style={summaryCardStyle}>
      <div
        style={{
          ...summaryIconStyle,
          background: tone === "red" ? "#FDE8E8" : "#E8F5ED",
          color: tone === "red" ? "#C53030" : "#0F6B28",
        }}
      >
        {icon}
      </div>

      <div>
        <p style={summaryTitleStyle}>{title}</p>

        <h2
          style={{
            ...summaryValueStyle,
            color: tone === "red" ? "#C53030" : "#222",
          }}
        >
          {value}
        </h2>
      </div>
    </div>
  );
}

function SafetyBadge({ status }) {
  const isSafe = status === "Safe";

  return (
    <span
      style={{
        ...statusBadgeStyle,
        background: isSafe ? "#DDF8E8" : "#FDE0DC",
        color: isSafe ? "#0F7A37" : "#C53030",
      }}
    >
      ● {status}
    </span>
  );
}

function EmergencyHistory({ value }) {
  const hasIncident = value !== "No History";

  return (
    <span
      style={{
        color: hasIncident ? "#C53030" : "#777",
        fontWeight: hasIncident ? "900" : "700",
      }}
    >
      {hasIncident ? "↺ " : "✓ "}
      {value}
    </span>
  );
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
  width: "420px",
  maxWidth: "60%",
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
  fontSize: "17px",
};

const contentStyle = {
  padding: "30px 34px",
};

const heroStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "18px",
  marginBottom: "24px",
};

const titleStyle = {
  margin: 0,
  color: "#222",
  fontSize: "30px",
};

const subtitleStyle = {
  margin: "8px 0 0",
  color: "#777",
  maxWidth: "560px",
  lineHeight: 1.5,
};

const heroActionStyle = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
};

const exportButtonStyle = {
  border: "1px solid #D4D8D2",
  background: "#FFFFFF",
  color: "#2F4F3E",
  borderRadius: "8px",
  padding: "14px 20px",
  fontWeight: "800",
  cursor: "pointer",
};

const globalAlertButtonStyle = {
  border: "none",
  background: "#2F6B45",
  color: "#FFFFFF",
  borderRadius: "8px",
  padding: "14px 22px",
  fontWeight: "800",
  cursor: "pointer",
};

const summaryGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
  gap: "18px",
  marginBottom: "28px",
};

const summaryCardStyle = {
  background: "#FFFFFF",
  borderRadius: "12px",
  padding: "22px",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
};

const summaryIconStyle = {
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const summaryTitleStyle = {
  margin: "0 0 6px",
  color: "#777",
  textTransform: "uppercase",
  fontSize: "12px",
  fontWeight: "900",
  letterSpacing: "0.5px",
};

const summaryValueStyle = {
  margin: 0,
  fontSize: "28px",
  fontWeight: "900",
};

const tableSectionStyle = {
  background: "#FFFFFF",
  borderRadius: "14px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
  overflow: "hidden",
};

const tableHeaderStyle = {
  padding: "20px 22px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid #F0F0F0",
};

const tableTitleStyle = {
  margin: 0,
  color: "#222",
  fontSize: "20px",
};

const refreshBadgeStyle = {
  background: "#F1F4F1",
  color: "#3F6A4E",
  borderRadius: "999px",
  padding: "7px 12px",
  fontSize: "12px",
  fontWeight: "900",
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
  padding: "16px 22px",
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
  padding: "18px 22px",
  color: "#333",
  fontSize: "14px",
  verticalAlign: "middle",
};

const customerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const avatarStyle = {
  width: "38px",
  height: "38px",
  borderRadius: "50%",
  background: "#EEF2EE",
  color: "#777",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  fontWeight: "900",
};

const customerNameStyle = {
  margin: "0 0 4px",
  fontWeight: "900",
  color: "#222",
};

const customerCodeStyle = {
  margin: 0,
  color: "#777",
  fontSize: "12px",
  fontWeight: "700",
};

const destinationStyle = {
  color: "#333",
  fontWeight: "700",
};

const statusBadgeStyle = {
  display: "inline-flex",
  alignItems: "center",
  borderRadius: "999px",
  padding: "6px 11px",
  fontSize: "12px",
  fontWeight: "900",
};

const updateButtonStyle = {
  border: "1px solid #D9E2D9",
  background: "#FFFFFF",
  color: "#2F6B45",
  borderRadius: "8px",
  padding: "9px 12px",
  fontWeight: "900",
  cursor: "pointer",
};

const urgentButtonStyle = {
  ...updateButtonStyle,
  background: "#C53030",
  border: "1px solid #C53030",
  color: "#FFFFFF",
};

const emptyStateStyle = {
  padding: "32px",
  textAlign: "center",
  color: "#777",
};

export default AdminTrackRecord;