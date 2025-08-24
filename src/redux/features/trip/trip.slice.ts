import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TripState {
  destinationLatitude: number | null;
  destinationLongitude: number | null;
  destination: string | null;
  pickup: string | null;
  distance: number | null;
  estimatedTime: number | null;
  price: number | null;
}

const initialState: TripState = {
  destinationLatitude: null,
  destinationLongitude: null,
  destination: null,
  pickup: null,
  distance: null,
  estimatedTime: null,
  price: null,
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setTripDetails: (
      state,
      action: PayloadAction<{
        destinationLatitude: number;
        destinationLongitude: number;
        destination: string;
        pickup: string;
        distance: number;
        estimatedTime: number;
        price: number;
      }>
    ) => {
      Object.assign(state, action.payload);
    },
    resetTripDetails: () => initialState,
  },
});

export const { setTripDetails, resetTripDetails } = tripSlice.actions;
export default tripSlice.reducer;
