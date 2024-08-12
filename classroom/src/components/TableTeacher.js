import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ClassContext from "../context/classcontext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TableTeacher = (props) => {
  const storedDetails = JSON.parse(localStorage.getItem('details'));
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let context=useContext(ClassContext);
  const {editDetails,deleteuser,classroom,FetchClassRooms,assignTeacher}=context;
  const [assignOpen, setAssignOpen] = useState(false);
  const handleAssignOpen = async () => {
    setAssignOpen(true);
    FetchClassRooms();
   
  };
  console.log(classroom)
  const handleAssignClose = () => setAssignOpen(false);
  let data = props.data;
  const initial = {
    name: data.name || "",
    email: data.email || "",
    alloted: data.isAssigned || false,
    id:data._id
  };
  const [details, setDetail] = useState(initial);
  const temporarysave = (event) => {
    event.preventDefault();
    setDetail({
      ...details,
      [event.target.name]: event.target.value
    });
  
  };
  const notify = (msg) => {
    toast.success(msg);
  };
  const HandleSubmit=async (e)=>{
    e.preventDefault();
    handleClose();
    const msg=await editDetails(details);
    console.log(msg);
    notify(msg);
  }
  const HandleDelete=async (e)=>{
    e.preventDefault();
    const msg=await deleteuser(details);
    console.log(msg);
    notify(msg);
  }

  const handleClassroomAssignment=async (classroom,userid)=>{
    console.log(classroom);
    console.log(userid);
    const msg=await assignTeacher(classroom,userid);
    toast.success(msg);
    setAssignOpen(false);
  }
  

  return (
    <>
    <ToastContainer position="top-right" />
    <tr className="text-center">
      <td className="border-2 px-4 py-2">{data._id}</td>
      <td className="border-2 px-4 py-2">{data.name}</td>
     {storedDetails.isPrincipal?(<td className="border-2 px-4 py-2">
        <Button onClick={handleOpen}>Edit</Button>
      </td>):null}
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="flex-col">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Details
          </Typography>
          <div className="flex flex-col">
          
            <form onSubmit={HandleSubmit}>
              <div className="flex flex-row p-3">
                <label>Name:</label>
                <input
                  type="text"
                  name="name" // Add name attribute
                  value={details.name}
                  onChange={temporarysave}
                  className="w-auto ml-3 border-2 border-black rounded-md pl-3 "
                ></input>
              </div>
              <div className="flex flex-row p-3">
                <label>Email:</label>
                <input
                  type="text"
                  disabled
                  name="email" // Add name attribute
                  value={details.email}
                  onChange={temporarysave}
                  className="w-auto ml-3"
                ></input>
              </div>
              <div className="flex flex-row p-3">
                <label>Alloted:</label>
                <input
                  type="text"
                  disabled
                  name="alloted" // Add name attribute
                  value={details.alloted}
                  onChange={temporarysave}
                  className="w-auto ml-3"
                ></input>
              </div>
              <div className="flex flex-col">
                <input
                  type="submit"
                  value={"Commit Changes"}
                  className="border-2 border-green hover:cursor-pointer bg-green-500 font-bold text-white p-2"
                ></input>
              </div>
            </form>
          </div>
        </Box>
      </Modal>



      

      {storedDetails.isPrincipal?(<td className="border-2 px-4 py-2"><Button onClick={HandleDelete}>Delete</Button></td>):null}
      {!data.isAssigned && (storedDetails.isPrincipal || storedDetails.isTeacher) ?(<td className="border-2 px-4 py-2"><Button onClick={handleAssignOpen}>Assign</Button></td>):(<td className="border-2 px-4 py-2"><Button disabled onClick={handleAssignOpen}>Assign</Button></td>)}
        <Modal
          open={assignOpen}
          onClose={handleAssignClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="flex-col">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Assign Classroom
            </Typography>
            <div className="flex flex-col">
              <div className="flex flex-col">
                {classroom.length > 0 ? (
                  classroom.map((val) => (
                    <div key={val._id} className="flex flex-row items-center p-2 border-b-2 border-gray-300">
                      <span>{val.classroomname}</span>
                      {
                         val.Teacher==null?(
                          <Button onClick={() => handleClassroomAssignment(val,data._id)} className="ml-4 bg-blue-500 text-white p-2 rounded">
                        Assign
                      </Button>
                        ):(<Button disabled onClick={() => handleClassroomAssignment(val)} className="ml-4 bg-blue-500 text-white p-2 rounded">
                        Assign
                      </Button>)
                      }
                    </div>
                  ))
                ) : (
                  <Typography>No available classrooms</Typography>
                )}
              </div>
            </div>
          </Box>
        </Modal>
    </tr>
    </>
  );
};

export default TableTeacher;
