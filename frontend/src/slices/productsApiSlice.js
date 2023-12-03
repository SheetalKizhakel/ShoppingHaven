//we dont have to do a fetch request or an axios request,redux toolkit can be used
import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";
export const productsApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getProducts:builder.query({
            query:()=>({
                url:PRODUCTS_URL
            }),
            keepUnusedDataFor:5
        }),
        getProductDetails:builder.query({
            query:(productId)=>({
                url:`${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor:5,
        })
    })
})
export const {useGetProductsQuery,useGetProductDetailsQuery}=productsApiSlice;
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints





//slice is responsible for tracking the initial state of the store and reducers are also collected here
//BASIC USAGE OF RTK QUERY
//1.Create an API slice-For typical usage with React, start by importing createApi and defining an "API slice" that lists the server's base URL and which endpoints we want to interact with
//2.Configure the store
//3.Use Hooks in componenets