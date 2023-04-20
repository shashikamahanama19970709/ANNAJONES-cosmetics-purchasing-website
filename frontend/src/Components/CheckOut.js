import React from 'react';
import { useStateValue } from '../StateProvider';
import styled from 'styled-components';
import Navbar from './Navbar';
import { Button } from '@material-ui/core';
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from '../reducer';
import { useNavigate } from "react-router-dom";

function CheckOut() {
    const [{basket},dispatch]= useStateValue();
    //navigate functoin use to go to one page to another
    const navigate = useNavigate();
    const removeFromBasket = (e,id)=>{
        e.preventDefault();

        dispatch({
            type:"REMOVE_FROM_BASKET",
            id:id,
        });
    };





    console.log("checkout>>>>",basket);
  return (
    <Container>
      <Navbar/>

      <Main>
        <ShoppingCard>
        <h2>shopping cart</h2>

        {
        basket?.map((product)=>(

        <Product>

            <Image>
                <img src={product.image} alt="" />
            </Image>
            <Disciption>
                <h4>{product.title}</h4>
                <p>Rs.{product.price}</p>
                <button onClick={(e)=>removeFromBasket(e,product.id)}>Remove</button>
            </Disciption>

        </Product>

            ))
}

{/* 
        <Product>

            <Image>
                <img src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/31P-JgguucL._SX300_SY300_QL70_FMwebp_.jpg" alt="" />
            </Image>
            <Disciption>
                <h4>Hydrocolloid Acne Pimple Patch</h4>
                <p>Rs.1200</p>
                <Button>Remove</Button>
            </Disciption>

        </Product> */}

        

        </ShoppingCard>

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
           <button onClick={()=>navigate("/address")}>Proceed to Checkout</button>
        </SubTotal>

      </Main>


    </Container>
  )
}


const Container = styled.div`
    width:100%;
    max-width:1400px;
    height:fit-content;
    margin:auto;
    background-color:rgb(234,237,237);
    border:1px solid red;
    position:relative;

`;

const Main = styled.div`
    display:flex;
    padding:15px;
    

    @media only screen and (max-width:1200px){
        flex-direction:column;

    }

`;

const ShoppingCard = styled.div`
    padding:10px;
    background:#fff;
    flex:0.7;

    h2{
        font-weight:500;
        border-bottom:1px solid lightgray;
        padding-bottom:15px;
    }

    @media only screen and (max-width:1200px){
        flex:none;
        
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

//const CurrencyFormat=styled.div``;
export default CheckOut;
