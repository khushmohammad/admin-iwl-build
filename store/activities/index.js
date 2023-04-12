import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllActivitiesService,
  searchUserByNameService,
} from "../../services/activitylog.service";

const initialState = {
  activities: [],
};

const ActivitySlice = createSlice({
  name: "activities",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllActivies.fulfilled, (state, action) => {
      state.activities = action.payload;
    });
  },
});

export const getAllActivies = createAsyncThunk(
  "activities/byuUsername",
  async (username) => {
    const data = await getAllActivitiesService(username);
    return data;
  }
);

export default ActivitySlice.reducer;
