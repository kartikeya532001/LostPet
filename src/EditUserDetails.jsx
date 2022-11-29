
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

  const [credentials, setCredentials] = useState({name:"", category:"", breed:"" ,colour:"", gender:"",  marks:"", license:"" });
  const [Err, setErr] = useState("");

  let history = useHistory();

  const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
 

  
  function addPet(){
    
    if(credentials.name == '' || credentials.breed == '' || credentials.colour == '' || credentials.gender == '' || credentials.category == '' || credentials.marks == '' || credentials.license == '')
    {
      setErr("Empty fields");
    }
    else{
      const o_id = sessionStorage.getItem("loggedInUserId")
      const suid = new ShortUniqueId({ length: 8 });
      var p_id = suid();
      console.log(p_id)
      axios.post(`${url}/pidexists`, {"p_id": p_id})
      .then((res)=>{
        if(!res.data.success){
          console.log("Existing p_id detected")
          p_id = suid();
        }
        console.log("returning")
        axios.post(`${url}/addpet`, {"p_id": p_id,"o_id":o_id, "name":credentials.name, "breed":credentials.breed ,"colour":credentials.colour, "gender":credentials.gender, "category":credentials.category, "marks":credentials.marks, "license":credentials.license })
        .then((res) => {
          console.log("called")
          if(!res.data.success){
            setErr(res.data.message);
        }else{
          console.log(res.data.message)
          history.push("/userhome"); 
        }
        })
      }, (err)=>{console.log(err)})
    }
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
      <motion.input type='text' name='name' placeholder='Enter your Name' onChange={onChange} variants={fadeInUp} value='{somaU}' /> <br />
      <motion.input type='text' name='category' placeholder='Enter your Email' onChange={onChange} variants={fadeInUp} value='{somaU}' /> <br />
      <motion.input type='text' name='breed' placeholder='Enter your PhoneNo' onChange={onChange} variants={fadeInUp} value='{somaU}' /> <br />
      <motion.button type= 'button' variants={fadeInUp} whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick = {addPet} >Update</motion.button>
      <p>{Err} </p>
      </form>
    </div>
  </motion.div>
  </motion.div>
      );
    }

export default EditUserDetails;