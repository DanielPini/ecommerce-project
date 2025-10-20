import { useParams } from "react-router";
import Header from "../../Components/Header/Header";
import "./TrackingPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import TrackingItem from "./TrackingItem";

const TrackingPage = ({ cart }) => {
  const [order, setOrder] = useState(null);
  const { orderId, productId } = useParams();
  useEffect(() => {
    const fetchTrackingData = async () => {
      const res = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(res.data);
    };
    fetchTrackingData();
  }, [orderId]);

  let item = null;

  if (order) {
    item = order.products.find(
      (orderItem) => orderItem.productId === productId
    );
  }

  return (
    <>
      <title>Tracking</title>
      <link
        rel="icon"
        type="image/svg-xml"
        href="tracking-favicon.png"
      />
      <Header cart={cart} />
      <div className="tracking-page">
        <div className="order-tracking">
          <a
            className="back-to-orders-link link-primary"
            href="/orders">
            View all orders
          </a>

          {item && (
            <TrackingItem
              item={item}
              order={order}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TrackingPage;
