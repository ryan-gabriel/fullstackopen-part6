import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    updateNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return "";
    },
  },
});

export const setNotification = (message, seconds = 5) => {
  return (dispatch) => {
    dispatch(updateNotification (message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
  };
};

export const { updateNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
