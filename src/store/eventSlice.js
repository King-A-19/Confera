
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  date: "",
  attendees: "",
  type: "",
};

const eventSlice = createSlice({
  name: "event",

  initialState,

  reducers: {
    setEventName: (state, action) => {
      state.name = action.payload;
    },

    setEventDate: (state, action) => {
      state.date = action.payload;
    },

    setAttendees: (state, action) => {
      state.attendees = action.payload;
    },

    setEventType: (state, action) => {
      state.type = action.payload;
    },

    loadEvent: (state, action) => {
      state.name = action.payload.name || "";
      state.date = action.payload.date || "";
      state.attendees = action.payload.attendees || "";
      state.type = action.payload.type || "";
    },

    resetEvent: () => initialState,
  },
});

export const {
  setEventName,
  setEventDate,
  setAttendees,
  setEventType,
  loadEvent,
  resetEvent,
} = eventSlice.actions;

export default eventSlice.reducer;
