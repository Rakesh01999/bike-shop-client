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
                console.log('f-bikeManageApi, args:',args);
                return {
                    // url: `/bikes/${args}`,
                    url: `/products/${args}`,
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

        // getAllOrders: builder.query({
        //     query: (args) => {
        //         console.log(args);
        //         const params = new URLSearchParams();

        //         if (args) {
        //             args.forEach((item: TQueryParam) => {
        //                 params.append(item.name, item.value as string);
        //             });
        //         }

        //         return {
        //             url: "/orders/Allorder",
        //             // url: "/orders/orders",
        //             method: "GET",
        //             params: params,
        //         };
        //     },
        //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //     transformResponse: (response: TResponseRedux<any>) => {
        //         return {
        //             data: response.data,
        //             meta: response.meta,
        //         };
        //     },
        //     providesTags: ["bikes"],
        // }),
        getAllOrders: builder.query({
            query: () => ({
                url: "/orders",  // Updated to match your working endpoint
                method: "GET",
            }),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response.data.result,  // Access the nested result array
                    meta: response.data.meta,
                };
            },
            providesTags: ["bikes"],
        }),
        // Replace useGetOwnCarsQuery with a new endpoint for user orders
        getOwnOrders: builder.query({
            query: () => ({
                url: "/orders/my-orders", // You'll need to create this endpoint in backend
                method: "GET",
            }),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response.data.result,  // Access the nested result array
                    meta: response.data.meta,
                };
            },
            providesTags: ["bikes"],
        }),

        verifyOrder: builder.query({
            query: (order_id) => ({
                url: "/orders/verify",
                // url: "/order/verify",
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

        // orderCar: builder.mutation({
        //     query: (data) => ({
        //         // url: "/orders",
        //         url: "/orders/order",
        //         method: "POST",
        //         body: data,
        //     }),
        //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //     transformResponse: (response: TResponseRedux<any>) => {
        //         return {
        //             data: response.data,
        //         };
        //     },
        //     invalidatesTags: ["bikes"],
        // }),
        orderCar: builder.mutation({
            query: (data) => ({
                // console.log("Order Data Being Sent:", data); // Log request data
                // return {
                url: "/orders/order",
                method: "POST",
                body: data,
                // };
            }),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transformResponse: (response: TResponseRedux<any>) => {
                console.log("Order API Response:", response); // Log response from backend
                return {
                    data: response.data,
                };
            },
            invalidatesTags: ["bikes"],
        }),

        updateCar: builder.mutation({
            query: ({ data, order_id }) => {
                return {
                    // url: `/bikes/${order_id}`,
                    url: `/products/${order_id}`,
                    // method: "PUT",
                    method: "PATCH",
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
        // createCar: builder.mutation({
        //     query: (bikeData) => {
        //         return {
        //             url: `/products/create-bike`,
        //             method: "POST",
        //             body: {
        //                 bike: {
        //                     name: bikeData.name,
        //                     modelNumber: bikeData.model, // Changed from model to modelNumber to match API
        //                     brand: bikeData.brand,
        //                     image: bikeData.image,
        //                     price: Number(bikeData.price), // Ensure price is a number
        //                     category: bikeData.category,
        //                     description: bikeData.description,
        //                     quantity: Number(bikeData.quantity), // Ensure quantity is a number
        //                 }
        //                 // bike: { bikeData }
        //             }
        //         };
        //     },
        //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //     transformResponse: (response: TResponseRedux<any>) => {
        //         return {
        //             data: response.data,
        //         };
        //     },
        //     invalidatesTags: ["bikes"],
        // }),
        createCar: builder.mutation({
            query: (bikeData) => {
                // Create the request body with the exact structure expected by backend
                const requestBody = {
                    bike: {
                        name: bikeData.name,
                        modelNumber: bikeData.model, // Make sure this matches with the backend
                        brand: bikeData.brand,
                        image: bikeData.image, // Make sure this is being passed from your form
                        price: Number(bikeData.price),
                        category: bikeData.category,
                        description: bikeData.description,
                        quantity: Number(bikeData.quantity)
                    }
                };

                console.log('Sending to backend:', requestBody); // Debug log

                return {
                    url: `/products/create-bike`,
                    method: "POST",
                    body: requestBody
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
                    url: `/products/${order_id}`,
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
                // url: "/orders/Allorder",
                url: "/orders/",
                method: "GET",
            }),
            providesTags: ['tags']
        }),

        alluser: builder.query({
            query: () => ({
                // url: "/alluser",
                url: "/users",
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
    useGetOwnCarsQuery,
    useGetOwnOrdersQuery, 

} = bikesManagementApi;
