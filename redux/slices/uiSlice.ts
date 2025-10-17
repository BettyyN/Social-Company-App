import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  activeSection: "general" | "posts" | "groups" | "create-group" | null;
}

const initialState: UIState = {
  activeSection: "general",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveSection: (
      state,
      action: PayloadAction<UIState["activeSection"]>
    ) => {
      state.activeSection = action.payload;
    },
  },
});

export const { setActiveSection } = uiSlice.actions;
export default uiSlice.reducer;
