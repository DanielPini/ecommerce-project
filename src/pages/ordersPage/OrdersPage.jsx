import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import "./OrdersPage.css";
import axios from "axios";
import OrdersGrid from "./OrdersGrid";

const OrdersPage = ({ cart, loadCart }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const fetchOrders = async () => {
        const res = await axios.get("/api/orders?expand=products");
        setOrders(res.data);
      };
      fetchOrders();
    } catch (err) {
      console.error("Could not fetch orders:", err);
    }
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

        <OrdersGrid
          orders={orders}
          loadCart={loadCart}
        />
      </div>
    </>
  );
};

export default OrdersPage;
