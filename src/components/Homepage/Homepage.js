import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Prices";
import { useCart } from "../context/cart";
import "./homepage.css";
import ImageCarousel from "./ImageCarousel";
function Homepage() {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const navigate = useNavigate();
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //get filter product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };


  const images = [
    'https://buysellgraphic.com/images/graphic_preview/thumb/ecommerce_website_banner_template_customers_sketch_flat_design_55246.jpg',
    'https://www.shutterstock.com/image-vector/ecommerce-website-banner-template-presents-260nw-2252124451.jpg',
    'https://t4.ftcdn.net/jpg/05/00/17/35/360_F_500173589_ApB8UyyuS13bnTEGeWRiXXH1uruZhrRQ.jpg',
    'https://www.bestdigitalsales.com/wp-content/uploads/2015/12/ecommerce-banner.jpg',
  ];
  return (
    <div>
      <div>
      <ImageCarousel images={images} />
      </div>

      {/* <div className="row" style={{display:'flex',justifyContent:'space-evenly'}}> */}
      <div className="producttt">
        <div className="leftpart" >
        <div>
          <div  style={{ fontWeight: "bold" }}>
            Filter by Categories
          </div>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          </div>

          {/* //price filter */}
       <div>
          <div style={{ fontWeight: "bold" }}>
            Filter by Price
          </div>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
              style={{ marginTop:'1%'}}
            >
              RESET FILTERS
            </button>
          </div>
          </div>

        </div>
        <div className="rightpart">
          {/* {JSON.stringify(radio, null, 4)};{JSON.stringify(checked, null, 4)}; */}
          {/* <h1 className="text-center">All Product</h1> */}
          <div className="ayush">
            {products?.map((p) => (
              <div className="card " style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/produuct-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
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
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("item added to cart");
                    }}
                  >
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
}

export default Homepage;
