const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const Products = require("./Products");
const stripe = require("stripe")("sk_test_51Mv3phJFksDXPTtIaUqBRMUPSixoa6YKWBrTNWggDxcts6bdnviyavHuAjask25CK0kykrWi9SnzMMT8hBFAZjyW001EbRQBtK");
const Orders =require('./Orders');
const Users =require("./Users");
const bcrypt = require("bcryptjs");
const app=express();
const port=3001


//middleware mendatory to run any project in node js
app.use(express.json());
app.use(cors());

//connection

const connection_url="mongodb+srv://amazon:amazon@cluster2.ni024qx.mongodb.net/Cluster2?retryWrites=true&w=majority"
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

//creating API
//when ever we in home page send hello world messge
app.get('/',(req,res)=> res.status(200).send("home page"));


//add product
//create product table and add data to it
app.post("/products/add",(req,res)=>{
    const productDetail = req.body;
    console.log("product Detail >>>>>",productDetail);

    //  Products.create(productDetail, (err,data)=>{
    //      if(err){
    //          res.status(500).send(err.message);
    //         console.log(err);
    //     }else{
    //         res.status(201).send(data);
    //     }
    // }
       
    // );
    Products.create(productDetail).then(data =>{
        res.status(201).send(data);
    })
    .catch(err =>{
        res.status(500).send(err.message);
          console.log(err);
    })

});

//api for get data from database to frontend

app.get('/products/get', async(req,res)=>{


    // Products.find((err,data)=>{
    //     if(err){
    //         res.status(500).send(err);
    //     }else{
    //         res.status(200).send(data);
    //     }
    // });

    try{
        const data = await Products.find({});
        res.send(data);
    }catch(err){
        console.error(err);
        res.status(500).send(err);
    }






});

//api for sign up
//send uname pw
// app.post("/auth/signup", async (req, res) => {
//     const { email, password, fullName } = req.body;
  
//     const encrypt_password = await bcrypt.hash(password, 10);
  
//     const userDetail = {
//       email: email,
//       password: encrypt_password,
//       fullName: fullName,
//     };
  

//     const user_exist = await Users.findOne({ email: email });

//     if (user_exist) {
//       res.send({ message: "The Email is already in use !" });
//     } else {
//       Users.create(userDetail, (err, result) => {
//         if (err) {
//           res.status(500).send({ message: err.message });
//         } else {
//           res.send({ message: "User Created Succesfully" });
//         }
//       });
//     }
//   })
//latest code for signup
app.post("/auth/signup", async (req, res) => {
    const { email, password, fullName } = req.body;
    

    // if (!email || !fullName) {
    //     res.status(400).send({ message: "Email and full name are required fields" });
    //     return;
    //   }
    const encrypt_password = await bcrypt.hash(password, 10);
  
    const userDetail = {
      email: email,
      password: encrypt_password,
      fullName: fullName,
    };
  
    const user_exist = await Users.findOne({ email: email });
  
    if (user_exist) {
      res.send({ message: "The Email is already in use !" });
    } else {
      try {
        const result = await Users.create(userDetail);
        res.send({ message: "User Created Succesfully" });
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    }
  });
  












// API for LOGIN

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
  
    const userDetail = await Users.findOne({ email: email });
  
    if (userDetail) {
      if (await bcrypt.compare(password, userDetail.password)) {
        res.send(userDetail);
      } else {
        res.send({ error: "invaild Password" });
      }
    } else {
      res.send({ error: "user is not exist" });
    }
  });
















//api for payments
app.post("/payment/create",async(req,res)=>{
    const total = req.body.amount;
    console.log('Payment Request recived for this request ',total);

    const payment = await stripe.paymentIntents.create({
        amount : total *1000,
        currency: "lkr",
    });

    res.status(201).send({
        clientSecret : payment.client_secret,
    });

});



//api o add ORDER DETAIL page 
app.post('/orders/add',(req,res)=>{
    const products=req.body.basket;
    const price=req.body.price;
    const email=req.body.email;
    const address=req.body.address;


     const orderDetail ={
        products:products,
        price:price,
        address:address,
        email:email,
     };
    

    //  Orders.create(orderDetail,(err,result)=>{
    //     if(err){
    //         console.log(err)
    //     }else{
    //         console.log('order added to database >>>>',result);
    //     }
    //  });


    //create Order table and 
    //add order dedatils to that table
    Orders.create(orderDetail)
    .then(result =>{
        console.log(result);
    })
    .catch(err=>{
        console.error(err);
    })

});

//get orderdetils form mongo
//and put them in Order page in frontend



//filter orders by its email
// app.post("/orders/get",(req,res)=>{
//     const email = req.body.email;

//     //find orders happen by same email address and send those user orders
//     Orders.find((err,result)=>{
//         if(err){
//             console.log(err);
//         }else{
//             const userOrders=result.filter((order)=>order.email === email);
//             res.send(userOrders);
//         }
//     });

// });

app.post("/orders/get", async (req, res) => {
    const email = req.body.email;
  
    try {
      const userOrders = await Orders.find({ email: email });
      res.send(userOrders);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error retrieving user orders");
    }
  });
  





app.listen(port,()=> console.log("listning on the port",port));