import { createReducer, createSlice } from "@reduxjs/toolkit";

const initialCartState = { cartItem: 0, showCart: false };
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    increment(state) {
      state.cartItem++;
    },
    decrement(state) {
      if (state.cartItem > 0) {
        state.cartItem--;
      }
    },
  },
});
