import React from 'react'
//import { useEffect,useState} from 'react'
import {Row,Col} from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useGetProductsQuery } from '../slices/productsApiSlice'
//import axios from 'axios'
//col is responsive 12-stacked on each other,6-split in half etc.
//we have passed product as a prop
//useEffect-whatever you will put in the array of dependencies,if that changes the useEffect function will run

const HomeScreen = () => {
  const {data:products, isLoading, error}=useGetProductsQuery();
  //const [products,setProducts]=useState([]);
  /*useEffect(()=>{
    const fetchProducts=async()=>{
      const {data}=await axios.get('/api/products');
      setProducts(data);
    };
    fetchProducts();

  },[]);*/
  //axios is allowing our frontend to fecth from our backend.Note since we made a proxy in package.json there is no need to write localhost:5000. we have written that in proxy 
  return (
    <>
        {isLoading?(
          <Loader/>
        ):error?(<Message variant='danger'>{error?.data?.message||error.error}</Message>):(<>
          <h1>Latest Product</h1>
        <Row>
            {products.map((product)=>(
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
            ))}
        </Row>
        </>)}
       
    </>
  )
}

export default HomeScreen