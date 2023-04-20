import React, { useState } from 'react'
import styled from 'styled-components'
import Navbar from './Navbar';
import { useStateValue } from '../StateProvider';
import { useNavigate } from 'react-router-dom';

function Address() {

    const [{},dispatch] = useStateValue()
    const [fullname ,setFullname] =useState(" ");
    const [phone,setPhone]=useState("");
    const [flat,setFlat]=useState("");
    const [area,setArea]=useState("");
    const [landmark,setLandmark]=useState("");
    const [city,setCity]=useState("");
    const [state,setState]=useState("");

    const navigate = useNavigate();

    const deliver = (e) =>{
        e.preventDefault()

        dispatch({
            type:'SET_ADDRESS',
            item:{
                fullname,
                phone,
                area,
                landmark,
                city,
                state,
            },
            
        });
        navigate("/payment")
    };

//in here setState use to get value form text boxes

  return (
    <Container>
        
        <Navbar/>
        <Main>
        <FormContainer>
        <InputContainer>
        <p>Full Name</p>
        <input
         onChange={(e)=>setFullname(e.target.value)} 
       
         type="text" 
         placeholder='Sam Smith'
         value={fullname}
         />
        </InputContainer>
        <InputContainer>
        <p>Phone Number</p>
        <input 
          onChange={(e)=>setPhone(e.target.value)} 
          type="text" 
         value={phone}
        />
        </InputContainer>
        <InputContainer>
        <p>Flat,House no, Building,Company,Apartment </p>
        <input 
        onChange={(e)=>setFlat(e.target.value)} 
        type="text" 
        value={flat}
        />
        </InputContainer>
        <InputContainer>
        <p>Area ,Colony, Street</p>
        <input 
        onChange={(e)=>setArea(e.target.value)} 
        type="text" 
        value={area} 
        />
        </InputContainer>
        <InputContainer>
        <p>Landmark</p>
        <input 
        onChange={(e)=>setLandmark(e.target.value)} 
        type="text" 
        value={landmark} 
        />
        </InputContainer>
        <InputContainer>
        <p>Town / City</p>
        <input 
        onChange={(e)=>setCity(e.target.value)} 
        type="text" 
        value={city} 
        />
        </InputContainer>
        <InputContainer>
        <p>State / Province</p>
        <input 
       onChange={(e)=>setState(e.target.value)} 
       type="text" 
       value={state} 
         />
        </InputContainer>


        <button onClick={deliver}>Deliver to this Address</button>

        </FormContainer>


        </Main>
       
     
    </Container>
  )
}

const Container = styled.div`
    width:100%;
    height:fit-content;
    max-width:1400px;
    margin:auto;
    background-color:rgb(234,237,237);
    position:relative;
`;

const FormContainer=styled.form`
    border:1px solid lightgray;
    width:55%;
    min-width:400px;
    height:fit-content;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    padding:15px;
    background-color:#fff;
    margin:auto;

    button{
        align-self:flex-start;
        height:33px;
        width:250px;
        margin-top:20px;
        background-color:#ffe32a;
        border:none;
        outline:none;
        cursor:pointer;
        border-radius:5px;

    }
`;

const Main =styled.div`
    padding:15px;
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

export default Address
