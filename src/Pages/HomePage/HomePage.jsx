import axios from "axios";
import Header from "../../Components/Header/Header";
import "./HomePage.css";
import { useEffect, useState } from "react";
import ProductsGrid from "./ProductsGrid";
import { useSearchParams } from "react-router";

const HomePage = ({ cart, loadCart }) => {
  const [products, setProducts] = useState([]);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    try {
      const getHomeData = async () => {
        if (search) {
          const res = await axios.get(`/api/products?search=${search}`);
          setProducts(res.data);
        } else {
          const res = await axios.get("/api/products");
          setProducts(res.data);
        }
      };
      getHomeData();
    } catch (err) {
      console.error("Could not fetch home data:", err);
    }
  }, [search]);

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
