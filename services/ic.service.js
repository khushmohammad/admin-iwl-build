import axios from "axios";
const pageLimit = 5;
export const getToken = async () => {
  const token = await axios.get("/api/handler");
  return token.data.token;
};

export const getAllIcByType = async (type, pageNumber, search) => {
  const token = await getToken();

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/profiles/integratingCoach?type=${type}&name=${search}&page=${pageNumber}?limit=${pageLimit}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return data.body;
  } catch (err) {
    console.log(err);
  }
};

export const icStatusUpdate = async (payload) => {
  const token = await getToken();

  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_PATH}/profiles/IntegratingCoach`,
    payload,
    {
      headers: {
        //"Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response);
  return response;
};
