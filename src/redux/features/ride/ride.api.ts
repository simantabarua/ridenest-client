import { baseApi } from "@/redux/base.api";
import type { IRequestRideBody, IRide, IRideStatus } from "./ride.types";
import type { IResponse } from "@/types";

export const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestRide: builder.mutation<IResponse<IRide>, IRequestRideBody>({
      query: (data) => ({
        url: "/rides/request",
        method: "POST",
        data,
      }),
    }),
    getMyRides: builder.query({
      query: () => ({
        url: "/rides/my",
        method: "GET",
      }),
    }),
    getAllRides: builder.query({
      query: () => ({
        url: "/rides",
        method: "GET",
      }),
    }),
    getRideById: builder.query({
      query: (rideId) => ({
        url: `/rides/${rideId}`,
        method: "GET",
      }),
    }),
    updateRideStatus: builder.mutation<
      IRide,
      { rideId: string; status: IRideStatus }
    >({
      query: ({ rideId, status }) => ({
        url: `/rides/${rideId}/${status.toLowerCase()}`,
        method: "PATCH",
        data: { status },
      }),
    }),
    cancelRide: builder.mutation<IRide, { rideId: string; reason: string }>({
      query: ({ rideId, reason }) => ({
        url: `/rides/${rideId}/cancel`,
        method: "PATCH",
        data: { reason },
      }),
    }),
  }),
});

export const {
  useRequestRideMutation,
  useGetMyRidesQuery,
  useGetAllRidesQuery,
  useGetRideByIdQuery,
  useUpdateRideStatusMutation,
  useCancelRideMutation,
} = rideApi;
