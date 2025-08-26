import { baseApi } from "@/redux/base.api";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    update: builder.mutation({
      query: (data) => ({
        url: "/user/update",
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useUpdateMutation } = authApi;
