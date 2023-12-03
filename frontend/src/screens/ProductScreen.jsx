//This is the screen which will open up when you click on the product
//The url will be directed based on the productid.We're going to need to get the ID from the URL .This is done with a hook called UseParams
import React, { useState } from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import { useGetProductDetailsQuery } from '../slices/productsApiSlice'
import { addToCart } from '../slices/cartSlice'
//import {useEffect,useState} from 'react'
//import axios from 'axios'
import {Link} from 'react-router-dom'
import {Form,Row,Col,Image,ListGroup,Card,Button, ListGroupItem} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
const ProductScreen = () => {
    const{id:productId}=useParams();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [qty,setQty]=useState(1);
   
    const{data:product,isLoading,error}=useGetProductDetailsQuery(productId);
    const addToCartHandler=()=>{
        dispatch(addToCart({...product,qty}));
        navigate('/cart');

    }
    //const[product,setProduct]=useState({});
    //const {id:productId}=useParams();//renaming id to productid
    /*useEffect(()=>{
        const fetchProduct=async()=>{
            const {data}=await axios.get(`/api/products/${productId}`);
            setProduct(data);
        }
        fetchProduct();

    },[productId]);*/
    //data is now being fetched from backend products file into our frontend
    //const product=products.find((p)=>p._id===productId);//taking products array coming from products.js and find where p_id=productId
    
    //A button to return back to homescreen
    //selected item displayed along with image ,description,reviews and price

    return (
    <>
    <Link className='btn btn-light my-3' to='/'>
        Go Back
    </Link>
    {isLoading?<Loader/>:error?(<Message variant='danger'>{error?.data?.message||error.error}</Message>):( <Row>
    <Col md={5}>
    <Image src={product.image} alt={product.name} fluid/>
    </Col>


    <Col md={4}>
    <ListGroup variant='flush'>
        <ListGroup.Item>
            <h3>{product.name}</h3>
        </ListGroup.Item>
        <ListGroup.Item>
        <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
        </ListGroup.Item>
        <ListGroup.Item>
        Price: ${product.price}
        </ListGroup.Item>
        <ListGroup.Item>
        Description: {product.description}
        </ListGroup.Item>
    </ListGroup>
    </Col>


    <Col md={3}>
        <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <Row>
                        <Col>Price:</Col>
                        <Col>
                            <strong>${product.price}</strong>
                        </Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>Status:</Col>
                        <Col>
                            <strong>{product.countInStock>0?'In Stock':'Out of stock'}</strong>
                        </Col>
                    </Row>
                </ListGroup.Item>
                {product.countInStock>0&&(
                    <ListGroup.Item>
                    <Row>
                        <Col>Qty</Col>
                        <Col>
                            <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e)=>setQty(Number(e.target.value))}>
                            {[...Array(product.countInStock).keys()].map((x)=>(
                                <option key={x+1} value={x+1}>
                                    {x+1}
                                </option>
                            ))}
                            </Form.Control>
                        </Col>
                    </Row>
                    </ListGroup.Item>
                )}

                <ListGroup.Item>
                    <Button className='btn-block'
                    type='button'
                    disabled={product.countInStock===0}
                    onClick={addToCartHandler}>
                        Add to cart
                    </Button>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    </Col>
    </Row>)}
   
    
    </>
  )
};

export default ProductScreen

//When we click the add to cart button,we are calling the add to cart handler,then we are dispatching the add to cart action which is being exported from our CartSlice.js. This is going to calculate everything up and put it in local storage