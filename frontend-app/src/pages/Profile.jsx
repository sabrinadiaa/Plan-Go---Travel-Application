import { useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import BottomNav from "../components/BottomNav";

function Profile() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        minHeight: "100vh",
        background: "#F6F3EE",
        paddingBottom: "100px",
        boxSizing: "border-box",
      }}
    >
      <AppHeader />

      <div
        style={{
          padding: "26px 20px 0 20px",
        }}
      >
        {/* Profile Info */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "34px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "110px",
              height: "110px",
              margin: "0 auto 14px auto",
            }}
          >
            <img
              src="/images/profile.jpg"
              alt="profile"
              style={{
                width: "110px",
                height: "110px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid white",
                boxShadow: "0 8px 22px rgba(0,0,0,0.12)",
              }}
            />

            <button
              style={{
                position: "absolute",
                right: "4px",
                bottom: "6px",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "none",
                background: "#4F7F5F",
                color: "white",
                cursor: "pointer",
              }}
            >
              ✎
            </button>
          </div>

          <h1
            style={{
              margin: "0 0 8px 0",
              color: "#2E2E2E",
              fontSize: "26px",
              fontWeight: "800",
            }}
          >
            Alex Morgan
          </h1>

          <span
            style={{
              background: "#B7E4C7",
              color: "#2E7D32",
              padding: "6px 12px",
              borderRadius: "16px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            ● Premium Traveler
          </span>
        </div>

        {/* Account Settings */}
        <SectionTitle title="ACCOUNT SETTINGS" />

        <MenuItem
          icon="♙"
          label="Edit Profile"
          onClick={() => alert("Edit Profile demo")}
        />

        <MenuItem
          icon="⚠"
          label="Emergency"
          onClick={() => navigate("/emergency")}
        />

        <MenuItem
          icon="🔔"
          label="Notification Settings"
          onClick={() => alert("Notification demo")}
        />

        {/* Legal */}
        <SectionTitle title="LEGAL & SUPPORT" />

        <MenuItem
          icon="🛡"
          label="Privacy Policy"
          onClick={() => alert("Privacy Policy demo")}
        />

        <MenuItem
          icon="?"
          label="Help Support"
          onClick={() => alert("Help Support demo")}
        />

        <button
          onClick={() => navigate("/explore")}
          style={{
            border: "none",
            background: "transparent",
            color: "#C62828",
            fontSize: "15px",
            marginTop: "18px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          ⎋ Log Out
        </button>
      </div>

      <BottomNav />
    </div>
  );
}

function SectionTitle({ title }) {
  return (
    <p
      style={{
        margin: "22px 0 10px 0",
        color: "#999",
        fontSize: "12px",
        fontWeight: "800",
        letterSpacing: "1px",
      }}
    >
      {title}
    </p>
  );
}

function MenuItem({ icon, label, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "white",
        borderRadius: "14px",
        padding: "16px",
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <span
          style={{
            fontSize: "18px",
            color: "#2E2E2E",
          }}
        >
          {icon}
        </span>

        <span
          style={{
            color: "#2E2E2E",
            fontSize: "15px",
            fontWeight: "500",
          }}
        >
          {label}
        </span>
      </div>

      <span style={{ color: "#AAA", fontSize: "22px" }}>›</span>
    </div>
  );
}

export default Profile;