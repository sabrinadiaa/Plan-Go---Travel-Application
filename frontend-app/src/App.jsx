import { BrowserRouter, Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore";
import DestinationDetail from "./pages/DestinationDetail";
import Plan from "./pages/Plan";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";

import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import Review from "./pages/Review";
import Wallet from "./pages/Wallet";
import ExploreAll from "./pages/ExploreAll";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/all" element={<ExploreAll />} />
        <Route path="/destination/:id" element={<DestinationDetail />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment/:bookingId" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/review/:destinationId" element={<Review />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;