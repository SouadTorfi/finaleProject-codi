import React from "react";
import {Routes, Route } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import AboutUs from "./aboutus/AboutUs";
import UpdateAboutUs from "./aboutus/UpdateAboutUs";
import AddAdmin from "./admin/AddAdmin";
import Admin from "./admin/Admin";
import EditAdmin from "./admin/EditAdmin";
import Product from "./product/Product";
import User from "./user/User";
import Category from "./category/Category";
import AddCategory from "./category/AddCategory";
import EditCategory from "./category/EditCategory";


function DashboardApp() {
  return (
    <div>
      <Dashboard />
      <Routes>
          <Route exact path="/admins" element={<Admin/>} />
          <Route exact path="/addadmin" element={<AddAdmin/>} />
          <Route exact path="/editadmin/:id" element={<EditAdmin/>} />
          <Route exact path="/users" element={<User/>} />
          <Route exact path="/products" element={<Product/>} />
          <Route exact path="/aboutus" element={<AboutUs/>} />
          <Route exact path="/editaboutus/:id" element={<UpdateAboutUs/>} />
          <Route exact path="/category" element={<Category/>} />
          <Route exact path="/addcategory" element={<AddCategory/>} />
          <Route exact path="/editcategory/:id" element={<EditCategory/>} />
          
      </Routes>
    </div>
  );
}

export default DashboardApp;
