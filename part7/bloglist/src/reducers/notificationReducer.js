import { createSlice } from "@reduxjs/toolkit";

const initialState = "";
let i;
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      console.log("shownotification payload: ", action.payload);
      const notification = action.payload;
      return (state = notification);
    },
    removeNotification(state, action) {
      return (state = initialState);
    },
  },
});
export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(showNotification(message));

    clearTimeout(i);
    i = setTimeout(() => {
      dispatch(removeNotification());
    }, time * 1000);
  };
};
export const { showNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
