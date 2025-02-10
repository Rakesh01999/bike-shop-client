import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/login",
                method: "POST",
                body: userInfo,
            }),
            invalidatesTags: ['reset']
        }),
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/register",
                method: "POST",
                body: userInfo,
            }),
            invalidatesTags: ['reset']
        }),
        changePassword: builder.mutation({
            query: (userInfo) => ({
                url: "/change-password",
                method: "POST",
                body: userInfo,
            }),
            invalidatesTags: ['reset']
        }),
        updateProfile: builder.mutation({
            query: (userInfo) => ({
                url: "/update-profile",
                method: "PATCH",
                body: userInfo,
            }),
            invalidatesTags: ['reset']
        }),

    }),
});

export const { useLoginMutation, useRegisterMutation, useChangePasswordMutation , useUpdateProfileMutation} = authApi;

