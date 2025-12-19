import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import HomePage from "../pages/Homepage";
import DefaultLayout from "../layouts/DefaultLayout";
import AdminLayout from "../layouts/AdminLayout";
import PartnerLayout from "../layouts/PartnerLayout";
import { CustomerManagementPage, PartnerManagementPage, PartnerApprovalPage, WithdrawRequestsPage } from "../pages/Admin";
import { BookingManagementPage, RevenueManagementPage } from "../pages/Partner";
import ResortList from "../pages/ResortList";
import ResortDetail from "../pages/ResortDetails";
import AuthPage from "../pages/Auth";
import CartPage from "../pages/Cart";
import PaymentResult from "../pages/PaymentResult";
import BookingHistoryPage from "../pages/BookingHistory";
import AccessDenied from "../pages/AccessDenied";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<ResortList />} />
          <Route path="/resort/:id" element={<ResortDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment-result" element={<PaymentResult />} />
          <Route path="/booking-history" element={<BookingHistoryPage />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/access-denied" element={<AccessDenied />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/customers" replace />} />
          <Route path="customers" element={<CustomerManagementPage />} />
          <Route path="partners" element={<PartnerManagementPage />} />
          <Route path="partner-approval" element={<PartnerApprovalPage />} />
          <Route path="withdrawals" element={<WithdrawRequestsPage />} />
        </Route>

        {/* Partner Routes */}
        <Route path="/partner" element={<PartnerLayout />}>
          <Route index element={<Navigate to="/partner/bookings" replace />} />
          <Route path="bookings" element={<BookingManagementPage />} />
          <Route path="revenue" element={<RevenueManagementPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
