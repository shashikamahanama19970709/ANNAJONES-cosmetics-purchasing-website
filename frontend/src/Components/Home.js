import React, { useEffect,useState } from 'react'
import styled from 'styled-components'
import Navbar from './Navbar';
import Cartt from './Cartt';
import axios from '../axios';


function Home() {

    const[products,setProducts] = useState("");
    //useEffect use to run the data before rendering
    //useEffect runs every time the page refreash
    useEffect(()=>{
        const fetchdata = async () =>{
            const data = await axios.get('/products/get');
            setProducts(data);
        };
        fetchdata();
    },[]);

  return (
    <Container>
    <Navbar />
    <Banner>
        <img src="./img1/im6.jpg" alt="" />
        <img src="./img/e4.jpg"/>
        
    </Banner>

    <Main>

        {
            products && products?.data.map((product)=>(
                <Cartt 
                id={product._id} 
                image={product.imageURL}
                price={product.price}
                rating={product.rating}
                title={product.title}
                />
        

            ))
        }
       
      




    </Main>

    </Container>
  )
}


const Container = styled.div`
    width:100%;
    background-color:rgb(237,237,237);

`;
const Banner = styled.div`
    width:100%;
  
   
        background-position: center;
    img{
        
        width:100%;
        -webkit-mask-image:linear-gradient(
            to bottom,
            rgba(0,0,0,1),
            rgba(0,0,0,0.85),
            rgba(0,0,0,0.75),
            rgba(0,0,0,0.55),
            rgba(0,0,0,0)
            );

            &:nth-child(2) {
                display:none;
            }
            @media only screen and (max-width:767px){
                &:nth-child(1) {
                    display:none;
                }
                &:nth-child(2){
                    display:block;
                }
            }
    }

`;

const Main = styled.div`
    display:grid;
    justify-content:center;
    place-items:center;
    width:100%;
    
    grid-auto-rows:420px;
    grid-template-columns:repeat(4,280px);
    grid-gap:20px;


    // mobile version

    @media only screen and (max-width:767px){
        grid-template-columns:repeat(2,50%);
        grid-gap=0;
        margin-top:-350px;
        padding:10px 0px;
    }

    //tablet version

    @media only screen and (min-width:767px) and (max-width:1200px) {
        grid-template-columns:repeat(3,30%);
     
    }

    @media only screen and (min-width:767px){
        margin-top:-300px;
        padding:10px 0px;
    }
`;

export default Home
