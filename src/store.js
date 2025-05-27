import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./features/ui/uiSlice";
import journeyReducer from "./pages/journeySlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    journey: journeyReducer,
  },
});
