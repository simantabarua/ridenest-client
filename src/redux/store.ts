import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./base.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import tripReducer from "./features/trip/trip.slice";
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    trip: tripReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
