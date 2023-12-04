import React from 'react'
import Header from "./components/Header"
import Footer from "./components/Footer"
import {Container} from 'react-bootstrap'
import {Outlet} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/*This is my main app.js where i import all my compenents*/
//Outlet is nothing but an outlet for the router. Like whatever you want to render through the router
const App = () => {
  return (
    <>
    <Header/> 
    <main className='py-3'>
    <Container>
    <Outlet/>
    </Container>
   </main>
   <Footer/>
   <ToastContainer/>
    
    </>
  )
}

export default App