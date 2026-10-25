
import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "breakfast",
    name: "Breakfast",
    description: "A fresh morning selection to start the day.",
    pricePerPerson: 50,
    selected: false,
  },
  {
    id: "high-tea",
    name: "High Tea",
    description:
      "Light pastries, snacks and refreshments for a relaxed break.",
    pricePerPerson: 25,
    selected: false,
  },
  {
    id: "lunch",
    name: "Lunch",
    description:
      "A satisfying midday menu designed for conference guests.",
    pricePerPerson: 65,
    selected: false,
  },
  {
    id: "dinner",
    name: "Dinner",
    description:
      "A premium evening meal for your guests.",
    pricePerPerson: 70,
    selected: false,
  },
];

const mealsSlice = createSlice({
  name: "meals",

  initialState,

  reducers: {
    toggleMealSelection: (state, action) => {
      const meal = state.find(
        (item) => item.id === action.payload
      );

      if (meal) {
        meal.selected = !meal.selected;
      }
    },

    loadMeals: (state, action) => {
      state.forEach((meal) => {
        meal.selected = action.payload.some(
          (savedMeal) => savedMeal.id === meal.id
        );
      });
    },

    clearMeals: (state) => {
      state.forEach((meal) => {
        meal.selected = false;
      });
    },
  },
});

export const {
  toggleMealSelection,
  loadMeals,
  clearMeals,
} = mealsSlice.actions;

export default mealsSlice.reducer;

