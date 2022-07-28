import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotFound from "./components/NotFound";
import Login from "./pages/login/Login";
import Home from "./pages/home/home";
import Medicine from "./pages/medicine/Medicine";
import UserPage from "./pages/user/UserPage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MedicineDetails from "../src/pages/MedicineDetails/MedicineDetails";
import AboutUs from "./pages/aboutus/AboutUs";
import ContactUS from "./pages/contactus/ContactUS";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact element={<ProtectedRoutes />}>
          <Route exact path="/userPage" element={<UserPage />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
