import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import axios from '../axios';
function AddProduct() {

    const [title,setTitle] =useState("");
    const [imageURL,setImageUrl] =useState("");
    const [price,setPrice] =useState(0);
    const [rating,setRating] =useState(0);

    const addProduct =(e)=>{
        e.preventDefault();

        axios.post("/products/add",{title,imageURL,price,rating}).then(()=>{
            setTitle("");
            setImageUrl("");
            setPrice(0);
            setRating(0);
        }).catch((error)=>alert(error.message));
    };

  return (
    <Container>
    <Logo>
        <img src="logotry1.jpg" alt="" />
    </Logo>
    <FormContainer>
        <h3>Add Product</h3>
        <InputContainer>
        <p>Title</p>
        <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title}/>
        </InputContainer>
        <InputContainer>
        <p>Image Url</p>
        <input type="text" onChange={(e)=>setImageUrl(e.target.value)} value={imageURL}/>
        </InputContainer>
        <InputContainer>
        <p>Price</p>
        <input type="number" onChange={(e)=>setPrice(e.target.value)} value={price}/>
        </InputContainer>
         <InputContainer>
        <p>Rating</p>
        <input type="number" onChange={(e)=>setRating(e.target.value)} value={rating}/>
        </InputContainer>

        <Button onClick={addProduct}>
            Add Product
        </Button>
{/* 
        <InfoText>
        We're excited to join you on your
         fashion journey

        </InfoText> */}

    </FormContainer>
    
    </Container>
  );
}
const Container = styled.div`
    width : 40%;
    min-width:450px;
    height: fit-content;
    padding:15px;
    margin:auto;
    display:flex;
    flex-direction:column;
    align-items:center;
    
  
`;
const Logo = styled.div`
    padding:0;
    width:200px;
    img{
        width:100%;
    }
`;

const FormContainer =styled.form`
    border:1px solid lightgray;
    width:55%;
    height:fit-content;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    padding:15px;

    h3{
        font-size:28px;
        font-weight:400;
        line-height:0px;
        align-self:flex-start;
    }

`;
const InputContainer =styled.div`
    width:100%;
    padding:10px;
    p{
        font-size:14px;
        font-weight:600;
    }

    input{
        width:95%;
        height:36px;
        padding-left:5px;
        border-radius:5px;
        border:1px solid lightgray;
        margin-top:5px;

        &:hover{
            border:1px solid black;
        }
    }

`;


const Button =styled.button`
    width:70%;
    height:40px;
    background-color:#f3b414;
    border:none;
    outline:none;
    border-radius:10px;
    margin-top:10px;


`;
const InfoText = styled.p`


`;

const SignUpButton = styled.button`
    width:55%;
    hight:45px;
    font-size:14px;
    margin-top:30px;


    &:hover{
        background-color:#dfdfdf;
        border:1px solid darkgray;
    }
`;

export default AddProduct
