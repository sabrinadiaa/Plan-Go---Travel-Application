import { useNavigate, useLocation } from "react-router-dom";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Explore", path: "/explore" },
    { label: "Plan", path: "/plan" },
    { label: "Bookings", path: "/booking" },
    { label: "Wallet", path: "/wallet" },
    { label: "Profile", path: "/profile" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "390px",
        maxWidth: "90%",
        background: "white",
        display: "flex",
        justifyContent: "space-around",
        padding: "14px 10px",
        borderRadius: "24px",
        boxShadow: "0 -4px 12px rgba(0,0,0,0.12)",
        zIndex: 9999,
      }}
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <span
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              cursor: "pointer",
              fontSize: "12px",
              color: isActive ? "#4F7F5F" : "#777",
              fontWeight: isActive ? "bold" : "normal",
            }}
          >
            {item.label}
          </span>
        );
      })}
    </div>
  );
}

export default BottomNav;