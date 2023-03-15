import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCategoryData } from "../../services/resource.service";

const initialState = {
  category: [],
};

const ResourceSlice = createSlice({
  name: "resource",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getResourceCategory.fulfilled, (state, action) => {
      state.category = action.payload;
    });
  },
});

export const getResourceCategory = createAsyncThunk(
  "resource/category",
  async () => {
    const data = await getAllCategoryData();
    return data;
  }
);

export default ResourceSlice.reducer;
