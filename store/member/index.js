import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllMemberByType } from "../../services/member.service";

const initialState = {
  members: [],
};

const MemberSlice = createSlice({
  name: "member",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllMembers.fulfilled, (state, action) => {
      state.members = action.payload;
    });
  },
});

export const getAllMembers = createAsyncThunk(
  "member/allMember",
  async ({ type, pageNumber, search }) => {
    const data = await getAllMemberByType(type, pageNumber, search);
    return data;
  }
);

export default MemberSlice.reducer;
