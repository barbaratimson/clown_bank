import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import userCardsSlice from "./slices/userCardsSlice";
import userAccountsSlice from "./slices/userAccountsSlice";
export const store = configureStore({
    reducer:{
        userStore:userSlice,
        userCardsStore:userCardsSlice,
        userAccountsStore:userAccountsSlice
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch