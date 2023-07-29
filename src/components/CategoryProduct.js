import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params?.slug]);
  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container mt-3">
        <h1 className="text-center">Category - {category?.name}</h1>
        <h1 className="text-center">{products?.length} result found</h1>
        <div className="row">
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/produuct-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ width: "90%", height: "50%", margin: "auto" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p className="card-text"> $ {p.price}</p>
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button className="btn btn-secondary ms-1">
                    Add to cart{" "}
                  </button>
                </div>
              </div>
            ))}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
