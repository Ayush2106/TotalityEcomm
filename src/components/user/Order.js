import React, { useState, useEffect } from "react";
import UserMenu from "../UserMenu";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../context/auth";
const Order = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);

  //getorder
  const getOrder = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrder();
  }, [auth?.token]);
  return (
    <div title={"Order"}>
      <div className="container-flui m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h1>All Orders</h1>
              {/* <p>{JSON.stringify(orders, null, 4)}</p> */}
              {orders?.map((o, i) => {
                return (
                  <div className="border-shadow">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyes</th>
                          <th scope="col">Order Date</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createAt).fromNow()}</td>
                          <td>{o?.payment.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
                      {o?.products?.map((p, i) => (
                        <div
                          className="row mb-2 p-3 card flex-row "
                          key={p._id}
                        >
                          <div className="col-md-4">
                            <img
                              src={`${process.env.REACT_APP_API}/api/v1/product/produuct-photo/${p._id}`}
                              className="card-img-top"
                              alt={p.name}
                              width="100px"
                              height={"100px"}
                            />
                          </div>
                          <div className="col-md-8">
                            <h4>{p.name}</h4>
                            <h5>{p.description.substring(0, 30)}</h5>
                            <p>Price:{p.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
