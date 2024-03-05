// slices/themeSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NoteState {
  state: boolean;
  isEditValue: any;
  isDeletedReminder: boolean;
}

const initialState: NoteState = {
  state: false,
  isEditValue: null,
  isDeletedReminder: false,
};

export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    toggleState: (state, action: PayloadAction<boolean>) => {
      state.state = action.payload;
    },
    setIsEditValue: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        isEditValue: action.payload,
      };
    },
    setIsDeletedReminder: (state, action: PayloadAction<boolean>) => {
      state.state = action.payload;
    },
  },
});

export const { toggleState, setIsEditValue, setIsDeletedReminder } =
  stateSlice.actions;
export default stateSlice.reducer;
