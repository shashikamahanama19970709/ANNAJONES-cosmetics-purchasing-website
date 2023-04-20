import React from 'react'
import styled from 'styled-components'
import { useStateValue } from '../StateProvider';
import { useNavigate } from 'react-router-dom';

function Navbar( ) {
    const [{basket,user},dispatch] = useStateValue();
    const navigate =useNavigate();

    const SignOut = ()=>{
        dispatch({
            type:"SET_USER",
            user:null,
        });

        localStorage.removeItem("user");
        navigate("/");
    }



  return (
    <Container>
    <Inner>

    <Logo  onClick={()=> navigate('/')}>

        <img src="logotry1.jpg"/>
    </Logo>


    <SearchBar>
        <input type="text" placeholder='search here......'/>
        <SearchIcon onClick={()=>navigate('/addproduct')}>
            <img src="search.png" alt="" />
        </SearchIcon>
    </SearchBar>

    <RightContainer>
        <NavButton 
            // onClick={user ?()=> SignOut():()=> navigate("/login")}
         >
        
            {/* <p>Hello,</p> */}
            <p  onClick={user ?()=> SignOut():()=> navigate("/login")}>{user ? user ?.fullName:"Sign in"}</p>

            <p  onClick={user ?()=> SignOut():()=> navigate("/signup")}>{user?"SignOut":"Sign up"}</p>
        </NavButton>

        <NavButton onClick={()=> navigate('/Order')}>
            <p>return</p>
            <p>Orders</p>
        </NavButton>
        <BasketButton onClick={()=> navigate('/checkout')}>
            <img src="basket-icon.png" alt="" />
            <p>{basket?.length}</p>
        </BasketButton>
    </RightContainer>
    </Inner>
    {/* when click search icon it navigate tothe add product page */}
    <MobileSeachBar>
        <input type="text" placeholder='search here......'/>
        <SearchIcon onClick={()=>navigate('/addproduct')}>
            <img src="search.png" alt="" />
        </SearchIcon>
    </MobileSeachBar>

    </Container>
  )
}


const Container=styled.div`
    width:100%;
    height:60px;
    background-color:#131921;
    display:flex;
    align-items:center;
    position:relative;

    @media only screen and (max-width:767px){
        height:170px;
        flex-direction:column;
    }
`;

const Inner =styled.div`
    width:100%;
    display:flex;
    align-items:center;

    @media only screen and (max-width:767px){
        justify-content:space-between;
    }
`;

const Logo =styled.div`
    margin-left:20px;
    cursor:pointer;
    img{
        width:100px;
        margin-top:10px;

    }
`;

const SearchBar=styled.div`
    height:35px;
    // flex=1 means it covers emplty entire space
    flex:1;
    margin:0px 15px;
    display:flex;
    align-items:center;
    border-radius:0px 5px 5px 0px;

    input{
        flex:1;
        width:100%;
        height:100%;
        border:none;
        border-radius:5px 0px 0px 5px;

        &::placeholder{
            padding-left:5px;
        }
    }
    @media only screen and (max-width:767px){
        display:none;
    }

`;

const MobileSeachBar = styled.div`
   height:35px;
   width:90%;
   display:flex;
   align-items:center;
   padding:10px;
   
   
   input{
    flex:1;
    width:100%;
    height:100%;
    border:none;
    border-radius:5px 0px 0px 5px;

    &::placeholder{
        padding-left:10px;

    }

   }
   @media only screen and (min-width:767px){
    display:none;
   }

`;

const RightContainer =styled.div`
    display:flex;
    align-items:center;
    width:fit-content;
    justify-content:space-around;
    height:100%;
    padding:5px 15px;
`;

const SearchIcon =styled.div`
    background-color:#feb069;
    height:100%;
    width:40px;
    display:flex;
    align-items:center;
    justify-content:center;

    img{
        width:22px;
       
    }
   
`;

const NavButton =styled.div`
    color:#fff;
    padding:5px;
    height:80%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    cursor:pointer;
    margin-right:15px;

    p{
        &:nth-child(1){
            font-size:12px;

        }
        &:nth-child(2){
            font-size:14px;
            font-weight:600;
        }
    }

`;

const BasketButton=styled.div`
    display:flex;
    aline-items:row;
    align-items:center;
    hieght:90%;
    cursor:pointer;

    img{
        width:30px;
        margin-right:10px;

    }
    p{
        color:white;
        font-weight:500;
    }
`;


export default Navbar
