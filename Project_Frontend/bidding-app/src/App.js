import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import HeroSection from "./component/HeroSection";
import AboutUs from "./page/AboutUs";
import Footer from "./component/Footer";
import Login from "./page/Login";
import Navbar from "./component/Navbar";
import SignUp from "./page/SignUp";
import ProductList1 from "./page/ProductList1";
import AddProductByAdmin from "./page/AddProductByAdmin";
import SelectedProduct from "./page/SelectedProduct";
import Cart from "./page/Cart";
import Dashboard from "./page/Dashboard";
import Address from "./page/Address";
import ContactUs from "./page/ContactUs";
import Protected from "./page/Protected";
import AdminDashboard from "./page/AdminDashboard";
import UpdateProfile from "./page/UpdateProfile";
import GetAllCustomers from "./page/GetAllCustomers";
function App() {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const location = useLocation();

  return (
    <>
      {!isLoginPage && location.pathname !== "/signup" && (
        <Navbar loginData={isLoginPage} />
      )}
      <Routes>
      
        <Route path="/" element={< Protected Component={HeroSection} />} />
        
        <Route
          exact path="/login"
          element={<Login setIsLoginPage={setIsLoginPage} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<Protected Component={AboutUs} />} />
        <Route path="/products" element={< Protected Component={ProductList1} />} />
        <Route path="/addProduct" element={<AddProductByAdmin />} />
        <Route path={"/selectedProduct/:productId"} element={<SelectedProduct />} />
        <Route path={"/cart"} element={<Cart />} />
        <Route path="/dashBoard" element={<Protected Component={Dashboard} />} />
        <Route path={"/address"} element={<Protected Component={Address} />} />
        <Route  path={'/contact'}element={<Protected Component={ContactUs}/>}/>
        {/* <Route   path='/admin'    element={<Protected Component= {AdminDashboard}/>}/> */}
        <Route path={'/admin'} element={<AdminDashboard/>}/>
        <Route path={'/update'} element={<UpdateProfile/>}/>
        <Route path={'/getCustomers'} element={<GetAllCustomers/>}/>
      </Routes>
      {!isLoginPage && <Footer />}
    </>
  );
}

export default App;