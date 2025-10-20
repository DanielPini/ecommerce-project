import { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import "./OrdersPage.css";
import axios from "axios";
import OrdersGrid from "./OrdersGrid";

const OrdersPage = ({ cart }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get("/api/orders?expand=products");
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  return (
    <>
      <title>Orders</title>
      <link
        rel="icon"
        type="image/png"
        href="orders-favicon.png"
      />
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} />
      </div>
    </>
  );
};

export default OrdersPage;
