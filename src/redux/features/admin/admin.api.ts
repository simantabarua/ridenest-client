import { baseApi } from "@/redux/base.api";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (data) => ({
        url: "/admin/users",
        method: "GET",
        data,
      }),
    }),
    getAdminStats: builder.query({
      query: (data) => ({
        url: "/admin/dashboard",
        method: "GET",
        data,
      }),
    }),
    getAllUserStats: builder.query({
      query: (data) => ({
        url: "/admin/users-stats",
        method: "GET",
        data,
      }),
    }),
    getDriverStats: builder.query({
      query: (data) => ({
        url: "/admin/drivers-stats",
        method: "GET",
        data,
      }),
    }),
    getRidesStats: builder.query({
      query: (data) => ({
        url: "/admin/rides-stats",
        method: "GET",
        data,
      }),
    }),
    getDrivers: builder.query({
      query: (data) => ({
        url: "/admin/drivers",
        method: "GET",
        data,
      }),
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetAdminStatsQuery,
  useGetDriversQuery,
  useGetDriverStatsQuery,
  useGetRidesStatsQuery,
  useGetAllUserStatsQuery,
} = adminApi;
