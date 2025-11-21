import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for entire cart
  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => {
        const unitPrice = parseFloat(item.cost.substring(1)); // "$15" → 15
        return total + unitPrice * item.qty;
      }, 0)
      .toFixed(2);
  };

  // Calculate subtotal per item
  const calculateTotalCost = (item) => {
    const unitPrice = parseFloat(item.cost.substring(1));
    return (unitPrice * item.qty).toFixed(2);
  };

  // Continue shopping handler
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  // ✔ Requirement: Use addItem() to increase quantity
  const handleIncrement = (item) => {
    dispatch(addItem({ ...item })); // addItem auto-increments qty
  };

  // ✔ Requirement: Use updateQuantity() to decrease quantity
  // ✔ Remove if qty goes to 0
  const handleDecrement = (item) => {
    if (item.qty > 1) {
      dispatch(updateQuantity({ name: item.name, qty: item.qty - 1 }));
    } else {
      dispatch(removeItem({ name: item.name, category: item.category }));
    }
  };

  // ✔ Requirement: Use removeItem() to delete from cart
  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name, category: item.category }));
  };

  // Checkout placeholder
  const handleCheckoutShopping = () => {
    alert("Checkout functionality will be added later!");
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>

      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />

            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>

              <div className="cart-item-quantity">
                {/* Decrease */}
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>

                {/* Quantity display */}
                <span className="cart-item-quantity-value">{item.qty}</span>

                {/* Increase */}
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>

              {/* Delete item */}
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Buttons */}
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>

        <br />

        <button
          className="get-started-button1"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
