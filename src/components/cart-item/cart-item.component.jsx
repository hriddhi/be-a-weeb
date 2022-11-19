import "./cart-item.styles.scss";

const cartItems = ({ cartItems }) => {
  const { name, imageUrl, price, quantity } = cartItems;

  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={name}/>
      <div className="item-details">
        <span>{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};

export default cartItems;
