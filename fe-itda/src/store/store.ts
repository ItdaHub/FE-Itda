import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import themeReducer from "@/features/theme/themeSlice";
import categoryReducer from "@/features/cate/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
