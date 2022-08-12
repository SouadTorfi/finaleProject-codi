import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotFound from "./components/NotFound";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Medicine from "./pages/medicine/Medicine";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MedicineDetails from "../src/pages/MedicineDetails/MedicineDetails";
import AboutUs from "./pages/aboutus/AboutUs";
import ContactUS from "./pages/contactus/ContactUS";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import UserProduct from "./pages/user/UserProduct";
import AddMedicine from "./pages/user/AddMedicine";
import EditMedicine from "./pages/user/EditMedicine";
import LoginAdmin from "./pages/dashboard/login/LoginAdmin";
import ProtectedRouteAdmin from "./pages/dashboard/ProtectedRouteAdmin";
import DashboardApp from "./pages/dashboard/DashboardApp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact element={<ProtectedRoutes />}>
          <Route exact path="/userproduct" element={<UserProduct />} />
          <Route exact path="/myprofile" element={<Profile />} />
          <Route path="/editprofile/:id" element={<EditProfile />} />
          <Route path="/addmedicine" element={<AddMedicine />} />
          <Route path="/editmedicine/:id" element={<EditMedicine />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route exact path="/*" element={<NotFound />} />
        <Route path="/header" element={<Header />} />
        <Route path="/footer" element={<Footer />} />
        <Route exact path="/medicine" element={<Medicine />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUS />} />
        <Route
          exact
          path="/medicinedetails/:id"
          element={<MedicineDetails />}
        />
         <Route path="/admin/login" element={<LoginAdmin />} />
    <Route exact element={<ProtectedRouteAdmin />}>
    <Route path="/dashboard/*" element={<DashboardApp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
