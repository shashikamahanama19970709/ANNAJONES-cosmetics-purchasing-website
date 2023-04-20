
import React, { useState } from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import styled from "styled-components";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import CheckOut from "./Components/CheckOut";
import Address from "./Components/Address";
import Payments from "./Components/Payments";
import AddProduct from "./Components/AddProduct";
import Orders from "./Components/Orders";
// import {Elements} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
const promise = loadStripe(
  "pk_test_51Mv3phJFksDXPTtIwcBdAkVxDFyLrUUdROqapeBZj2PVOXKWvxKygRFgUrlKTxgV5p1Eqy9Kh3nKYPclIcLq6lXL00PEnYa1He"
);

function App() {
  // make it empty array we have to add diffrent item
  // const[basket, setBasket] = useState([]);
  // console.log("basket >>>>", basket);

  return (
    <Router>
      <Container >
        <Routes>
        <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/checkout" element={<CheckOut/>}/>
          <Route path="/address" element={<Address/>}/>
          <Route path="/addproduct" element={<AddProduct/>}/>
          <Route path="/Order" element={<Orders/>}/>

          <Route path="/payment" 
          element={<Elements stripe={promise}><Payments/></Elements>}/>
        </Routes>
    </Container>
    </Router>
    
  );
}

const Container = styled.div``
export default App;
