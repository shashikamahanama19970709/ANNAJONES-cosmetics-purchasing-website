import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Navbar from './Navbar';
import { getBasketTotal } from '../reducer';
import { Navigate, useNavigate } from 'react-router-dom';
import CurrencyFormat from "react-currency-format";
import { useStateValue } from '../StateProvider';
import { CardElement,useElements,useStripe } from '@stripe/react-stripe-js';
import axios from '../axios';

function Payments() {

    //get can get address details and user details direcly by this

    const [{address,basket,user},dispatch]=useStateValue();
    // const [{address,basket}] = useContext(StateContext);
    const [clientSecret, setClientSecret] = useState("");

    const elements = useElements();
    const stripe = useStripe();
    const navigate = useNavigate();

    //have to get the clientSecret befor refresg payement page 
    //so use UseEffect in here
    
    useEffect(() =>{
        const fetchClientSecret = async () => {
            const data = await axios.post("/payment/create", {
              amount: getBasketTotal(basket),
            });
      
            setClientSecret(data.data.clientSecret);
            console.log("clientSecret is >>>>", data.data.clientSecret);
          };
      
          fetchClientSecret();
        
        }, []);


        const confirmPayment = async(e) =>{
            e.preventDefault();

            await stripe.confirmCardPayment(clientSecret,{
                payment_method:{
                    card:elements.getElement(CardElement),
                },
            })
            .then((result)=>{
              
 //here we add order details  to order table


                axios.post('/orders/add',{
                    basket:basket,
                    price:getBasketTotal(basket),
                    email:user?.email,
                    address:address,
            });






                dispatch({
                    type:"EMPTY_BASKET"
                })
                navigate("/");
            })
            .catch(err => console.warn(err));
        }

  return (
    <Container>
      <Navbar/>
      <Main>
        <ReviewContainer>
            <h2>Review your order</h2>
            <AddressContainer>
                <h5>Shipping Address</h5>
                <div>
                    <p>{address.fullname}</p>
                    <p>{address.flat}</p>
                    <p>{address.area}</p>
                    <p>{address.landmark}</p>
                    <p>{address.city} {address.state}</p>
                   
                    <p>Phone : {address.phone}</p>
                </div>
            </AddressContainer>

            <PaymentContainer>
                <h5>Payment method</h5>

                <div>
                    <p>Card Details</p>
                    {/* {Card Element} */}
                    <CardElement/>
                </div>
            </PaymentContainer>

            <OrderContainer>
                <h5>Your Order</h5>

                <div>
                {
        basket?.map((product)=>(

        <Product>

            <Image>
                <img src={product.image} alt="" />
            </Image>
            <Disciption>
                <h4>{product.title}</h4>
                <p>Rs.{product.price}</p>
              
            </Disciption>

        </Product>

            ))
}
                </div>
            </OrderContainer>



        </ReviewContainer>

        <SubTotal>
            
            <CurrencyFormat renderText = {(value)=>(
                 <>
                 <p>
                     Subtotal ( {basket.length}  items  ):
                     <strong>{value}</strong>
                 </p>
                 <small>
                     <input type="checkbox"/>
                     <span>This Order contain gifts</span>
                 </small>
                 
                 
                 </>
 
            )}
            
            decimalScale={2}
            //calculate basket value when them added
            value={getBasketTotal(basket)}
            displayType='text'
            thousandSeparator={true}
            prefix='Rs.'
            
            
            />
            <button onClick={confirmPayment}>Place Order</button>
         </SubTotal>

      </Main>
    </Container>
  )
}

const Container =styled.div`
    width:100%;
    height:fit-content;
    max-width:1400px;
    background-color:rgb(234,237,237);
  

`;

const Main = styled.div`
    padding:15px;
    display:flex;
    @media only screen and (max-width:1200px){
        flex-direction:column;

    }
`;

const ReviewContainer=styled.div`
    background-color:#fff;
    flex:0.7;
    padding:15px;

    h2{
        font-weight:500;
        border-bottom:1px solid lightgray;
        padding-bottom:15px;
    }
`;

// const SubTotal=styled.div`
//     flex:0.3;
//     background-color:red;
//     margin-left:10px;
// `;

const AddressContainer=styled.div`
    margin-top:20px;

    div{
        margin-top:10px;
        margin-left:10px;

        p{
            font-size:14px;
            margin-top:4px;
        }
    }
`;

const PaymentContainer =styled.div`
    margin-top:15px;

    div{
        margin-top:15px;
        margin-left:15px;

        p{
            font-size:14px;
        }
    }


`;

const OrderContainer =styled.div`
    margin-top:30px;
    margin-left:15px;
`;

const Product = styled.div`
    display:flex;
    align-items:center;

`;

const Image =styled.div`
    flex:0.3;
    img{
        width:100%;
    }
`;

const Disciption = styled.div `
    flex:0.7;

    h4{
        font-size:18px;
        font-weight:600;
    }
    p{
        font-weight:600;
        margin-top:10px;
    }

    button{
        background-color:transparent;
        color:#1384b4;
        border:none;
        outline:none;
        margin-top:10px;
        cursor:pointer;
        
    &:hover{
        text-decoration:underline;
    }
    }

`;

const SubTotal = styled.div`
    flex:0.3;
    background-color:white;
    margin-left:15px;
    height:200px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;

    p{
        font-size:20px;
    }

    small{
        display:flex;
        align-items:center;
        margin-top:10px;

        span{
            margin-left:10px;
    
        }
    }
    button{
        width:65%;
        height:35px;
        margin-top:20px;
        background-color:#ffd814;
        border:none;
        outline:none;
        border-radius:8px;
    }
    @media only screen and (max-width:1200px){
        flex;none;
        margin-top:20px;

    }

`;

export default Payments
