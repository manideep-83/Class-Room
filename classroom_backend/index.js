const connectToMango=require('./db')
const express=require('express')
const app=express();
var cors=require('cors');
app.use(cors(
    origin:["https://deploy-mern-1whq.vercel.app"],
    methods:["POST","GET","DELETE"],
    credentials:true
));

app.use(express.json());
app.get('/',(req,res)=>{
    res.send("hi");
});
app.use('/auth/Validateuser',require('./Routes/UserRoutes'));
app.use('/auth/class',require('./Routes/ClassRoomRoute'));
app.listen(5000,()=>{
    console.log("connection established");
});
connectToMango()
