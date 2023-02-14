import axios from "axios";

export const getToken = async () => {
  // return await axios.get("/api/get-token");
  const token = await axios.get("/api/handler");
  // console.log(token.data);
  return token.data.token;
};

export const getUserData = async () => {
  const token = await getToken();
  // console.log("new token: ", token);

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_PATH}/profiles/myProfile`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const updateUserData = async (data) => {
  const token = await getToken();
  const res = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_PATH}/profiles/myProfileUpdates/update`,
    data,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};
