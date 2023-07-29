import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import PageNotFound from "./components/Page Not Found/PageNotFound";
// import Footer from "./components/Footer/Footer";
import About from "./components/AboutContactPolicy/About";
import Contact from "./components/AboutContactPolicy/Contact";
import Policy from "./components/AboutContactPolicy/Policy";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forgotpassword from "./components/ForgotPassword/Forgotpassword";
import Dashboard from "./components/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminRoute from "./components/Routes/AdminRoute";
import Order from "./components/user/Order";
import Profile from "./components/user/Profile";
import CreateCategory from "./components/admin/CreateCategory";
import AdminOrders from "./components/admin/AdminOrders";
import Products from "./components/admin/Products";
import CreateProduct from "./components/admin/CreateProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
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
          <Route path="user/orders" element={<Order />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />

          <Route path="admin/products" element={<Products />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/policy" element={<Policy />}></Route>
        <Route path="/forgotPassword" element={<Forgotpassword />}></Route>
      </Routes>
      <ToastContainer />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
