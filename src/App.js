import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import PageNotFound from "./components/Page Not Found/PageNotFound";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forgotpassword from "./components/ForgotPassword/Forgotpassword";
import Dashboard from "./components/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";

import Profile from "./components/user/Profile";

import Search from "./components/Search";
import ProductDetails from "./components/ProductDetails";
import Categories from "./components/Categories";
import CategoryProduct from "./components/CategoryProduct";
import CartPage from "./components/CartPage";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
      
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
    
        <Route path="/forgotPassword" element={<Forgotpassword />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
