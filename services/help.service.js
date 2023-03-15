import axios from "axios";

export const getToken = async () => {
  const token = await axios.get("/api/handler");
  return token.data.token;
};

export const createHelpService = async (payload) => {
  const token = await getToken();

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_PATH}/admins/help/create`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const getHelpService = async (helpId) => {
  const token = await getToken();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/admins/help/getHelp/${helpId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.body;
  } catch (error) {
    console.log(error);
  }
};

export const deleteHelp = async (helpId) => {
  const token = await getToken();
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_PATH}/admins/help/deleteHelp/${helpId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateHelp = async (helpId, data) => {
  const token = await getToken();
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_PATH}/admins/help/updateHelp/${helpId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
