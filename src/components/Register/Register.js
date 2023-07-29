import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [phone, SetPhone] = useState("");
  const [address, SetAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
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
            type="name"
            value={name}
            onChange={(e) => SetName(e.target.value)}
            className="form-control"
            id="name"
            placeholder="Enter Your Name"
          />
        </div>
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
        <div className="mb-3">
          <input
            type="phone"
            value={phone}
            onChange={(e) => SetPhone(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Your Phone No"
          />
        </div>
        <div className="mb-3">
          <input
            type="address"
            value={address}
            onChange={(e) => SetAddress(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Your Address"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="What is Your Favorite sports"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
