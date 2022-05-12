import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    number: "4485318303851721",
    month: "11",
    year: "24",
    name: "Jake Michael",
    cvv: "499",
  },
  {
    id: "2",
    number: "4485318303851733",
    month: "10",
    year: "23",
    name: "Amanda Smith",
    cvv: "349",
  },
];

const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    addCardInfo(state, action) {
      console.log(state);
      console.log(action);
      state.push(action.payload);
      console.log(state.payments);
    },
  },
});

export const { addCardInfo } = paymentsSlice.actions;
export default paymentsSlice.reducer;
