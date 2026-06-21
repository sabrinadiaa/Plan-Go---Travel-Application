import { useNavigate } from "react-router-dom";

function AppHeader() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        background: "white",
        padding: "24px 64px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          color: "#4F7F5F",
          margin: 0,
          fontSize: "28px",
          fontWeight: "800",
        }}
      >
        Plan & Go
      </h2>

    </div>
  );
}

export default AppHeader;