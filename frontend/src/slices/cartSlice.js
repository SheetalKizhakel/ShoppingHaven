import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";
const initialState=localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):{cartItems:[],shippingAddress:{},paymentMethod:'Paypal'};

const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const item=action.payload;
            const existItem=state.cartItems.find((x)=>x._id==item._id);
            if(existItem){
                state.cartItems=state.cartItems.map((x)=>x._id===existItem._id?item:x)
            }
            else
            {
                state.cartItems=[...state.cartItems,item]
            }
            return updateCart(state);

        },
        removeFromCart:(state,action)=>{
            state.cartItems=state.cartItems.filter((x)=>x._id!==action.payload);//return all the cartitems that dont equal the one we want to delete
            return updateCart(state);
        },
        saveShippingAddress:(state,action)=>{
            state.shippingAddress=action.payload;
            return updateCart(state);
        },
        savePaymentMethod:(state,action)=>{
            state.paymentMethod=action.payload;
            return updateCart(state);
        },
        clearCartItems: (state, action) => {
            state.cartItems = [];
            localStorage.setItem('cart', JSON.stringify(state));
          },
        resetCart: (state) => (state = initialState),
       
    },

});
export const {addToCart,removeFromCart,saveShippingAddress,savePaymentMethod,clearCartItems,resetCart}=cartSlice.actions;
export default cartSlice.reducer;

//A "slice" is a collection of Redux reducer logic and actions for a single feature in your app, typically defined together in a single file.
//A function that accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.
//The name comes from splitting up the root Redux state object into multiple "slices" of state.