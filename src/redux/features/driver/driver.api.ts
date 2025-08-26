import { baseApi } from "@/redux/base.api";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarnings: builder.query({
      query: () => ({ url: "/drivers/earnings", method: "GET" }),
      providesTags: ["Driver"],
    }),
    setAvailability: builder.mutation({
      query: (data) => ({
        url: "/drivers/availability",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["Availability"],
    }),
    getAvailability: builder.query({
      query: () => ({ url: "/drivers/availability", method: "GET" }),
      providesTags: ["Availability"],
    }),
  }),
});

export const {
  useGetEarningsQuery,
  useSetAvailabilityMutation,
  useGetAvailabilityQuery,
} = driverApi;
