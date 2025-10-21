import axios from "axios";
import Header from "../../Components/Header/Header";
import "./HomePage.css";
import { useEffect, useState } from "react";
import ProductsGrid from "./ProductsGrid";

const HomePage = ({ cart, loadCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      const getHomeData = async () => {
        const res = await axios.get("/api/products");
        setProducts(res.data);
      };
      getHomeData();
    } catch (err) {
      console.error("Could not fetch home data:", err);
    }
  }, []);

  return (
    <>
      <title>Ecommerce Project</title>
      <link
        rel="icon"
        type="image/svg-xml"
        href="home-favicon.png"
      />
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid
          products={products}
          loadCart={loadCart}
        />
      </div>
    </>
  );
};
export default HomePage;
