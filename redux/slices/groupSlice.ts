import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGroupApi} from "../api/groupApi";

export const fetchGroups = createAsyncThunk("group/fetchGroups" , async () => { return await fetchGroupApi();});

const groupSlice = createSlice({
    name: "groups",
    initialState: {
        items: [], 
        loading: false},
        reducers: {},
        extraReducers: (builder)=> {
            builder
            .addCase(fetchGroups.pending, (state) => {state.loading = true;})
            .addCase(fetchGroups.rejected, (state) => {state.loading = false; });
        }
});
export default groupSlice.reducer;