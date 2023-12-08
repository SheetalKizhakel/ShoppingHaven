//we dont have to do a fetch request or an axios request,redux toolkit can be used
import { PRODUCTS_URL,UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";
export const productsApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getProducts:builder.query({
            query:({keyword,pageNumber})=>({
                url:PRODUCTS_URL,
                params:{
                    keyword,
                    pageNumber,
                },

            }),
            providesTags:['Product'],
            keepUnusedDataFor:5
        }),
        getProductDetails:builder.query({
            query:(productId)=>({
                url:`${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor:5,
        }),
        createProduct:builder.mutation({
            query:()=>({
                url:PRODUCTS_URL,
                method:'POST',
            }),
            invalidatesTags:['Products']
        }),
        updateProduct:builder.mutation({
            query:(data)=>({
                url:`${PRODUCTS_URL}/${data.productId}`,
                method:'PUT',
                body:data,
            }),
            invalidatesTags:['Products'],
        }),
        uploadProductImage:builder.mutation({
            query:(data)=>({
                url:`${UPLOAD_URL}`,
                method:'POST',
                body:data,
            })
        }),
        deleteProduct:builder.mutation({
            query:(productId)=>({
                url:`${PRODUCTS_URL}/${productId}`,
                method:'DELETE',
            })
        }),
        createReview:builder.mutation({
            query:(data)=>({
                url:`${PRODUCTS_URL}/${data.productId}/reviews`,
                method:'POST',
                body:data,
            }),
            invalidatesTags:['Product']
        }),
        getTopProducts:builder.query({
            query:()=>({
                url:`${PRODUCTS_URL}/top`,
            }),
            keepUnusedDataFor:5,

        })

    })
})
export const {useGetProductsQuery,useGetProductDetailsQuery,useCreateProductMutation,useUpdateProductMutation,useUploadProductImageMutation,useDeleteProductMutation,useCreateReviewMutation,useGetTopProductsQuery}=productsApiSlice;
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints


 


//slice is responsible for tracking the initial state of the store and reducers are also collected here
//BASIC USAGE OF RTK QUERY
//1.Create an API slice-For typical usage with React, start by importing createApi and defining an "API slice" that lists the server's base URL and which endpoints we want to interact with
//2.Configure the store
//3.Use Hooks in componenets