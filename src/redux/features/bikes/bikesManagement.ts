import { TQueryParam, Bike, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const bikesManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCars: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    // url: "/bikes",
                    url: "/products",
                    method: "GET",
                    params: params,
                };
            },
            transformResponse: (response: TResponseRedux<Bike[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
            // providesTags: ["cars"],
            providesTags: ["bikes"],
        }),
        getOwnCars: builder.query({
            query: () => {

                return {
                    // url: "/cars/own",
                    url: "/bikes/own",
                    method: "GET",
                };
            },
            providesTags: ["bikes"],
        }),
        getSingleCars: builder.query({
            query: (args) => {
                return {
                    url: `/bikes/${args}`,
                    method: "GET",
                };
            },
            transformResponse: (response: TResponseRedux<Bike[]>) => {
                return {
                    data: response.data,
                };
            },
            providesTags: ["bikes"],
        }),

        getAllOrders: builder.query({
            query: (args) => {
                console.log(args);
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "/orders/Allorder",
                    method: "GET",
                    params: params,
                };
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
            providesTags: ["bikes"],
        }),

        verifyOrder: builder.query({
            query: (order_id) => ({
                url: "/orders/verify",
                params: { order_id },
                method: "GET",
            }),
        }),
        orderRevenue: builder.query({
            query: () => ({
                url: "/orders/revenue",
                method: "GET",
            }),
        }),

        orderCar: builder.mutation({
            query: (data) => ({
                url: "/orders",
                method: "POST",
                body: data,
            }),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response.data,
                };
            },
            invalidatesTags: ["bikes"],
        }),
        updateCar: builder.mutation({
            query: ({ data, order_id }) => {
                return {
                    url: `/bikes/${order_id}`,
                    method: "PUT",
                    body: data,
                };

            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response.data,
                };
            },
            invalidatesTags: ["bikes"],
        }),
        createCar: builder.mutation({
            query: ({ carData }) => {
                console.log(carData)
                return {
                    url: `/bikes`,
                    method: "POST",
                    body: carData,
                };

            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response.data,
                };
            },
            invalidatesTags: ["bikes"],
        }),
        deleteCar: builder.mutation({
            query: ({ order_id }) => {
                console.log(order_id)

                return {
                    url: `/bikes/${order_id}`,
                    method: "DELETE",
                };

            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response.data,
                };
            },
            invalidatesTags: ["bikes"],
        }),

        allsurjopay: builder.query({
            query: () => ({
                url: "/orders/Allorder",
                method: "GET",
            }),
            providesTags: ['tags']
        }),

        alluser: builder.query({
            query: () => ({
                url: "/alluser",
                method: "GET",
            }),
            providesTags: ['tags']
        }),

        blockedUser: builder.mutation({
            query: (userId) => {
                console.log(userId.userId)
                return {
                    url: `/${userId.userId}`,
                    method: "PUT",
                };

            },
            invalidatesTags: ["tags"],
        }),



    }),
});

export const {
    useGetAllCarsQuery,
    useGetSingleCarsQuery,
    useGetAllOrdersQuery,
    useVerifyOrderQuery,
    useOrderRevenueQuery,
    useOrderCarMutation,
    useUpdateCarMutation,
    useDeleteCarMutation,
    useCreateCarMutation,
    useAllsurjopayQuery,
    useAlluserQuery,
    useBlockedUserMutation,
    useGetOwnCarsQuery

} = bikesManagementApi;
