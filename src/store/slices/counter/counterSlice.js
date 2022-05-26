import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Carts: [],
  numberCart: 0,
  menuSearched: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    add_cart: (state, action) => {
      let item = {
        id: action.payload.id,
        title: action.payload.title,
        image: action.payload.image,
        readyInMinutes: action.payload.readyInMinutes,
        summary: action.payload.summary,
        vegetarian: action.payload.vegetarian,
      };
      const inCart = state.Carts.find((meal) =>
        meal.id === item.id ? true : false
      );
      return {
        ...state,
        Carts: inCart
          ? state.Carts.map((meal) =>
              meal.id === item.id ? { ...meal, qty: meal.qty + 1 } : meal
            )
          : [...state.Carts, { ...item, qty: 1 }],
      };
    },
    remove_from_cart: (state, action) => {
      return {
        ...state,
        Carts: state.Carts.filter((dish) => dish.id !== action.payload),
      };
    },
    add_menuSearched: (state, action) => {
      state.menuSearched = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { add_cart, remove_from_cart, add_menuSearched } =
  counterSlice.actions;
