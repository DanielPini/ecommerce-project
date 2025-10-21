import axios from "axios";
import formatMoney from "../../utils/money";
import { useState } from "react";

const CartItemDetails = ({ cartItem, loadCart }) => {
  const [quantity, setQuantity] = useState(Number(cartItem.quantity));
  const [isUpdating, setIsUpdating] = useState(false);

  const deleteCartItem = async () => {
    try {
      await axios.delete(`/api/cart-items/${cartItem.productId}`);
      await loadCart();
    } catch (err) {
      console.error("Delete cart item failed:", err);
    }
  };

  let quantityBoxStyle = {
    display: isUpdating ? "inline-block" : "none",
    width: "20px",
    margin: "0 5px",
  };

  const updateCartItem = async () => {
    if (!isUpdating) {
      setIsUpdating(true);
    }
    if (isUpdating) {
      const newQty = Number(quantity);
      if (!Number.isInteger(newQty) || newQty < 1) return;
      try {
        await axios.put(`/api/cart-items/${cartItem.productId}`, {
          quantity: newQty,
        });
        await loadCart();
      } catch (err) {
        console.error("Update cart item failed:", err);
      }
      setIsUpdating(false);
    }
  };

  return (
    <>
      <img
        className="product-image"
        src={cartItem.product.image}
      />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            <input
              value={quantity}
              min="1"
              type="text"
              onChange={(e) => setQuantity(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateCartItem();
                } else if (e.key === "Escape") {
                  setQuantity(cartItem.quantity);
                  setIsUpdating(false);
                }
              }}
              style={quantityBoxStyle}
            />
            <span className="quantity-label">{cartItem.quantity}</span>
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={updateCartItem}>
            {isUpdating ? "Confirm" : "Update"}
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div>
    </>
  );
};

export default CartItemDetails;
