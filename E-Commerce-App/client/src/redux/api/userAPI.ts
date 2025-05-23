import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllUsersResponse,
  DeleteUserRequest,
  MessageResponse,
  UserResponse,
} from "../../types/api-types";
import { User } from "../../types/types";
import axios from "axios";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`,
  }),
  tagTypes: ["users"],
  endpoints: (build) => ({
    login: build.mutation<MessageResponse, User>({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),
    deleteUser: build.mutation<MessageResponse, DeleteUserRequest>({
      query: ({ userId, adminUserId }) => ({
        url: `${userId}?id=${adminUserId}`,
        method: "Delete",
      }),
      invalidatesTags: ["users"],
    }),
    allUsers: build.query<AllUsersResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["users"],
    }),
  }),
});

export const getUser = async (id: string) => {
  try {
    const { data }: { data: UserResponse } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/user/${id}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const { useLoginMutation, useAllUsersQuery, useDeleteUserMutation } =
  userAPI;
