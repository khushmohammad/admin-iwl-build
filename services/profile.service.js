import axios from "axios";

export const getToken = async () => {
  // return await axios.get("/api/get-token");
  const token = await axios.get("/api/handler");
  return token.data.token;
};

export const getStateData = async (id) => {
  const token = await getToken();
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_PATH}/profiles/states/all/statesByCountryId?limit&page&country_id=${id}`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  // const states = await res.data.body;
  return res.data.body;
};

export const getCityData = async (id) => {
  const token = await getToken();
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_PATH}/profiles/cities/all/citiesByStateId?limit&page&state_id=${id}`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  // const states = await res.data.body;
  return res.data.body;
};
export const getCountryData = async (id) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_PATH}/users/country/all`
  );
  return res.data.body;
};

