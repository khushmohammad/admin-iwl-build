import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserData, updateUserData } from "../../services/user.service";

const initialState = {
  data: null,
};

const ProfileSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const getUserDetails = createAsyncThunk("user/userdetails", async () => {
  const data = await getUserData();
  return data;
});

export const updateUserInfo = createAsyncThunk(
  "user/updateUser",
  async (data) => {
    await updateUserData(data);
  }
);

export default ProfileSlice.reducer;
