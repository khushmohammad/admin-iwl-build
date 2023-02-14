import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserData, updateUserData } from "../../services/user.service";

import blankimage from "../../public/assets/images/black_user.png";

import coverPic from "../../public/assets/images/page-img/profile-bg1.jpg";

const initialState = {
  data: null,
  profile_picture: blankimage,
  cover_picture: coverPic,
};

const ProfileSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfilePic: (state, action) => {
      state.profile_picture = action.payload;
    },
    updateCoverPic: (state, action) => {
      state.cover_picture = action.payload;
    },
  },
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

export const { updateProfilePic, updateCoverPic } = ProfileSlice.actions;
export default ProfileSlice.reducer;
