import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createSubscriptionPlanService,
  getAllSubscriptionPlansService,
  getPlanByIdService,
  getRenewalTypeService,
} from "../../services/subscription.service";

const initialState = {
  plans: null,
  planDetail: null,
  renewalType: null,
  currency: null,
};

const SubscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllPlans.fulfilled, (state, action) => {
        state.plans = action.payload;
      })
      .addCase(getPlanDetail.fulfilled, (state, action) => {
        state.planDetail = action.payload;
      })
      .addCase(getRenewalType.fulfilled, (state, action) => {
        if (action.payload.dropdownKey === "accountDuration") {
          state.renewalType = action.payload.data;
        } else {
          state.currency = action.payload.data;
        }
      });
  },
});

export const getAllPlans = createAsyncThunk("subscription/plans", async () => {
  const data = await getAllSubscriptionPlansService();
  return data;
});

export const getPlanDetail = createAsyncThunk(
  "subscription/planDetail",
  async (planId) => {
    const data = await getPlanByIdService(planId);
    return data;
  }
);

export const getRenewalType = createAsyncThunk(
  "subscription/renewal_type",
  async (dropdownKey) => {
    const data = await getRenewalTypeService(dropdownKey);
    return { data, dropdownKey };
  }
);

export const createPlans = createAsyncThunk(
  "subscription/createPlan",
  async (payload) => {
    const data = await createSubscriptionPlanService(payload);
    return data;
  }
);

export default SubscriptionSlice.reducer;
