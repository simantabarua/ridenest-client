import { baseApi } from "@/redux/base.api";
import type { IResponse } from "@/types";

export interface INotification {
  _id: string;
  user: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotifications: builder.query<IResponse<INotification[]>, void>({
      query: () => ({
        url: "/notifications",
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),
    markAllRead: builder.mutation<IResponse<null>, void>({
      query: () => ({
        url: "/notifications/mark-all-read",
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
    markAsRead: builder.mutation<IResponse<INotification>, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
    deleteNotification: builder.mutation<IResponse<null>, string>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetMyNotificationsQuery,
  useMarkAllReadMutation,
  useMarkAsReadMutation,
  useDeleteNotificationMutation,
} = notificationApi;
