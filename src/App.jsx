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

  useEffect(() => {
    axios.get("/api/cart-items?expand=product").then((res) => {
      setCart(res.data);
    });
  }, []);

  return (
    <Routes>
      <Route
        path="*"
        element={<PageNotFound />}
      />
      <Route
        index
        element={<HomePage cart={cart} />}
      />
      <Route
        path="checkout"
        element={<CheckoutPage cart={cart} />}
      />
      <Route
        path="orders"
        element={<OrdersPage />}
      />
      <Route
        path="tracking"
        element={<TrackingPage />}
      />
    </Routes>
  );
}

export default App;
