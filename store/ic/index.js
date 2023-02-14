import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllIcByType } from "../../services/ic.service";

const initialState = {
  Ic: [],
};

const ICSlice = createSlice({
  name: "ic",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllIc.fulfilled, (state, action) => {
      state.Ic = action.payload;
    });
  },
});


export const getAllIc = createAsyncThunk("ic/allIc", async({type,pageNumber,search}) => {
  
    const data = await getAllIcByType(type,pageNumber,search);
    return data
})



export default ICSlice.reducer;
