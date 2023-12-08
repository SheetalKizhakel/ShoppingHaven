import React from 'react'
import {Navbar,Nav,Container,Badge, NavDropdown} from 'react-bootstrap';
import {FaShoppingCart,FaUser} from 'react-icons/fa';/*importing the shopping cart icons from font awesome icons*/
import logo from '../assets/logo.png'
import {LinkContainer} from 'react-router-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice';
import SearchBox from '../components/SearchBox';
import {logout} from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
/*Wrap your React Bootstrap element in a <LinkContainer> to make it behave like a React Router <Link>
<LinkContainer> accepts same parameters as React Router's <NavLink>. It is required for embedding links in navbars*/
const Header = () => {
  const{cartItems}=useSelector((state)=>state.cart);//logic to show number of items in our cart in header
  const{userInfo}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [logoutApiCall]=useLogoutMutation();
  const logoutHandler=async()=>{
   try{
    await logoutApiCall().unwrap();
    dispatch(logout());
    navigate('/login');
   }
   catch(err)
   {
    console.log(err)
   }

  }
  return (
    <header>
    <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
    <Container>
    <LinkContainer to='/'>
  <Navbar.Brand style={{ margin: 0, padding: '0px'}}>
    <img src={logo} alt='ShoppingHaven' style={{ width: 150, margin: 0, padding: 0, marginRight: '0px' }} />
    ShoppingHaven
  </Navbar.Brand>
</LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            <SearchBox/>
            <LinkContainer to='/cart'>
                <Nav.Link><FaShoppingCart/>Cart
                {cartItems.length>0&&(<Badge pill bg='success' style={{marginLeft:'5px'}}>
                  {cartItems.reduce((a,c)=>a+c.qty,0)}
                </Badge>)}
                </Nav.Link>
                </LinkContainer>
                {userInfo?(
                  <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>

                  </NavDropdown>
                ):( <LinkContainer to='/login'>
                <Nav.Link href='/login'><FaUser/>Sign In</Nav.Link>
                </LinkContainer>)}
                  {/*a dropdown i want visible only if user is admin*/}
                  {userInfo&&userInfo.isAdmin&&(
                    <NavDropdown title='Admin' id='adminmenu'>
                      <LinkContainer to='/admin/productlist'>
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/orderlist'>
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}

               
            </Nav>
        </Navbar.Collapse>

    </Container>

    </Navbar>

    </header>
  )
}

export default Header
/*We have created an arrow function for Header file*/