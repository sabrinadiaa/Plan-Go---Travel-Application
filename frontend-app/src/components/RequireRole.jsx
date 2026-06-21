import { Navigate } from "react-router-dom";
import { getLoggedInUser } from "../utils/auth";

function RequireRole({ children, role }) {
  const user = getLoggedInUser();

  if (!user?.id) {
    return <Navigate to="/login" replace />;
  }

  const userRole = String(user.role || "CUSTOMER").toUpperCase();
  const requiredRole = String(role || "").toUpperCase();

  if (userRole !== requiredRole) {
    if (userRole === "ADMIN") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/explore" replace />;
  }

  return children;
}

export default RequireRole;