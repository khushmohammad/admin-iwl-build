import axios from "axios";
export const getToken = async () => {
    
    const token = await axios.get("/api/handler");
    return token.data.token;
  };

  export const getAllCategoryData = async () => {
    const token = await getToken();
    // console.log("new token: ", token);
  
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/admins/resource/getResouce`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return data.body;
  };

  export const createResource = async (payload) => {
    
    const token = await getToken();

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_PATH}/admins/resource/create`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      return response;
   
  };

  export const updateResource = async (postData, id) => {
    
    const token = await getToken();
    const response = await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_PATH}/admins/resource/updateResouce/${id}`,
        postData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(response);
      return response;
  };

  export const deleteResourceById = async (id) => {
    
    const token = await getToken();
  
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_PATH}/admins/resource/deleteResouce/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response;
    
  };