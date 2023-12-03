//Entry point of redux we are creating a store
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import cartSliceReducer from './slices/cartSlice';
import authSliceReducer from './slices/authSlice';
import { get } from 'mongoose';
const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        cart:cartSliceReducer,
        auth:authSliceReducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,

});
export default store;
//Instead, the only way to cause an update to the state is to create a plain action object that describes "something that happened in the application", and then dispatch the action to the store to tell it what happened.
//When an action is dispatched, the store runs the root reducer function, and lets it calculate the new state based on the old state and the action
//An action is a plain JavaScript object that has a type field
/*A typical action object might look like this:

const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
}*/
//A reducer is a function that receives the current state and an action object, decides how to update the state if necessary, and returns the new state: (state, action) => newState.
//The logic inside reducer functions typically follows the same series of steps:
//1.Check to see if the reducer cares about this action
//2.If so, make a copy of the state, update the copy with new values, and return it
//3.Otherwise, return the existing state unchanged
//The store is created by passing in a reducer, and has a method called getState that returns the current state value:
//The Redux store has a method called dispatch. The only way to update the state is to call store.dispatch() and pass in an action object