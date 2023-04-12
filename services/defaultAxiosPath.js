import axios from "axios";

export const getToken = async () => {
  const token = await axios.get("/api/handler");
  return token.data.token;
};

// async function makeApiCall() {
//   const access_token = await getToken();
//   if (access_token) {
//     apiBaseURL.defaults.headers.common[
//       "Authorization"
//     ] = `Bearer ${access_token}`;
//   }
// }

// makeApiCall();

export const apiBaseURL = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_PATH}/`,
  headers: { "Content-Type": "application/json" },
});
