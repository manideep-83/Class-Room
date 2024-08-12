const express=require('express')
const router=express.Router();
const user=require('../schema/UserSchema')
const {body,validationResult}=require('express-validator')
const bcrypt = require('bcryptjs');
const JWT_SIGN="Mani";
const jwt=require('jsonwebtoken');
const fetchuser=require('../middlewear/fetchuser')

//route to signup 
router.post('/AddPerson',[
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid password of minimum length 2').isLength({min:2})
],async(req,res)=>{
    let sucess=false;
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({ sucess,errors: errors.array() });
    }
    const existed_user=await user.findOne({email:req.body.email});
    const user_name=await user.findOne({name:req.body.username});
    if(existed_user)
    {
        return res.status(400).json({sucess,error:"Email Already Exists"});
    }
    const salt= await bcrypt.genSalt(10);
    const pass=bcrypt.hashSync(req.body.password, salt);
    const userdetails=await user.create({
        name:req.body.name,
        email:req.body.email,
        password:pass,
        isTeacher:req.body.isTeacher,
        isStudent:req.body.isStudent,
        isPrincipal:req.body.isPrincipal
    });
    const payload={id:userdetails.id};
    const jwtsi=jwt.sign(payload,JWT_SIGN);
    sucess=true,
    res.json({sucess, authToken: jwtsi });
});
// Login
router.post('/Login',[body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid password').isLength({min:5})
],async (req,res)=>{
    let sucess=false;
    const errors= validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ sucess,errors: errors.array() });
    }
    const check=await user.findOne({email:req.body.email});
    if(check==null)
    {
        return res.status(400).json({sucess, errors: "Enter valid credentials "}); 
    }
    try{
    let pass= await bcrypt.compare(req.body.password,check.password);
    if(!pass){
        return res.status(400).json({sucess,error:"please enter valid Credentials"});
    }
    const payload={
        id: check.id
    };
    const token=jwt.sign(payload,JWT_SIGN);
    sucess=true;
    res.json({sucess,authToken:token});
    }
    catch(error){
        res.status(400).json({sucess,error:"please enter valid Credentials"});
    }
});
//authtoken -> user details
router.get('/fetchuser',fetchuser,async (req,res)=>{
    const authorizedid=req.id;
    console.log(authorizedid);
    const check=await user.findById(authorizedid);
    if(!check)
    {
        return res.status(400).json({error:"User not verified"})
    }
    res.json({sucess:check});
});
//fetch All Teachers other than the one logged in
router.get('/getAllTeachers',fetchuser,async (req,res)=>{
    const authorizedid=req.id;
    const Teacher=await user.find({isTeacher:true});
    res.json({user:Teacher});
 });
//fetch All Students
router.get('/getAllStudents',fetchuser,async (req,res)=>{
    const authorizedid=req.id;
    const Students=await user.find({isStudent:true});
    res.json({user:Students});
 });
 //edit the details
 router.post('/editdetails/:id',fetchuser,async (req,res)=>{
    const userid=req.params.id;
    let User=await user.findById(userid);
    let {name}=req.body;
    User.name=name;
    await User.save();
    return res.json({sucess:true,details:User});
 })
 //delete the user
 router.delete('/delete/:id',async (req,res)=>{
    const userid=req.params.id;
    let User=await user.findById(userid);
    if(User!=null)
    {
        let deletuser=await user.findByIdAndDelete(userid);
        res.json({sucess:true,message:"deleted the user sucessfully"});
    }
 })



module.exports=router;