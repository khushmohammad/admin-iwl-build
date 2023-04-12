import axios from "axios";

export const getToken = async () => {
  const token = await axios.get("/api/handler");
  return token.data.token;
};

export const getAllCategoryData = async () => {
  const token = await getToken();

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

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_PATH}/admins/resource/create`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getResourceById = async (id) => {
  const token = await getToken();
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/admins/resource/getResouce/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data?.body;
  } catch (error) {
    console.log(error);
  }
};

export const updateResource = async (id, postData) => {
  const token = await getToken();
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_PATH}/admins/resource/updateResouce/${id}`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteResourceById = async (id) => {
  const token = await getToken();
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_PATH}/admins/resource/deleteResouce/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createNotificationSetting = async (data) => {
  const token = await getToken();
  let FormObj = "";
  if (data) {
    FormObj = {
      title: data.title,
      icon: "fa fa-Tag",
      subtitle: data.subtitle,
      description: data.desc,
      subcategoryTitle: data.subcategory,
      subcategory: ["64119b6b0311257717e7055a", "64119b2a0311257717e70559"],
    };
  }

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_PATH}/admins/setting/createNotificationSetting`,
    FormObj,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response;
};

export const notificationDropdownValue = async () => {
  const token = await getToken();
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_PATH}/admins/dropdowns/getDropDown/Notifications`,

    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response;
};
