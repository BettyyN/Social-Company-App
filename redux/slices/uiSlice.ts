import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  activeSection: "general" | "posts" | "groups" | "create-post" | "create-group" | null;
  isDrawerOpen: boolean;
}

const initialState: UIState = {
  activeSection: "general",
  isDrawerOpen: true, // Drawer starts open by default
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
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
});

export const { setActiveSection, toggleDrawer } = uiSlice.actions;
export default uiSlice.reducer;
