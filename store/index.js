import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import settingReducer from "./setting/reducers";
import profileReducer from "./profile";
import memberReducer from "./member";
import modeReducer from "./mode/mode";
import helpReducer from "./help";
import subscriptionReducer from "./subscription";
import activityLogReducer from "./activities";
import icReducer from "./ic";
import resourceReducer from "./resource";
import { persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  stateReconciler: autoMergeLevel2,
};

const reducers = combineReducers({
  setting: settingReducer,
  mode: modeReducer,
  user: profileReducer,
  member: memberReducer,
  icAction: icReducer,
  help: helpReducer,
  resource: resourceReducer,
  subscription: subscriptionReducer,
  activityLog: activityLogReducer,
});

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.setting.setting)
      nextState.setting.setting = state.setting.setting;
    if (state.user.user) nextState.user.user = state.user.user;
    if (state.post.post) nextState.post.post = state.post.post;
    return nextState;
  } else {
    return reducers(state, action);
  }
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
// });

// export { store, persistor };

// const initStore = () => {
//   return configureStore({reducer: rootReducer, middleware: [thunk, ])});
// };

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

let persistor = persistStore(store);

export { persistor };
export const wrapper = createWrapper(() => store);
