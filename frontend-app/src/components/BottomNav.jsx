import { useNavigate, useLocation } from "react-router-dom";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Explore", icon: "🏝️", path: "/explore" },
    { label: "Plan", icon: "🗺️", path: "/plan" },
    { label: "Booking", icon: "🎫", path: "/booking" },
    { label: "Wallet", icon: "💳", path: "/wallet" },
    { label: "Profile", icon: "👤", path: "/profile" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: "18px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(760px, 92%)",
        background: "rgba(255,255,255,0.96)",
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        borderRadius: "28px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.16)",
        zIndex: 9999,
      }}
    >
      {navItems.map((item) => {
        const isActive =
            location.pathname === item.path ||
            (item.path === "/explore" && location.pathname.startsWith("/explore")) ||
            (item.path === "/explore" && location.pathname === "/");

        return (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              width: "68px",
              padding: "8px 4px",
              borderRadius: "22px",
              textAlign: "center",
              cursor: "pointer",
              background: isActive ? "#4F7F5F" : "transparent",
              color: isActive ? "white" : "#777",
              transition: "0.2s",
            }}
          >
            <div style={{ fontSize: "18px", marginBottom: "2px" }}>
              {item.icon}
            </div>

            <div
              style={{
                fontSize: "11px",
                fontWeight: isActive ? "700" : "500",
              }}
            >
              {item.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BottomNav;