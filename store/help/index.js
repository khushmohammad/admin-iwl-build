import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHelpService } from "../../services/help.service";

const initialState = {
  category: [],
};

const HelpSlice = createSlice({
  name: "help",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getHelpCategory.fulfilled, (state, action) => {
      state.category = action.payload;
    });
  },
});

export const getHelpCategory = createAsyncThunk(
  "help/category",
  async (helpId) => {
    const data = await getHelpService(helpId);
    return data;
  }
);

export default HelpSlice.reducer;
