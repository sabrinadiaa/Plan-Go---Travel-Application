import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login";
import Explore from "./pages/Explore";
import ExploreAll from "./pages/ExploreAll";
import DestinationDetail from "./pages/DestinationDetail";
import Plan from "./pages/Plan";
import PlanDetail from "./pages/PlanDetail";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import Review from "./pages/Review";
import Profile from "./pages/Profile";
import Emergency from "./pages/Emergency";

import AdminDashboard from "./pages/AdminDashboard";
import AdminBooking from "./pages/AdminBooking";
import AdminTrackRecord from "./pages/AdminTrackRecord";
import RequireRole from "./components/RequireRole";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/admin/dashboard"
        element={
          <RequireRole role="ADMIN">
            <AdminDashboard />
          </RequireRole>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <RequireRole role="ADMIN">
            <AdminDashboard />
          </RequireRole>
        }
      />

      <Route
        path="/admin/booking"
        element={
          <RequireRole role="ADMIN">
            <AdminBooking />
          </RequireRole>
        }
      />

      <Route
        path="/admin/track-record"
        element={
          <RequireRole role="ADMIN">
            <AdminTrackRecord />
          </RequireRole>
        }
      />

      <Route
        path="/explore"
        element={
          <RequireRole role="CUSTOMER">
            <Explore />
          </RequireRole>
        }
      />

      <Route
        path="/explore/all"
        element={
          <RequireRole role="CUSTOMER">
            <ExploreAll />
          </RequireRole>
        }
      />

      <Route
        path="/destination/:id"
        element={
          <RequireRole role="CUSTOMER">
            <DestinationDetail />
          </RequireRole>
        }
      />

      <Route
        path="/plan"
        element={
          <RequireRole role="CUSTOMER">
            <Plan />
          </RequireRole>
        }
      />

      <Route
        path="/plan/detail"
        element={
          <RequireRole role="CUSTOMER">
            <PlanDetail />
          </RequireRole>
        }
      />

      <Route
        path="/plan/detail/:itineraryId"
        element={
          <RequireRole role="CUSTOMER">
            <PlanDetail />
          </RequireRole>
        }
      />

      <Route
        path="/booking"
        element={
          <RequireRole role="CUSTOMER">
            <Booking />
          </RequireRole>
        }
      />

      <Route
        path="/payment/:bookingId"
        element={
          <RequireRole role="CUSTOMER">
            <Payment />
          </RequireRole>
        }
      />

      <Route
        path="/payment-success"
        element={
          <RequireRole role="CUSTOMER">
            <PaymentSuccess />
          </RequireRole>
        }
      />

      <Route
        path="/review/:destinationId"
        element={
          <RequireRole role="CUSTOMER">
            <Review />
          </RequireRole>
        }
      />

      <Route
        path="/profile"
        element={
          <RequireRole role="CUSTOMER">
            <Profile />
          </RequireRole>
        }
      />

      <Route
        path="/emergency"
        element={
          <RequireRole role="CUSTOMER">
            <Emergency />
          </RequireRole>
        }
      />
    </Routes>
  );
}

export default App;