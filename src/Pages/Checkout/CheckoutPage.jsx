import axios from "axios";
import CheckoutHeader from "./CheckoutHeader";
import "./CheckoutPage.css";
import { useEffect, useState } from "react";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";

const CheckoutPage = ({ cart }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((res) => {
        setDeliveryOptions(res.data);
      });

    axios.get("/api/payment-summary").then((res) => {
      setPaymentSummary(res.data);
    });
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
          />

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
