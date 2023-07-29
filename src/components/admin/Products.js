import React, { useEffect, useState } from "react";
import AdminMenu from "../AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../Homepage/homepage.css";
const Products = () => {
  const [products, setProducts] = useState([]);

  ///get all product..........
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  //lifecycle method..
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div title="category">
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="ayush">
              {products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="product-link"
                >
                  <div
                    className="card m-2"
                    style={{ width: "18rem" }}
                    key={p._id}
                  >
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/produuct-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      style={{ width: "100%", height: "50%", margin: "auto" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
