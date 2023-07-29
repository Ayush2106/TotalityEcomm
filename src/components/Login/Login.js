import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import "./login.css";

function Login() {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email address"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <input
            type="password"
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div style={{ flexDirection: "column", display: "flex" }}>
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginBottom: "15px" }}
            onClick={() => {
              navigate("/forgotPassword");
            }}
          >
            Forgot Password
          </button>

          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
