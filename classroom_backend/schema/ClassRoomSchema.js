const mongoose=require('mongoose')
const ClassRoomSchema=mongoose.Schema({
    classroomname:{
        type:String,
        required:true,
        unique:true
    },
    Students:[{
        type:mongoose.Types.ObjectId,
        ref:"User"
        }
    ],
    Teacher:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    Schedule: [{
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        },
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            required: true
        }
    }]
},{timestamps :true, timeZone: 'Asia/Kolkata'});
module.exports=mongoose.model('Classroom',ClassRoomSchema,'ClassRoomDetails');