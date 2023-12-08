//entry point for react
import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom';
import {PayPalScriptProvider} from '@paypal/react-paypal-js';
import {Provider} from 'react-redux'
import store from './store';
import {HelmetProvider} from 'react-helmet-async';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import products from './products';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './components/PrivateRoute.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx'
import OrderScreen from './screens/OrderScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import OrderListScreen from './screens/admin/OrderListScreen.jsx';
import ProductListScreen from './screens/admin/ProductListScreen.jsx';
import ProductEditScreen from './screens/admin/ProductEditScreen.jsx';
import UserListScreen from './screens/admin/UserListScreen.jsx';
import UserEditScreen from './screens/admin/UserEditScreen.jsx';
//we are putting our routes in the index.js
//path has the url relative to the root / and element takes as parameter whatever you want to display
//In Route :id is dynamic routing
//we don't want to be redirected to shipping unless we are logged in so we keep it in private Route
const router=createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App/>}>
  <Route index={true} path="/" element={<HomeScreen/>}/>
  <Route path="/search/:keyword" element={<HomeScreen/>}/>
  <Route path="/page/:pageNumber" element={<HomeScreen/>}/>
  <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen/>}/>
  <Route path="/product/:id" element={<ProductScreen/>}/>
  <Route path="/cart" element={<CartScreen/>}/>
  <Route path='/login' element={<LoginScreen/>}/>
  <Route path='/register' element={<RegisterScreen/>}/>

  <Route path='' element={<PrivateRoute/>}>
  <Route path='/shipping' element={<ShippingScreen/>}/>
  <Route path='/payment' element={<PaymentScreen/>}/>
  <Route path='/placeorder' element={<PlaceOrderScreen/>}/>
  <Route path='/order/:id' element={<OrderScreen/>}/>
  <Route path='/profile' element={<ProfileScreen/>}/>
  </Route>

  <Route path='' element={<AdminRoute/>}>
  <Route path='/admin/orderlist' element={<OrderListScreen/>}/>
  <Route path='/admin/productlist' element={<ProductListScreen/>}/>
  <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen/>}/>
  <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}/>
  <Route path='/admin/userlist' element={<UserListScreen/>}/>
  <Route path='/admin/user/:id/edit' element={<UserEditScreen/>}/>
  </Route>

  </Route>
));
const root = ReactDOM.createRoot(document.getElementById('root'));
//The provider componenet makes the redux store available to any nested component
root.render(
  <React.StrictMode>
 <HelmetProvider>
  <Provider store={store}>
  <PayPalScriptProvider deferLoading={true}>
   <RouterProvider router={router}/>
   </PayPalScriptProvider>
   </Provider>
   </HelmetProvider>
  </React.StrictMode>
);


reportWebVitals();
