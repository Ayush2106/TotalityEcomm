import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "./context/cart";
const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product.......
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {/* <h1>ProductDetails</h1> */}
      {/* {JSON.stringify(product, null, 4)}; */}
      <div className="row container">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/produuct-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300px"
            width={"100px"}
          />
        </div>
        <div className="col-md-6">
          <h1>Product Details</h1>
          <h5>Name:{product.name}</h5>
          <h5>Description:{product.description}</h5>
          <h5>Price:{product.price}</h5>
          <h5>Category:{product?.category?.name}</h5>
          <button className="btn btn-secondary ms-1">Add to cart </button>
        </div>
      </div>
      <div className="row container">
        <h1>Similar Product</h1>
        {/* {JSON.stringify(relatedProducts, null, 4)} */}
        {relatedProducts.length < 1 && (
          <p className="text-center">NO SIMILAR PRODUCT FOUND </p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/produuct-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
                style={{ width: "100%", height: "50%", margin: "auto" }}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description}</p>
                <p className="card-text"> $ {p.price}</p>
                <button
                  className="btn btn-secondary ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("item added to cart");
                  }}
                >
                  Add to cart{" "}
                </button>{" "}
              </div>
            </div>
          ))}{" "}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
