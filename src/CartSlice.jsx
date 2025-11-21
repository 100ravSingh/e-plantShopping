import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    // Add a new item or increase quantity if it already exists
    addItem: (state, action) => {
      const item = action.payload;

      const existing = state.items.find(
        (i) => i.name === item.name && i.category === item.category
      );

      if (existing) {
        existing.qty = (existing.qty || 1) + 1;
      } else {
        state.items.push({ ...item, qty: 1 });
      }
    },

    // Remove item fully from cart
    removeItem: (state, action) => {
      const { name, category } = action.payload;

      state.items = state.items.filter(
        (item) => !(item.name === name && item.category === category)
      );
    },

    // Update quantity to any given number
    updateQuantity: (state, action) => {
      const { name, qty } = action.payload;  // extract name + amount

      const existing = state.items.find(      // find matching item
        (item) => item.name === name
      );

      if (existing) {
        existing.qty = qty;                  // update quantity
      }
    },

    // Optional: increase quantity by 1
    increaseQty: (state, action) => {
      const { name, category } = action.payload;

      const existing = state.items.find(
        (i) => i.name === name && i.category === category
      );

      if (existing) {
        existing.qty += 1;
      }
    },

    // Optional: decrease quantity by 1
    decreaseQty: (state, action) => {
      const { name, category } = action.payload;

      const existingIdx = state.items.findIndex(
        (i) => i.name === name && i.category === category
      );

      if (existingIdx !== -1) {
        state.items[existingIdx].qty -= 1;

        if (state.items[existingIdx].qty <= 0) {
          state.items.splice(existingIdx, 1);
        }
      }
    },

    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  increaseQty,
  decreaseQty,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
