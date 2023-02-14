import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getGroupPosts,
  getAllGroups,
  getGroupByGroupId,
  getGroupPrivacy,
  inviteFriend,
  getPostByPostId,
  getInvitationList,
  invitationAcceptAndDelineService,
  groupJoinRequestList,
  groupJoinedList,
  groupMemberListService,
} from "../../services/groups.service";

const initialState = {
  allGroups: null,
  groupInfo: null,
  groupMember: [],
  invitedFriend: null,
  groupPrivacy: null,
  groupFeeds: null,
  postDetails: null,
  groupInvited: null,
  joinRequestList: [],
  joinedGroup: null,
  sentGroupJoinRequest: [],
};

const GroupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    allJoinRequestSent: (state, action) => {
      state.sentGroupJoinRequest = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllGroupsList.fulfilled, (state, action) => {
        state.allGroups = action.payload;
      })
      .addCase(getGroupByID.fulfilled, (state, action) => {
        state.groupInfo = action.payload;
      })
      .addCase(inviteFriendsOnGroup.fulfilled, (state, action) => {
        state.invitedFriend = action.payload;
      })
      .addCase(getGroupPrivacyKeys.fulfilled, (state, action) => {
        state.groupPrivacy = action.payload;
      })
      .addCase(getGroupFeeds.fulfilled, (state, action) => {
        state.groupFeeds = action.payload;
      })
      .addCase(getPostDetails.fulfilled, (state, action) => {
        state.postDetails = action.payload;
      })
      .addCase(groupInvitationList.fulfilled, (state, action) => {
        state.groupInvited = action.payload;
      })
      .addCase(groupJoinRequestLists.fulfilled, (state, action) => {
        state.joinRequestList = action.payload;
      })
      .addCase(allJoinedGroupList.fulfilled, (state, action) => {
        state.joinedGroup = action.payload;
      })
      .addCase(groupMemberList.fulfilled, (state, action) => {
        state.groupMember = action.payload;
      });
  },
});

export const getAllGroupsList = createAsyncThunk(
  "groups/allGroups",
  async (page) => {
    const data = await getAllGroups(page);
    return data;
  }
);

export const inviteFriendsOnGroup = createAsyncThunk(
  "grouips/inviteFriend",
  async ({ memberId, groupId }) => {
    const data = await inviteFriend(memberId, groupId);
    return data;
  }
);

export const getGroupByID = createAsyncThunk(
  "groups/getGroupById",
  async (id) => {
    const data = await getGroupByGroupId(id);
    return data;
  }
);

export const getGroupPrivacyKeys = createAsyncThunk(
  "groups/getGroupPrivacy",
  async () => {
    const data = await getGroupPrivacy();
    return data;
  }
);

export const getGroupFeeds = createAsyncThunk(
  "groups/allGroupFeeds",
  async (groupId) => {
    const data = await getGroupPosts(groupId);
    return data;
  }
);

export const getPostDetails = createAsyncThunk(
  "groups/postDetails",
  async (groupId) => {
    const data = await getPostByPostId(groupId);
    return data;
  }
);

export const groupInvitationList = createAsyncThunk(
  "groups/invitationList",
  async () => {
    const data = await getInvitationList();
    return data;
  }
);

export const groupJoinRequestLists = createAsyncThunk(
  "groups/joinRequestList",
  async (groupId) => {
    const data = await groupJoinRequestList(groupId);
    return data;
  }
);

export const allJoinedGroupList = createAsyncThunk(
  "groups/joinedGroup",
  async () => {
    const data = await groupJoinedList();
    return data;
  }
);

export const groupMemberList = createAsyncThunk(
  "groups/memberList",
  async ({ limit, pageNumber, groupId }) => {
    const data = await groupMemberListService(limit, pageNumber, groupId);
    return data;
  }
);

export const { allJoinRequestSent } = GroupSlice.actions;
export default GroupSlice.reducer;
