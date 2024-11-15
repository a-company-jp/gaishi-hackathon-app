import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const defaultTenantId = "store1";

const getDefaultTenantId = (): string => {
  if (process.env.NODE_ENV === "development") {
    return defaultTenantId;
  }

  // ドメインから取得
  if (typeof window !== "undefined") {
    const domainParts = window.location.hostname.split(".");
    return domainParts[0] || defaultTenantId;
  }

  return defaultTenantId;
};

interface TenantIdState {
  id: string;
}

const initialState: TenantIdState = {
  id: getDefaultTenantId(),
};

const tenantIdSlice = createSlice({
  name: "tenantId",
  initialState,
  reducers: {
    settenantId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { settenantId } = tenantIdSlice.actions;
export default tenantIdSlice.reducer;
