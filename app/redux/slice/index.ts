// slices/themeSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NoteState {
  state: boolean;
}

const initialState: NoteState = {
  state: false,
};

export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    toggleState: (state, action: PayloadAction<boolean>) => {
      state.state = action.payload;
    },
  },
});

export const { toggleState } = stateSlice.actions;
export default stateSlice.reducer;
