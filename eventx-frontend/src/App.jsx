import Header from "./components/DashboardScreen/header";
import ResponsiveDrawer from "./components/DashboardScreen/maindashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/DashboardScreen/dashboard";
import ManageEvents from "./components/manageEvents/manageevents";
import EventInfo from "./components/manageEvents/eventInfo";
import AllAttendees from "./components/Ateendes/AllAteendie";
import PerEvent from "./components/Ateendes/singleattendee";
import Booking from "./components/booking/booking";
import CreateEvent from "./components/manageEvents/createevent";
import Report from "./components/analytics/report";
// Auth imports
import { AuthProvider } from "./components/Auth/AuthContext";
import { NotificationProvider } from "./components/context/NotificationContext";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import LoginPage from "./components/Auth/LoginPage";
import RegisterPage from "./components/Auth/RegisterPage";
import MyTickets from "./components/booking/mytickets";
import AdminTicketsPage from "./components/booking/Adminbooking";
import SingleTicketPage from "./components/booking/SingleTicketPage";
import UserResponsiveDrawer from "./components/usercomponents/usersidebar";
import ManageUsers from "./components/manageUsers/manageusers";
import Settings from "./components/setting/setting";
// New component imports
import ContactSupport from "./components/support/ContactSupport";
import Notifications from "./components/notifications/Notifications";
import Marketing from "./components/marketing/Marketing";
import EventCategories from "./components/categories/EventCategories";

function App() {
  
  return (
    <div>
  
      <BrowserRouter>
        <AuthProvider>
          <NotificationProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected Routes (require login) */}
              <Route
                path="/"
                element={
                  <ProtectedRoute role="admin">
                    <ResponsiveDrawer />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="manage-events" element={<ManageEvents />} />
                <Route path="event-info/:eventId" element={<EventInfo />} />
                <Route path="insights" element={<AllAttendees />} />
                <Route path="per-event/:eventId" element={<PerEvent />} />
                <Route path="setting" element={<Settings/>} />
                <Route path="contact-support" element={<ContactSupport/>} />
                <Route path="notifications" element={<Notifications/>} />
                <Route path="marketing" element={<Marketing/>} />
                <Route path="event-categories" element={<EventCategories/>} />
                <Route path="booking-tickets" element={<AdminTicketsPage/>} />
                <Route path="create-event" element={<CreateEvent />} />
                <Route path="manage-users" element={<ManageUsers />} />
                <Route path="analytics" element={<Report />} />
            
                  {/* add more routes here */}
              </Route>
        
              <Route
                path="/"
                element={
                    <ProtectedRoute role="user">
                    <UserResponsiveDrawer />
                    </ProtectedRoute>
                  }
              >
        
                <Route path="tickets" element={<Booking />} /> 
                <Route path="mytickets" element={<MyTickets />} />
                <Route path="analytics" element={<Report />} />
                <Route path="ticket/:id" element={<SingleTicketPage />} />
                  {/* add more routes here */}
              </Route>
            </Routes>
          </NotificationProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
