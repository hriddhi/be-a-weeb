import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { clearItemFromCart, addItemToCart, removeItemFromCart } =
    useContext(CartContext);

  const clearCartItemHandler = () => clearItemFromCart(cartItem);
  const addCartItemHandler = () => addItemToCart(cartItem);
  const removeCartItemHandler = () => removeItemFromCart(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeCartItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addCartItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">${price}</span>
      <div className="remove-button" onClick={clearCartItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
