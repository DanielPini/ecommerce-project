import logoWhite from "../../assets/images/logo-white.png";
import mobileLogoWhite from "../../assets/images/mobile-logo-white.png";
import searchIcon from "../../assets/images/icons/search-icon.png";
import cartIcon from "../../assets/images/icons/cart-icon.png";
import { NavLink, useNavigate, useSearchParams } from "react-router";
import "./Header.css";
import { useEffect, useState } from "react";

const Header = ({ cart }) => {
  const [searchText, setSearchText] = useState("");

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    setSearchText(search ?? "");
  }, [search]);

  const navigate = useNavigate();

  const submitSearch = (event) => {
    console.log(`Search (${event}):`, searchText);
    setSearchText("");
    navigate(`/?search=${searchText}`);
  };

  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
  return (
    <div className="header">
      <div className="left-section">
        <NavLink
          to="/"
          className="header-link">
          <img
            className="logo"
            src={logoWhite}
          />
          <img
            className="mobile-logo"
            src={mobileLogoWhite}
          />
        </NavLink>
      </div>
      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitSearch("Enter");
            } else if (e.key === "Escape") {
              setSearchText("");
            }
          }}
        />

        <button
          className="search-button"
          onClick={() => submitSearch("Click")}>
          <img
            className="search-icon"
            src={searchIcon}
          />
        </button>
      </div>

      <div className="right-section">
        <NavLink
          className="orders-link header-link"
          to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink
          className="cart-link header-link"
          to="/checkout">
          <img
            className="cart-icon"
            src={cartIcon}
          />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
