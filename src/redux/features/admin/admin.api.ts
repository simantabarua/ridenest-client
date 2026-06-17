import { baseApi } from "@/redux/base.api";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (params) => ({
        url: "/admin/users",
        method: "GET",
        params,
      }),
      providesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/admin/users/${userId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["Users", "Driver"],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users", "Driver"],
    }),

    getAdminStats: builder.query({
      query: (params) => ({
        url: "/admin/dashboard",
        method: "GET",
        params,
      }),
    }),
    getAllUserStats: builder.query({
      query: (params) => ({
        url: "/admin/users-stats",
        method: "GET",
        params,
      }),
      providesTags: ["Users"],
    }),
    getAdminDriverStats: builder.query({
      query: (params) => ({
        url: "/admin/drivers-stats",
        method: "GET",
        params,
      }),
      providesTags: ["Driver"],
    }),
    getRidesStats: builder.query({
      query: (params) => ({
        url: "/admin/rides-stats",
        method: "GET",
        params,
      }),
      providesTags: ["Ride"],
    }),
    getDrivers: builder.query({
      query: (params) => ({
        url: "/admin/drivers",
        method: "GET",
        params,
      }),
      providesTags: ["Driver"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetAdminStatsQuery,
  useGetDriversQuery,
  useGetAdminDriverStatsQuery,
  useGetRidesStatsQuery,
  useGetAllUserStatsQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = adminApi;
