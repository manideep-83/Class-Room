const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    name:{
        type:String,
        default:"user"
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isStudent:{
        type:Boolean,
        default:false
    },
    isTeacher:{
        type:Boolean,
        default:false
    },
    isPrincipal:{
        type:Boolean,
        default:false
    },
    isAssigned:{
        type:Boolean,
        default:false
    }

},{timestamps :true, timeZone: 'Asia/Kolkata'});

module.exports=mongoose.model('User',userSchema,'UserDetails');