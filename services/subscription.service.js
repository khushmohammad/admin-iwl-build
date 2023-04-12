import { apiBaseURL } from "./defaultAxiosPath";
import { getToken } from "./defaultAxiosPath";

export const getRenewalTypeService = async (dropdownKey) => {
  const token = await getToken();

  try {
    const res = await apiBaseURL.get(
      `admins/dropdowns/getDropDown/${dropdownKey}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res?.data?.body;
  } catch (error) {
    console.log(error);
  }
};

export const createSubscriptionPlanService = async (data) => {
  const token = await getToken();

  try {
    const res = await apiBaseURL.post("admins/subscription/create", data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllSubscriptionPlansService = async () => {
  const token = await getToken();

  try {
    const { data } = await apiBaseURL.get("admins/subscription/getAll", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return data.body;
  } catch (err) {
    console.log(err);
  }
};

export const getPlanByIdService = async (planId) => {
  const token = await getToken();

  try {
    const { data } = await apiBaseURL.get(
      `admins/subscription/getSubscription/${planId}`,
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

export const updateSubscriptionPlanService = async (planId, data) => {
  const token = await getToken();

  try {
    const res = await apiBaseURL.patch(
      `admins/subscription/updateSubscription/${planId}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSubscriptionPlanService = async (planId) => {
  const token = await getToken();

  try {
    const res = await apiBaseURL.delete(
      `admins/subscription/deleteSubscription/${planId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
