import axios from "axios";
import CheckoutHeader from "./CheckoutHeader";
import "./CheckoutPage.css";
import { useEffect, useState } from "react";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";

const CheckoutPage = ({ cart, loadCart }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    try {
      const getPaymentSummary = async () => {
        const res = await axios.get("/api/payment-summary");
        setPaymentSummary(res.data);
      };
      getPaymentSummary();
    } catch (err) {
      console.error("Could not fetch payment summary:", err);
    }
  }, [cart]);

  useEffect(() => {
    try {
      const getDeliveryData = async () => {
        const res = await axios.get(
          "/api/delivery-options?expand=estimatedDeliveryTime"
        );
        setDeliveryOptions(res.data);
      };
      getDeliveryData();
    } catch (err) {
      console.error("Could not fetch delivery data:", err);
    }
  }, []);

  return (
    <>
      <title>Checkout</title>
      <link
        rel="icon"
        type="image/svg-xml"
        href="cart-favicon.png"
      />

      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
          />

          <PaymentSummary
            paymentSummary={paymentSummary}
            loadCart={loadCart}
          />
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
