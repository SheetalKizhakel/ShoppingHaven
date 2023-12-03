import React from 'react'
import {Navbar,Nav,Container,Badge} from 'react-bootstrap';
import {FaShoppingCart,FaUser} from 'react-icons/fa';/*importing the shopping cart icons from font awesome icons*/
import logo from '../assets/logo.png'
import {LinkContainer} from 'react-router-bootstrap'
import {useSelector} from 'react-redux'
/*Wrap your React Bootstrap element in a <LinkContainer> to make it behave like a React Router <Link>
<LinkContainer> accepts same parameters as React Router's <NavLink>. It is required for embedding links in navbars*/
const Header = () => {
  const{cartItems}=useSelector((state)=>state.cart);//logic to show number of items in our cart in header
  return (
    <header>
    <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
    <Container>
    <LinkContainer to='/'>
        <Navbar.Brand><img src={logo} alt='ProShop'/>ProShop</Navbar.Brand>
      </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            <LinkContainer to='/cart'>
                <Nav.Link><FaShoppingCart/>Cart
                {cartItems.length>0&&(<Badge pill bg='success' style={{marginLeft:'5px'}}>
                  {cartItems.reduce((a,c)=>a+c.qty,0)}
                </Badge>)}
                </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/login'>
                <Nav.Link><FaUser/>Sign In</Nav.Link>
                </LinkContainer>
            </Nav>
        </Navbar.Collapse>

    </Container>

    </Navbar>

    </header>
  )
}

export default Header
/*We have created an arrow function for Header file*/