
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedVenueId: null,
};

const venueSlice = createSlice({
  name: "venue",

  initialState,

  reducers: {
    selectVenue: (state, action) => {
      state.selectedVenueId = action.payload;
    },

    loadVenue: (state, action) => {
      state.selectedVenueId = action.payload || null;
    },

    clearVenue: (state) => {
      state.selectedVenueId = null;
    },
  },
});

export const {
  selectVenue,
  loadVenue,
  clearVenue,
} = venueSlice.actions;

export default venueSlice.reducer;

