import { baseApi } from "@/redux/base.api";
import type { IRequestRideBody, IRide } from "./ride.types";
import type { IResponse } from "@/types";

export const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestRide: builder.mutation<IResponse<IRide>, IRequestRideBody>({
      query: (data) => ({
        url: "/rides/request",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Ride"],
    }),
    getMyRides: builder.query({
      query: () => ({
        url: "/rides/my",
        method: "GET",
      }),
      providesTags: ["Ride"],
    }),
    getAllRides: builder.query({
      query: () => ({
        url: "/rides",
        method: "GET",
      }),
      providesTags: ["Ride"],
    }),

    getRiderStats: builder.query({
      query: () => ({
        url: "/rides/stats/rider",
        method: "GET",
      }),
      providesTags: ["Ride"],
    }),
    getDriverStats: builder.query({
      query: () => ({
        url: "/rides/stats/driver",
        method: "GET",
      }),
      providesTags: ["Ride"],
    }),
    getActiveRideDriver: builder.query({
      query: () => ({
        url: "/rides/active/driver",
        method: "GET",
      }),
      providesTags: ["Ride"],
    }),
    getActiveRideRider: builder.query({
      query: () => ({
        url: "/rides/active/rider",
        method: "GET",
      }),
      providesTags: ["Ride"],
    }),
    getRideById: builder.query({
      query: (rideId) => ({
        url: `/rides/${rideId}`,
        method: "GET",
      }),
      providesTags: (result, error, rideId) => [
        { type: "Ride", id: rideId },
        "Ride",
      ],
    }),
    getRequestedRide: builder.query({
      query: () => ({
        url: "/rides/requested",
        method: "GET",
      }),
      providesTags: ["Ride"],
    }),
    updateRideStatus: builder.mutation<
      IRide,
      { rideId: string; status: string }
    >({
      query: ({ rideId, status }) => ({
        url: `/rides/${rideId}/${status.toLowerCase()}`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Ride", id: arg.rideId },
        "Ride",
      ],
    }),
    cancelRide: builder.mutation<IRide, { rideId: string; reason: string }>({
      query: ({ rideId, reason }) => ({
        url: `/rides/${rideId}/cancel`,
        method: "PATCH",
        data: { reason },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Ride", id: arg.rideId },
        "Ride",
      ],
    }),
  }),
});

export const {
  useRequestRideMutation,
  useGetMyRidesQuery,
  useGetAllRidesQuery,
  useGetRideByIdQuery,
  useGetRequestedRideQuery,
  useUpdateRideStatusMutation,
  useCancelRideMutation,
  useGetActiveRideRiderQuery,
  useGetActiveRideDriverQuery,
  useGetRiderStatsQuery,
  useGetDriverStatsQuery,
} = rideApi;
