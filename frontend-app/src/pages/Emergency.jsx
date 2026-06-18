import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

function Emergency() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        minHeight: "100vh",
        background: "#F6F3EE",
        padding: "18px 18px 100px 18px",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "22px",
        }}
      >
        <button
          onClick={() => navigate("/profile")}
          style={{
            border: "none",
            background: "transparent",
            fontSize: "24px",
            cursor: "pointer",
            color: "#4F7F5F",
          }}
        >
          ☰
        </button>

        <h1
          style={{
            margin: 0,
            color: "#4F7F5F",
            fontSize: "24px",
            fontWeight: "800",
          }}
        >
          Emergency Contacts
        </h1>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search emergency services..."
        style={{
          width: "100%",
          padding: "16px",
          borderRadius: "16px",
          border: "none",
          outline: "none",
          background: "white",
          fontSize: "14px",
          marginBottom: "16px",
          boxSizing: "border-box",
        }}
      />

      {/* Categories */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
          marginBottom: "20px",
        }}
      >
        <CategoryButton active label="All" />
        <CategoryButton label="Medical" />
        <CategoryButton label="Security" />
        <CategoryButton label="Tourist Help" />
      </div>

      {/* Main Emergency */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "14px",
          marginBottom: "22px",
        }}
      >
        <EmergencyCard
          bg="#FFD6D6"
          icon="🛡"
          title="Local Police"
          number="110"
          buttonBg="#B00020"
        />

        <EmergencyCard
          bg="#B7E4C7"
          icon="✚"
          title="Ambulance"
          number="118"
          buttonBg="#4F7F5F"
        />
      </div>

      {/* Other Services */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "14px",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#4F7F5F",
            fontSize: "22px",
          }}
        >
          Other Services
        </h2>

        <p
          style={{
            margin: 0,
            color: "#999",
            fontSize: "14px",
          }}
        >
          Bali, Indonesia
        </p>
      </div>

      <ServiceItem icon="🎧" title="Tourist Helpline" phone="+62 361751261" />
      <ServiceItem icon="⚑" title="US Embassy Jakarta" phone="+62 2150831000" />
      <ServiceItem icon="🔍" title="Search & Rescue" phone="115" />

      {/* Map Card */}
      <div
        style={{
          background: "white",
          borderRadius: "18px",
          overflow: "hidden",
          marginTop: "20px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            height: "150px",
            background:
              "linear-gradient(135deg, #B7E4C7, #D8F3DC, #A8DADC)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#4F7F5F",
            fontSize: "40px",
          }}
        >
          📍
        </div>

        <div
          style={{
            padding: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 6px 0",
                color: "#2E2E2E",
                fontWeight: "600",
              }}
            >
              Share My Location
            </p>

            <p
              style={{
                margin: 0,
                color: "#777",
                fontSize: "13px",
              }}
            >
              8.6705° S, 115.2126° E
            </p>
          </div>

          <button
            style={{
              border: "none",
              background: "#4F7F5F",
              color: "white",
              borderRadius: "14px",
              padding: "12px 16px",
              cursor: "pointer",
            }}
          >
            ↗ Send
          </button>
        </div>
      </div>

      {/* Floating Help */}
      <button
        style={{
          position: "fixed",
          right: "22px",
          bottom: "92px",
          width: "54px",
          height: "54px",
          borderRadius: "50%",
          border: "none",
          background: "#4F7F5F",
          color: "white",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
        }}
      >
        ?
      </button>

      <BottomNav />
    </div>
  );
}

function CategoryButton({ label, active }) {
  return (
    <button
      style={{
        border: "none",
        background: active ? "#4F7F5F" : "#E8E3DA",
        color: active ? "white" : "#555",
        padding: "10px 18px",
        borderRadius: "20px",
        whiteSpace: "nowrap",
        fontWeight: "600",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

function EmergencyCard({ bg, icon, title, number, buttonBg }) {
  return (
    <div
      style={{
        background: bg,
        borderRadius: "16px",
        padding: "18px",
      }}
    >
      <div
        style={{
          width: "46px",
          height: "46px",
          borderRadius: "12px",
          background: "rgba(255,255,255,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px",
          fontSize: "22px",
        }}
      >
        {icon}
      </div>

      <p
        style={{
          margin: "0 0 4px 0",
          color: "#555",
          fontSize: "14px",
        }}
      >
        {title}
      </p>

      <h1
        style={{
          margin: "0 0 16px 0",
          color: "#2E2E2E",
          fontSize: "28px",
        }}
      >
        {number}
      </h1>

      <button
        style={{
          width: "100%",
          border: "none",
          background: buttonBg,
          color: "white",
          padding: "12px",
          borderRadius: "10px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        📞 Call
      </button>
    </div>
  );
}

function ServiceItem({ icon, title, phone }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "14px",
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        borderLeft: "4px solid #4F7F5F",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <div
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            background: "#B7E4C7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
          }}
        >
          {icon}
        </div>

        <div>
          <p
            style={{
              margin: "0 0 4px 0",
              color: "#2E2E2E",
              fontWeight: "600",
            }}
          >
            {title}
          </p>

          <p
            style={{
              margin: 0,
              color: "#777",
              fontSize: "13px",
            }}
          >
            {phone}
          </p>
        </div>
      </div>

      <button
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          border: "none",
          background: "#F6F3EE",
          cursor: "pointer",
        }}
      >
        📞
      </button>
    </div>
  );
}

export default Emergency;