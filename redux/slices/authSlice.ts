// store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  roleId: number | null;
  isAdmin: boolean;
}

const initialState: AuthState = {
  roleId: null,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserRole: (state, action: PayloadAction<number | null>) => {
      state.roleId = action.payload;
      state.isAdmin = action.payload === 3;
    },
    clearUser: (state) => {
      state.roleId = null;
      state.isAdmin = false;
    },
  },
});

export const { setUserRole, clearUser } = authSlice.actions;
export default authSlice.reducer;
