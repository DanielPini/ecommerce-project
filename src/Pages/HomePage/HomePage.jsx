import axios from "axios";
import Header from "../../Components/Header/Header";
import "./HomePage.css";
import { useEffect, useState } from "react";
import ProductsGrid from "./ProductsGrid";

const HomePage = ({ cart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      setProducts(res.data);
    });
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
        <ProductsGrid products={products} />
      </div>
    </>
  );
};
export default HomePage;
