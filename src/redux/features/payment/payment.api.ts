import { baseApi } from "@/redux/base.api";
import type { IResponse } from "@/types";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<
      IResponse<{ clientSecret: string; payment: any }>,
      { rideId: string }
    >({
      query: (data) => ({
        url: "/payment/create-payment-intent",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Payment"],
    }),
    confirmPayment: builder.mutation<
      IResponse<any>,
      { rideId: string; transactionId: string }
    >({
      query: (data) => ({
        url: "/payment/confirm-payment",
        method: "POST",
        data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Ride", id: arg.rideId },
        "Ride",
        "Payment",
      ],
    }),
  }),
});

export const {
  useCreatePaymentIntentMutation,
  useConfirmPaymentMutation,
} = paymentApi;
