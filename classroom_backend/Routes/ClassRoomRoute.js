const express=require('express');
const router=express.Router();
const {body,validationResult}=require('express-validator')
const classroom=require('../schema/ClassRoomSchema');
const user=require('../schema/UserSchema')
router.get('/getClassRooms',async (req,res)=>{
    let sucess=false;
    let roomname=await classroom.find();
    console.log(roomname);
    return res.json({rooms:roomname});
});
//Route to add classRoom
router.post('/AddClassRoom',[
    body('classroomName','minlength should be atleast 1').isLength({min:1}),
    body('schedule','Schedule is required and should be an array of objects').isArray().notEmpty()
  ],async(req,res)=>{
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    let roomname=await classroom.findOne({classroomname:req.body.classroomName});
    if(roomname!=null)
    {
     return res.status(400).json({error:"classRoom Already exists"});   
    }
    const details=await classroom.create({
        classroomname:req.body.classroomName,
        Schedule:req.body.schedule
    });
    success = true;
    return res.status(201).json({ success, msg: details });
});

//Add members to classroom
router.get('/AddStudent/:classroomid',async (req,res)=>{
    let classid=req.params.classroomid;
    console.log(classid);
    let stuid=req.body.studentid;
    let student = await user.findById(stuid);
    if(student==null)
    {
        return res.status(400).json({error:"user not exists"})
    }
    if(student.assign==true)
    {
        return res.status(400).json({error:"Student already belongs to different classroom"});
    }
    let classroomtemp = await classroom.findById(classid);
    if(classroomtemp==null)
    {
     return res.status(400).json({error:"Classroom does not exist"});       
    }
    classroomtemp.Students.push(student._id);
    await classroomtemp.save();

    student.assign = true;
    await student.save();
    return res.status(200).json({ success: true, message: "Student added to classroom", classroom: classroomtemp });
});
//Assign Teacher
router.post('/AssignTeacher/:classroomid',async (req,res)=>{
    let classid=req.params.classroomid;
    console.log(classid);
    let stuid=req.body.teacherid;
    let teacher = await user.findById(stuid);
    console.log(teacher)
    if(teacher==null)
    {
        return res.status(400).json({error:"user not exists"})
    }
    if(teacher.assign==true)
    {
        return res.status(400).json({error:"Teacher already belongs to different classroom"});
    }
    let classroomtemp = await classroom.findById(classid);
    if(classroomtemp==null)
    {
     return res.status(400).json({error:"Classroom does not exist"});       
    }
    if(classroomtemp.Teacher!=null)
    {
        return res.json({success:false});
    }
    classroomtemp.Teacher=teacher.id;
    await classroomtemp.save();
    teacher.isAssigned = true;
    await teacher.save();
    return res.status(200).json({ success: true, message: "Teacher assigned to classroom", classroom: classroomtemp });
});

//Edit the details
router.post('/Edit/:personid',async (req,res)=>{
    let person=req.params.personid;
    let tuser=await user.findById(person);
    if(tuser==null)
    {
        return res.status(400).json({error:"user not exist"});
    }
    let {name}=req.body;
    tuser.name=name;
    tuser.email=email;
    tuser.isAssigned=isAssigned;
    await tuser.save();
    return res.json({sucess:true,details:tuser});
});
//fetch teacher
router.get('/getperr/:id',async (req,res)=>{
    const userid=req.params.id;
    let userr=await user.findById(userid);
    if(userr!=null)
    {
        return res.json({sucess:true,person:userr.name});
    }
    return res.json({sucess:false});
})
//route to get count
router.get('/getcount',async (req,res)=>{
    const studentCount = await user.countDocuments({ isStudent: true });
    const teacherCount = await user.countDocuments({ isTeacher: true });
    const classcount=await classroom.countDocuments();
    return res.json({classes:classcount,teachers:teacherCount,students:studentCount});
});
module.exports=router;