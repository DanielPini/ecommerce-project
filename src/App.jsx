import { Route, Routes } from "react-router";
import HomePage from "./Pages/HomePage/HomePage";
import CheckoutPage from "./Pages/Checkout/CheckoutPage";
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
    </Routes>
  );
}

export default App;
