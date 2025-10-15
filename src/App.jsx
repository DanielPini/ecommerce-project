import { Route, Routes } from "react-router";
import HomePage from "./Components/Pages/HomePage/HomePage";
import CheckoutPage from "./Components/Pages/Checkout/CheckoutPage";
import TrackingPage from "./Components/Pages/TrackingPage/TrackingPage";
import OrdersPage from "./Components/Pages/OrdersPage/OrdersPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route
        index
        element={<HomePage />}
      />
      <Route
        path="checkout"
        element={<CheckoutPage />}
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
