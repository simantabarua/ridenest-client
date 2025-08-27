import { baseApi } from "@/redux/base.api";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (data) => ({
        url: "/admin/users",
        method: "GET",
        data,
      }),
      providesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/admin/users/${userId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["User", "Driver"],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users", "Driver"],
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
      providesTags: ["User"],
    }),
    getDriverStats: builder.query({
      query: (data) => ({
        url: "/admin/drivers-stats",
        method: "GET",
        data,
      }),
      providesTags: ["Driver"],
    }),
    getRidesStats: builder.query({
      query: (data) => ({
        url: "/admin/rides-stats",
        method: "GET",
        data,
      }),
      providesTags: ["Ride"],
    }),
    getDrivers: builder.query({
      query: (data) => ({
        url: "/admin/drivers",
        method: "GET",
        data,
      }),
      providesTags: ["Driver"],
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
  useUpdateUserMutation,
  useDeleteUserMutation,
} = adminApi;
