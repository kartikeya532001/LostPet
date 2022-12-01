
import { Link, Redirect } from 'react-router-dom';
import "./Assets/CSS/petregis.scss";
import {motion} from 'framer-motion';
import Nav from './Nav';
import { useState, useEffect, React } from 'react';
import { useHistory } from 'react-router-dom';
import ShortUniqueId from 'short-unique-id';
import axios from "axios";
const url = process.env.url || 'http://localhost:5000';

let easeing = [0.6,-0.05,0.01,0.99];

const stagger = {
  animate: {
    transition: {
      delayChildren:0.4,
      staggerChildren:0.2,
      staggerDirection:1
    }
  }
}
const fadeInUp = {
  initial: {
    x:60,
    opacity:0,
    transition: {
      duration: 0.6, ease: easeing
    }
  },
  animate:{
    x:0,
    opacity:1,
    transition:{
      duration:1.5,
      delay:0.5,
      ease: easeing
    }
  }
};


function EditUserDetails() {

  
  const [credentials, setCredentials] = useState({name:"", phonenumber: "" });
  const [Err, setErr] = useState("");

  let history = useHistory();

  const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
 

  
  function editUser(){
    console.log(credentials.phonenumber+ "  ada ")
    if(credentials.name == '' || credentials.phonenumber == '')
    {
      setErr("Empty fields");
    }
    else if (phonenumber(credentials.phonenumber) == false || credentials.phonenumber.length != 10){
      setErr("PhoneNo Invalid");
    }
    else if (checkname(credentials.name) == false){
      setErr("Name Invalid");
    }

    else{
      
      const u_id = sessionStorage.getItem("loggedInUserId")
      
      axios.post(`${url}/updateuser`, {"u_id": u_id, "name": credentials.name, "phonenumber": credentials.phonenumber})
      .then((res)=>{
        if(!res.data.success){
          setErr(res.data.message)
        }
        else{
          history.push('/userhome')
        }
      }, (err)=>{console.log(err)})
    }
  }

  
  function phonenumber(phoneNo){
    var regex = /^[0-9]*$/;
    var isValid = regex.test(phoneNo);
    var result = true;
    result = (!isValid) ? false : true;
    return result;
  }

 function checkname(name){
    var regex = /^[A-Za-z ]*$/;
    var isValid = regex.test(name);
    var result = true;
    result = (!isValid) ? false : true
    return result;
 }


  return (
  <motion.div initial='initial' animate='animate'>
      <Nav />
    <motion.div className='content_wrapper2' initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition=
    {{duration:0.3,ease:easeing}}>
    
    <motion.div className='left_content_wrapper2'>
    <motion.img src={process.env.PUBLIC_URL + '/images/home.png'} alt='background' initial={{x:0, opacity:0}} animate={{x:100,
        opacity:1}} transition={{duration:0.5,delay:.8}} />
    </motion.div>
    <div className='right_content_wrapper2'>
      <motion.h2> <motion.span variants={fadeInUp}>Edit User Details</motion.span></motion.h2>
      <form action="" className='pet'>
      <motion.input type='text' name='name' placeholder='Enter your Name' onChange={onChange} variants={fadeInUp}  /> <br />
      {/* <motion.input type='text' name='category' placeholder='Enter your Email' onChange={onChange} variants={fadeInUp}  /> <br /> */}
      <motion.input type='text' name='phonenumber' placeholder='Enter your PhoneNo' onChange={onChange} variants={fadeInUp} /> <br />
      <motion.button type= 'button' variants={fadeInUp} whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick = {editUser} >Update</motion.button>
      <p style={{color:'#000000',marginLeft:'250px',marginTop:'20px',fontWeight:'700'}}>{Err} </p>
      </form>
    </div>
  </motion.div>
  </motion.div>
      );
    }

export default EditUserDetails;