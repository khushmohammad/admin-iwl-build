import { apiBaseURL, getToken } from "./defaultAxiosPath";

export const searchUserByNameService = async (paylaod) => {
  const token = await getToken();
  try {
    const res = await apiBaseURL.get(
      `profiles/userProfile/searchByName/${paylaod}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.body;
  } catch (error) {
    console.log(error);
  }
};

export const getAllActivities = async (pageNumber, limit, payload) => {
  const token = await getToken();
  try {
    const res = await apiBaseURL.post(
      `profiles/activity/allActivity?pageNumber=${pageNumber}&limit=${limit}`,
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.body;
  } catch (error) {
    console.log(error);
  }
};
