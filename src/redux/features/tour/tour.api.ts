import { baseApi } from "@/redux/base.api";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTourType: builder.mutation({
      query: (tourTypeName) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourTypeName,
      }),
      invalidatesTags: ["TourType"],
    }),
    deleteTourType: builder.mutation({
      query: (tourTypeId) => ({
        url: `/tour/tour-types/${tourTypeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TourType"],
    }),
    getTourTypes: builder.query({
      query: (params) => ({
        url: "/tour/tour-types",
        method: "GET",
        params,
      }),
      transformResponse: (response) => response.data,
      providesTags: ["TourType"],
    }),
  }),
});

export const { useAddTourTypeMutation, useDeleteTourTypeMutation, useGetTourTypesQuery } = tourApi;
