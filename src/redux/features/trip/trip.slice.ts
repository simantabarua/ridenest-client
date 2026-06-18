import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TripState {
  destinationLatitude: number | null;
  destinationLongitude: number | null;
  destinationLocation: string | null;
  pickupLatitude: number | null;
  pickupLongitude: number | null;
  pickupLocation: string | null;
  estimatedDistance: number | null;
  estimatedTime: number | null;
  fare: number | null;
  totalFare: number | null;
  routeGeometry: string | null;
}

const initialState: TripState = {
  destinationLatitude: null,
  destinationLongitude: null,
  destinationLocation: null,
  pickupLatitude: null,
  pickupLongitude: null,
  pickupLocation: null,
  estimatedDistance: null,
  estimatedTime: null,
  fare: null,
  totalFare: null,
  routeGeometry: null,
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
        pickupLatitude: number;
        pickupLongitude: number;
        pickupLocation: string;
        estimatedDistance: number;
        estimatedTime: number;
        fare: number;
        totalFare: number;
        routeGeometry?: string | null;
      }>
    ) => {
      Object.assign(state, action.payload);
    },
    resetTripDetails: () => initialState,
  },
});


export const { setTripDetails, resetTripDetails } = tripSlice.actions;
export default tripSlice.reducer;
