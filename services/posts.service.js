import axios from "axios";

import { apiBaseURL } from "./defaultAxiosPath";

export const getToken = async () => {
  const token = await axios.get("/api/handler");
  return token.data.token;
};

export const reportPost = async (pageNo, limit) => {
  const token = await getToken();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/getUserPost/getAllReportedPost?pageNumber=${pageNo}&limit=${limit}`,
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
export const getReportPostById = async (id) => {
  const token = await getToken();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/getUserPost/getReportPostById/${id}`,
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
export const actionOnReport = async (id, payload) => {
  const token = await getToken();
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/userPost/adminAction/${id}`,
      payload,
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

// getPostsByPostId
export const getPostsByPostId = async (id) => {
  const token = await getToken();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/getUserPost/getPostByPostId/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (err) {
    console.log("error", err);
  }
};

export const getReactionListOnPost = async (postId = "") => {
  const token = await getToken();

  const res = await apiBaseURL.get(`/posts/userPost/getLikes/${postId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const likePostByUser = async (postId, reactionId) => {
  const token = await getToken();
  const likeData = { postId: postId, reactionEmoji: reactionId };

  try {
    const response = await apiBaseURL.post(
      `posts/userPost/post/ToggleLike`,
      likeData,
      {
        "Content-Type": "multipart/form-data",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};
