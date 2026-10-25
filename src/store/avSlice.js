
import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "projector",
    name: "Projector",
    description:
      "HD presentation projector for meetings and conferences.",
    category: "Presentation",
    pricePerItem: 200,
    quantity: 0,
  },
  {
    id: "speaker",
    name: "Speaker",
    description:
      "Professional speaker suitable for presentations and small events.",
    category: "Audio",
    pricePerItem: 35,
    quantity: 0,
  },
  {
    id: "microphone",
    name: "Microphone",
    description:
      "Wireless microphone for speakers, presenters and Q&A sessions.",
    category: "Audio",
    pricePerItem: 45,
    quantity: 0,
  },
  {
    id: "whiteboard",
    name: "Whiteboard",
    description:
      "Portable whiteboard for workshops and collaborative sessions.",
    category: "Workshop",
    pricePerItem: 80,
    quantity: 0,
  },
  {
    id: "signage",
    name: "Event Signage",
    description:
      "Professional signage to help guests navigate your event.",
    category: "Branding",
    pricePerItem: 80,
    quantity: 0,
  },
];

const avSlice = createSlice({
  name: "av",

  initialState,

  reducers: {
    incrementAvQuantity: (state, action) => {
      const item = state.find(
        (equipment) => equipment.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },

    decrementAvQuantity: (state, action) => {
      const item = state.find(
        (equipment) => equipment.id === action.payload
      );

      if (item && item.quantity > 0) {
        item.quantity -= 1;
      }
    },

    loadEquipment: (state, action) => {
      state.forEach((equipment) => {
        const savedEquipment = action.payload.find(
          (item) => item.id === equipment.id
        );

        equipment.quantity = savedEquipment
          ? savedEquipment.quantity
          : 0;
      });
    },

    resetEquipment: (state) => {
      state.forEach((equipment) => {
        equipment.quantity = 0;
      });
    },
  },
});

export const {
  incrementAvQuantity,
  decrementAvQuantity,
  loadEquipment,
  resetEquipment,
} = avSlice.actions;

export default avSlice.reducer;

