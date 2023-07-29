import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../context/cart";
import { Badge } from "antd";
import "./navbar.css";
function ColorSchemesExample() {
  const [cart] = useCart();
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <nav>
        <div className="nav1">
          <Link className="nav-link" to="/">
            🛒 Ecommerce App
          </Link>
        </div>
        {/* # responsive navabar */}
        <div className="navresp">
          <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            🛒
          </Link>
          <ul className="dropdown-menu">
            {!auth?.user ? (
              <>
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  className="nav-link"
                  role="button"
                  style={{ border: "none" }}
                >
                  {auth?.user?.name}
                </NavLink>
                <NavLink
                  className="nav-link"
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  className="nav-link"
                  onClick={handleLogout}
                  to="/login"
                >
                  Logout
                </NavLink>
              </>
            )}
            <Badge count={cart?.length} showZero>
              <NavLink
                className="nav-link"
                to="/cart"
                style={{ paddingTop: "5px" }}
              >
                Cart {cart?.length};
              </NavLink>
            </Badge>
          </ul>
        </div>
        {/* laptop version navbar */}
        <div className="nav2">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          <Link
            className="nav-link dropdown-toggle"
            to={"/categories"}
            data-bs-toggle="dropdown"
          >
            Categories
          </Link>
          <ul className="dropdown-menu">
            <Link className="dropdown-item" to={"/categories"}>
              All Categories
            </Link>
            {categories.map((c) => (
              <Link className="dropdown-item" to={`/category/${c.slug}`}>
                {c.name}
              </Link>
            ))}
          </ul>
          {!auth?.user ? (
            <>
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                className="nav-link"
                role="button"
                style={{ border: "none" }}
              >
                {auth?.user?.name}
              </NavLink>
              <NavLink
                className="nav-link"
                to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
              >
                Dashboard
              </NavLink>
              <NavLink className="nav-link" onClick={handleLogout} to="/login">
                Logout
              </NavLink>
            </>
          )}
          <Badge count={cart?.length} showZero>
            <NavLink
              className="nav-link"
              to="/cart"
              style={{ paddingTop: "5px" }}
            >
              Cart {cart?.length};
            </NavLink>
          </Badge>
        </div>
      </nav>
      <br />
    </>
  );
}

export default ColorSchemesExample;
