//The authSlice has a setCredentials action to set user credentials to local storage once authenticated and a logout that will clear local storage
import {createSlice} from '@reduxjs/toolkit';
const initialState={
    userInfo:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null,

}
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            state.userInfo=action.payload;
            localStorage.setItem('userInfo',JSON.stringify(action.payload));
        },
        logout:(state,action)=>{//this is for local
            state.userInfo=null;
            localStorage.removeItem('userInfo');
        }
    }
});
export const {setCredentials,logout}=authSlice.actions;
export default authSlice.reducer;