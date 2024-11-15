import { configureStore } from "@reduxjs/toolkit";
import tenantIdReducer from "@/redux/slices/tenantIdSlice";

export const store = configureStore({
  reducer: {
    tenantId: tenantIdReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
