//We will have a couple of forms , the login form,the register etc.So we will wrap it in a form
import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'

const FormContainer = ({children}) => {
  return (
    <Container>
        <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
                {children}
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer