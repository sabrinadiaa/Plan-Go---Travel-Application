import { useNavigate } from "react-router-dom";
import { getLoggedInUser, logout } from "../utils/auth";
import AdminBottomNav from "../components/AdminBottomNav";

function AdminDashboard() {
  const navigate = useNavigate();
  const user = getLoggedInUser();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <div>
          <p style={brandStyle}>PLAN & GO</p>
          <h1 style={titleStyle}>Manage Destinations</h1>
          <p style={subtitleStyle}>View and curate your portfolio</p>
        </div>

        <div style={headerRightStyle}>
          <input
            type="text"
            placeholder="Search destinations, bookings, or users..."
            style={searchStyle}
          />

          <button style={addButtonStyle}>
            + Add Destination
          </button>

          <button onClick={handleLogout} style={logoutButtonStyle}>
            Logout
          </button>
        </div>
      </header>

      <section style={categoryStyle}>
        <button style={activeCategoryStyle}>All Destinations</button>
        <button style={categoryButtonStyle}>Beach</button>
        <button style={categoryButtonStyle}>Mountain</button>
        <button style={categoryButtonStyle}>Urban</button>
        <button style={categoryButtonStyle}>Luxury</button>
      </section>

      <main style={gridStyle}>
        {DESTINATIONS.map((destination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
          />
        ))}

        <button style={addCardStyle}>
          <div style={plusCircleStyle}>+</div>
          <p style={{ margin: 0, fontWeight: "800" }}>
            Add Destination
          </p>
        </button>
      </main>

      <div style={adminInfoStyle}>
        <div style={avatarStyle}>
          {getInitial(user?.username || user?.email)}
        </div>

        <div>
          <p style={adminNameStyle}>{user?.username || "Admin"}</p>
          <p style={adminRoleStyle}>Administrator</p>
        </div>
      </div>

      <AdminBottomNav />
    </div>
  );
}

function DestinationCard({ destination }) {
  return (
    <div style={cardStyle}>
      <div style={imageWrapperStyle}>
        <img
          src={destination.image}
          alt={destination.name}
          style={imageStyle}
        />

        <span style={priceBadgeStyle}>
          ${destination.price}
        </span>
      </div>

      <div style={cardBodyStyle}>
        <div style={cardTopStyle}>
          <div>
            <h3 style={cardTitleStyle}>{destination.name}</h3>
            <p style={locationStyle}>📍 {destination.location}</p>
          </div>

          <span style={tagStyle}>{destination.category}</span>
        </div>

        <div style={cardActionStyle}>
          <button style={editButtonStyle}>✎ Edit</button>
          <button style={deleteButtonStyle}>🗑</button>
        </div>
      </div>
    </div>
  );
}

function getInitial(value) {
  if (!value) return "A";
  return value.charAt(0).toUpperCase();
}

const DESTINATIONS = [
  {
    id: 1,
    name: "Amalfi Coast",
    location: "Italy",
    category: "LUXURY",
    price: "1,200",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Zermatt Peak",
    location: "Switzerland",
    category: "MOUNTAIN",
    price: "2,450",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Shibuya District",
    location: "Japan",
    category: "URBAN",
    price: "1,800",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Baa Atoll",
    location: "Maldives",
    category: "BEACH",
    price: "3,100",
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80",
  },
];

const pageStyle = {
  minHeight: "100vh",
  background: "#F6F7F5",
  padding: "28px 34px 120px",
  boxSizing: "border-box",
};

const headerStyle = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "20px",
  marginBottom: "22px",
};

const brandStyle = {
  margin: "0 0 10px",
  color: "#0F6B28",
  fontWeight: "900",
};

const titleStyle = {
  margin: 0,
  color: "#252525",
  fontSize: "30px",
};

const subtitleStyle = {
  margin: "6px 0 0",
  color: "#777",
};

const headerRightStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
};

const searchStyle = {
  width: "340px",
  maxWidth: "100%",
  border: "1px solid #E0E0E0",
  borderRadius: "999px",
  padding: "11px 16px",
  outline: "none",
  background: "#FFFFFF",
};

const addButtonStyle = {
  border: "none",
  borderRadius: "12px",
  background: "#0F6B28",
  color: "white",
  padding: "12px 18px",
  fontWeight: "800",
  cursor: "pointer",
};

const logoutButtonStyle = {
  border: "none",
  borderRadius: "12px",
  background: "#C94C4C",
  color: "white",
  padding: "12px 16px",
  fontWeight: "800",
  cursor: "pointer",
};

const categoryStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginBottom: "22px",
};

const categoryButtonStyle = {
  border: "none",
  borderRadius: "999px",
  background: "#FFFFFF",
  color: "#555",
  padding: "9px 16px",
  fontWeight: "700",
  cursor: "pointer",
};

const activeCategoryStyle = {
  ...categoryButtonStyle,
  background: "#0F6B28",
  color: "#FFFFFF",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
  gap: "22px",
};

const cardStyle = {
  background: "#FFFFFF",
  borderRadius: "18px",
  overflow: "hidden",
  boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
};

const imageWrapperStyle = {
  position: "relative",
  height: "150px",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const priceBadgeStyle = {
  position: "absolute",
  right: "10px",
  top: "10px",
  background: "#FFFFFF",
  color: "#0F6B28",
  borderRadius: "999px",
  padding: "5px 10px",
  fontSize: "12px",
  fontWeight: "900",
};

const cardBodyStyle = {
  padding: "14px",
};

const cardTopStyle = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "10px",
  marginBottom: "14px",
};

const cardTitleStyle = {
  margin: "0 0 5px",
  color: "#252525",
};

const locationStyle = {
  margin: 0,
  color: "#777",
  fontSize: "13px",
};

const tagStyle = {
  background: "#E8F3EB",
  color: "#0F6B28",
  borderRadius: "999px",
  padding: "4px 8px",
  fontSize: "10px",
  fontWeight: "900",
};

const cardActionStyle = {
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: "8px",
};

const editButtonStyle = {
  border: "1px solid #DDEBDD",
  borderRadius: "10px",
  background: "#FFFFFF",
  color: "#0F6B28",
  padding: "9px",
  fontWeight: "800",
  cursor: "pointer",
};

const deleteButtonStyle = {
  border: "1px solid #F0CFCF",
  borderRadius: "10px",
  background: "#FFFFFF",
  color: "#C94C4C",
  padding: "9px 12px",
  cursor: "pointer",
};

const addCardStyle = {
  minHeight: "230px",
  border: "2px dashed #D8D8D8",
  borderRadius: "18px",
  background: "#FFFFFF",
  color: "#555",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "12px",
  cursor: "pointer",
};

const plusCircleStyle = {
  width: "46px",
  height: "46px",
  borderRadius: "50%",
  background: "#F0F0F0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "26px",
  fontWeight: "900",
};

const adminInfoStyle = {
  position: "fixed",
  left: "28px",
  bottom: "28px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  background: "#FFFFFF",
  borderRadius: "18px",
  padding: "10px 14px",
  boxShadow: "0 10px 26px rgba(0,0,0,0.10)",
};

const avatarStyle = {
  width: "38px",
  height: "38px",
  borderRadius: "50%",
  background: "#DDEBDD",
  color: "#0F6B28",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "900",
};

const adminNameStyle = {
  margin: 0,
  fontWeight: "900",
  color: "#252525",
};

const adminRoleStyle = {
  margin: 0,
  color: "#777",
  fontSize: "12px",
};

export default AdminDashboard;