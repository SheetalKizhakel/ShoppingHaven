//we dont have to do a fetch request or an axios request,redux toolkit can be used
import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";
export const usersApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({//here we're not just fetching data we're authenticating,so POST request
            query:(data)=>({
                url:USERS_URL/auth,
                m
            }),
            keepUnusedDataFor:5
        }),
    })
});
export const {useGetProductsQuery,useGetProductDetailsQuery}=productsApiSlice;