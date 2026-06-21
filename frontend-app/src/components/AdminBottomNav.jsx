import { NavLink } from "react-router-dom";

function AdminBottomNav() {
  const navItems = [
    {
      label: "Home",
      path: "/admin/dashboard",
      icon: "🏠",
    },
    {
      label: "Booking",
      path: "/admin/booking",
      icon: "📋",
    },
    {
      label: "Track Record",
      path: "/admin/track-record",
      icon: "📊",
    },
  ];

  return (
    <nav style={navStyle}>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          style={({ isActive }) => ({
            ...navItemStyle,
            color: isActive ? "#FFFFFF" : "#6B7280",
            background: isActive ? "#0F6B28" : "transparent",
          })}
        >
          <span style={iconStyle}>{item.icon}</span>
          <span style={labelStyle}>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

const navStyle = {
  position: "fixed",
  left: "50%",
  bottom: "18px",
  transform: "translateX(-50%)",
  width: "calc(100% - 36px)",
  maxWidth: "520px",
  background: "#FFFFFF",
  borderRadius: "28px",
  padding: "10px",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "8px",
  boxShadow: "0 14px 38px rgba(0,0,0,0.18)",
  zIndex: 1000,
};

const navItemStyle = {
  textDecoration: "none",
  borderRadius: "20px",
  padding: "10px 8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "800",
  transition: "0.2s ease",
};

const iconStyle = {
  fontSize: "20px",
  marginBottom: "4px",
};

const labelStyle = {
  fontSize: "12px",
};

export default AdminBottomNav;