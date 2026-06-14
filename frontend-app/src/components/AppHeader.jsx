import { useNavigate } from "react-router-dom";

function AppHeader() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "white",
        margin: "-20px -20px 18px -20px",
        padding: "16px 20px",
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "0px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <h2
        style={{
          color: "#4F7F5F",
          margin: 0,
          fontSize: "22px",
          fontWeight: "800",
        }}
      >
        Plan & Go
      </h2>

      <img
        src="https://placehold.co/48"
        alt="profile"
        onClick={() => navigate("/profile")}
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          objectFit: "cover",
          cursor: "pointer",
        }}
      />
    </div>
  );
}

export default AppHeader;