
import { Link, Redirect } from 'react-router-dom';
import "./Assets/CSS/login.scss";
import {motion} from 'framer-motion';
import { useState, useEffect, React } from 'react';
import { useHistory } from 'react-router-dom';
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

const header = {
  initial: {
    y:-60,
    opacity:0,
    transition:{duration:0.05 , ease:easeing}
  },
  animate: {
    y:0,
    opacity:1,
    animation:{
      duration:0.6,
      ease:easeing
    }
  }
};

function Signup() { 

  
  const [credentials, setCredentials] = useState({name:"", email:"", password:"", phonenumber:""});
  const [Err, setErr] = useState("");

  let history = useHistory();

  const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  function addUser(){
    if(credentials.name == '' || credentials.email == '' || credentials.password == '' || credentials.phonenumber == '')
    {
      setErr("Empty Fields");
    }
    else{
    axios.post(`${url}/emailexists`,  {"email": credentials.email})
      .then((res)=>{
        
        if(res.data.success){
            
            setErr(res.data.message);
        }
        else{
            //implement the code to add user
            console.log(credentials)

            axios.post(`${url}/adduser`, {"name":credentials.name, "email": credentials.email, "password": credentials.password, "phonenumber":credentials.phonenumber})
            .then((res)=>{
                if(res.data.success){
                    const u_id = res.data.u_id;
                    sessionStorage.setItem("loggedInUserId", u_id);
                    history.push("/login");
                }
                else{
                    const message = res.data.message;
                    setErr(message);
                }
            }, (err) => {console.log(err)})

            
        }
      }
    )
    }
  }

  return (
  <motion.div initial='initial' animate='animate'>
      <motion.header variants={stagger}>
      <motion.div className='logo_wrapper' variants={header}>Lost<span>Pets</span></motion.div>
    </motion.header>
    <motion.div className='content_wrapper1' initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition=
    {{duration:0.3,ease:easeing}}>
    
    <motion.div className='left_content_wrapper1'>
    <motion.img src={process.env.PUBLIC_URL + '/images/home.png'} alt='background' initial={{x:0, opacity:0}} animate={{x:100,
        opacity:1}} transition={{duration:0.5,delay:.8}} />
    </motion.div>
    <div className='right_content_wrapper1'>
      <motion.h2> <motion.span variants={fadeInUp}>SignUp</motion.span></motion.h2>
      <form method='post' action="" className='loginf'>
      <motion.input type='text' name='name' placeholder='Enter your Name'  onChange={onChange} variants={fadeInUp} /> <br />
      <motion.input type='email' name='email' placeholder='Enter your Email'  onChange={onChange} variants={fadeInUp}/> <br />
      <motion.input type='password' name='password' placeholder='Enter your password' required onChange={onChange} variants={fadeInUp}/> <br />
      <motion.input type='text' name='phonenumber' placeholder='Enter your PhoneNo' onChange={onChange} variants={fadeInUp}/> <br />
      <p>{Err} </p>
      <motion.button type= 'button' variants={fadeInUp} whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick = {addUser}>SignUp</motion.button>
      
      </form>
    </div>
  </motion.div>
  </motion.div>
      );
  }
      
export default Signup;