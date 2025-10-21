import { Route, Routes } from "react-router";
import HomePage from "./Pages/HomePage/HomePage";
import CheckoutPage from "./Pages/Checkout/CheckoutPage";
import TrackingPage from "./Pages/TrackingPage/TrackingPage";
import OrdersPage from "./Pages/OrdersPage/OrdersPage";
import PageNotFound from "./Pages/pageNotFound/pageNotFound";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const res = await axios.get("/api/cart-items?expand=product");
    setCart(res.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Routes>
      <Route
        path="*"
        element={<PageNotFound cart={cart} />}
      />
      <Route
        index
        element={
          <HomePage
            cart={cart}
            loadCart={loadCart}
          />
        }
      />
      <Route
        path="checkout"
        element={
          <CheckoutPage
            cart={cart}
            loadCart={loadCart}
          />
        }
      />
      <Route
        path="orders"
        element={
          <OrdersPage
            cart={cart}
            loadCart={loadCart}
          />
        }
      />
      <Route
        path="tracking/:orderId/:productId"
        element={<TrackingPage cart={cart} />}
      />
    </Routes>
  );
}

export default App;
