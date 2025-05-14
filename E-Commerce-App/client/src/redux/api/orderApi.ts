import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllOrdersResponse,
  MessageResponse,
  NewOrderRequest,
  OrderDetailsResponse,
  UpdateOrderRequest,
} from "../../types/api-types";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
  }),
  tagTypes: ["orders"],
  endpoints: (build) => ({
    newOrder: build.mutation<MessageResponse, NewOrderRequest>({
      query: (order) => ({
        url: "new",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["orders"],
    }),
    myOrders: build.query<AllOrdersResponse, string>({
      query: (id) => `my?id=${id}`,
      providesTags: ["orders"],
    }),
    allOrders: build.query<AllOrdersResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["orders"],
    }),
    orderDetails: build.query<OrderDetailsResponse, string>({
      query: (id) => id,
      providesTags: ["orders"],
    }),
    updateOrder: build.mutation<MessageResponse, UpdateOrderRequest>({
      query: ({ userId, orderId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["orders"],
    }),
    deleteOrder: build.mutation<MessageResponse, UpdateOrderRequest>({
      query: ({ userId, orderId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useNewOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useMyOrdersQuery,
  useAllOrdersQuery,
  useOrderDetailsQuery,
} = orderApi;
