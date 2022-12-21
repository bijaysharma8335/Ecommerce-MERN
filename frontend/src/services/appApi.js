import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//create the api
export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000",
    }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (user) => ({
                url: "/users/signup",
                method: "POST",
                body: user,
            }),
        }),
        login: builder.mutation({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user,
            }),
        }),

        //create-product
        createProduct: builder.mutation({
            query: (product) => ({
                url: "/products",
                method: "POST",
                body: product,
            }),
        }),

        //deleteProduct
        deleteProduct: builder.mutation({
            query: ({ product_id, user_id }) => ({
                url: `/products/${product_id}`,
                body: { user_id },
                method: "DELETE",
            }),
        }),

        //update product
        updateProduct: builder.mutation({
            query: (product) => ({
                url: `/products/${product.id}`,
                method: "PATCH",
                body: product,
            }),
        }),
        //add to cart
        addToCart: builder.mutation({
            query: (cartInfo) => ({
                url: "/products/add-to-cart",
                body: cartInfo,
                method: "POST",
            }),
        }),

        //remove from cart
        removeFromCart: builder.mutation({
            query: (body) => ({
                url: "/products/remove-from-cart",
                body,
                method: "POST",
            }),
        }),

        //increase cart product
        increaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/increase-cart",
                body,
                method: "POST",
            }),
        }),
        //decrease cart product
        decreaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/decrease-cart",
                body,
                method: "POST",
            }),
        }),
        //create order
        createOrder: builder.mutation({
            query: (body) => ({
                url: "/orders",
                method: "POST",
                body,
            }),
        }),
    }),
});
export const {
    useSignupMutation,
    useLoginMutation,
    useCreateProductMutation,
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useDecreaseCartProductMutation,
    useIncreaseCartProductMutation,
    useCreateOrderMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = appApi;
export default appApi;
