import { getLoggedInUser } from "../utils/auth";
import { markCustomerUnsafe } from "../utils/safetyRecord";

function AppHeader() {
  const handleEmergencyClick = () => {
    const user = getLoggedInUser();

    const confirmEmergency = window.confirm(
      "Apakah kamu yakin ingin mengirim sinyal darurat?"
    );

    if (!confirmEmergency) {
      return;
    }

    markCustomerUnsafe(user, "Current Trip");

    alert("Sinyal darurat berhasil dikirim ke admin.");
  };

  return (
    <header style={headerStyle}>
      <h2 style={logoStyle}>Plan & Go</h2>

      <button onClick={handleEmergencyClick} style={emergencyButtonStyle}>
        🚨
      </button>
    </header>
  );
}

const headerStyle = {
  width: "100vw",
  marginLeft: "calc(50% - 50vw)",
  marginRight: "calc(50% - 50vw)",
  height: "64px",
  background: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 28px",
  boxSizing: "border-box",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  position: "sticky",
  top: 0,
  zIndex: 1000,
};

const logoStyle = {
  margin: 0,
  color: "#4F7F5F",
  fontWeight: "900",
};

const emergencyButtonStyle = {
  border: "none",
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  background: "#C53030",
  color: "white",
  fontSize: "18px",
  fontWeight: "900",
  cursor: "pointer",
};

export default AppHeader;