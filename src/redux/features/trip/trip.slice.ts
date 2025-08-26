import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TripState {
  destinationLatitude: number | null;
  destinationLongitude: number | null;
  destinationLocation: string | null;
  pickupLocation: string | null;
  estimatedDistance: number | null;
  estimatedTime: number | null;
  fare: number | null;
  totalFare: number | null;
}

const initialState: TripState = {
  destinationLatitude: null,
  destinationLongitude: null,
  destinationLocation: null,
  pickupLocation: null,
  estimatedDistance: null,
  estimatedTime: null,
  fare: null,
  totalFare: null,
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
        destinationLocation: string;
        pickupLocation: string;
        estimatedDistance: number;
        estimatedTime: number;
        fare: number;
        totalFare: number;
      }>
    ) => {
      Object.assign(state, action.payload);
    },
    resetTripDetails: () => initialState,
  },
});

export const { setTripDetails, resetTripDetails } = tripSlice.actions;
export default tripSlice.reducer;
