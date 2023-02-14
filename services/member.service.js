import axios from "axios";
const pageLimit = 5;
export const getToken = async () => {
    
    const token = await axios.get("/api/handler");
    return token.data.token;
  };

  export const getAllMemberByType = async (type,pageNumber,search) => {
    const token = await getToken();
    // console.log("new token: ", token);
  try{
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_PATH}/profiles/admin/getAllRegisteredMembers/${type}?limit=${pageLimit}&page=${pageNumber}&name=${search}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return data.body;
  }catch (err) {
    console.log(err);
  }
    
  };

  
  export const memberStatusUpdate = async (payload,status) => {
    const token = await getToken();

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_PATH}/profiles/admin/accountAction/${status}`,
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