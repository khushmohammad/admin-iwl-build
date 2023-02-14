import axios from "axios";

export const getToken = async () => {
  const token = await axios.get("/api/handler");
  return token.data.token;
};

export const getGroupPrivacy = async () => {
  const token = await getToken();
  try {
    let dropdownkey = "GroupPrivacyStatus";
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/groups/dropdowns/values/${dropdownkey}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.body;
  } catch (err) {
    console.log(err);
  }
};

export const joinGroupService = async (groupId) => {
  const token = await getToken();

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/groups/groupJoinRequest/newRequest/${groupId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createGroup = async (payload) => {
  const token = await getToken();
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_PATH}/groups/newGroup/create`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    const status = err.response.status;
    const message = err.response.data;

    return { message, status };
  }
};

export const updateGroup = async (payload, groupId) => {
  const token = await getToken();
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_PATH}/groups/group/update/${groupId}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteGroupByGroupId = async (groupId) => {
  const token = await getToken();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/groups/group/delete/${groupId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.body;
  } catch (error) {
    console.log(error);
  }
};

export const getAllGroups = async (page) => {
  console.log("::", page);
  const token = await getToken();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/groups/groupInfo/getGroups?page=${page}&limit=4`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(res);
    return res.data.body;
  } catch (err) {
    console.log(err);
  }
};

export const inviteFriend = async (memberId, groupId) => {
  const token = await getToken();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/groups/invitation/newRequest?memberId=${memberId}&groupId=${groupId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getGroupByGroupId = async (id) => {
  const token = await getToken();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/groups/groupInfo/getGroup/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.body;
  } catch (err) {
    console.log(err);
  }
};

export const registerIcUser = async (formData) => {
  const token = await getToken();

  const questionData = [
    {
      questionId: "63c65d3db797ea669df05fe9",
      answer: formData.question1,
    },
    {
      questionId: "63c65d3db797ea669df05fe6",
      answer: formData.question2,
    },
    {
      questionId: "63c65d3db797ea669df05fe5",
      answer: formData.question3,
    },
  ];
  const questionDataStr = JSON.stringify(questionData);
  const termcon = formData.checked;
  const ForData = {
    quesAns: questionDataStr,
    acceptTermsAndConditions: termcon,
    file: [formData.document1[0], formData.document2[0], formData.document3[0]],
  };

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_PATH}/groups/newIc/create`,
      ForData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response, "response");
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getGroupPosts = async (groupId) => {
  const token = await getToken();

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/groups/group/postInfo/getAllPosts/${groupId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.body;
  } catch (err) {
    console.log(err);
  }
};

export const getPostByPostId = async (postId) => {
  const token = await getToken();

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/groups/group/postInfo/getAllPosts/${postId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.body;
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = async (postData, groupId, memberId) => {
  const token = await getToken();
  await axios
    .patch(
      `${process.env.NEXT_PUBLIC_API_PATH}/groups/group/updatePosts/post/${postId}`,
      postData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const getInvitationList = async () => {
  const token = await getToken();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/groups/groupInvitationList`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.body;
  } catch (error) {
    console.log(error);
  }
};

export const invitationAcceptAndDelineService = async (
  invitationId,
  invitationAction
) => {
  const token = await getToken();

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/groups/joinGroup/?invitationId=${invitationId}&invitationAction=${invitationAction}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.body;
  } catch (error) {
    console.log(error);
  }
};

export const groupJoinRequestList = async (groupId) => {
  const token = await getToken();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/groups/groupJoinRequestList/${groupId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.body;
  } catch (error) {
    console.log(error);
  }
};

export const groupJoinAcceptAndDeclineService = async (
  invitationId,
  invitationAction
) => {
  const token = await getToken();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/groups/groupJoinRequest/?invitationId=${invitationId}&invitationAction=${invitationAction}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const groupJoinedList = async () => {
  const token = await getToken();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/groups/groupInfo/getGroup`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.body;
  } catch (error) {
    console.log(error);
  }
};

export const groupMemberListService = async (limit, pageNumber, groupId) => {
  const token = await getToken();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/groups/groupMembers/?${limit}&${pageNumber}&groupId=${groupId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.body;
  } catch (error) {
    console.log(error);
  }
};
