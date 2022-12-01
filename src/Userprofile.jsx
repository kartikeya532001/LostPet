import { Link, Redirect } from 'react-router-dom';
import "./Assets/CSS/Userprofile.scss";
import {motion} from 'framer-motion';
import Nav from './Nav';
import { useState, useEffect, React } from 'react';
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
    x:100,
    opacity:0,
    transition: {
      duration: 0.6, ease: easeing
    }
  },
  animate:{
    x:0,
    opacity:1,
    transition:{
      duration:2,
      delay:0.5,
      ease: easeing
    }
  }
};
function Userprofile() {

  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState(0);
  const [Err, setErr] = useState("");
  
  
  const u_id = sessionStorage.getItem("loggedInUserId")

  useEffect(()=>{
  axios.get(`${url}/getusers/${u_id}`).then((res) => {
    if(res.data.success){
      console.log(res.data)
      const user = res.data.rows[0]
      setName(user.name)
      setEmail(user.email)
      setPhonenumber(user.phonenumber)
  }
  else{
      const msg = res.data.message;
      setErr(msg);
  }
}
)
}, []);
  


    return (
      <motion.div initial='initial' animate='animate'>
            <Nav />
            <motion.div className='content_wrapper2' initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition=
            {{duration:0.3,ease:easeing}}>
            
                <motion.div className='left_content_wrapper2'>
                    <motion.img src={process.env.PUBLIC_URL + '/images/home.png'} alt='background' initial={{x:0, opacity:0}} animate={{x:100,
                        opacity:1}} transition={{duration:0.5,delay:.8}} />
                </motion.div>
                <div className='right_content_wrapper4'>
                <div className='Userd'>
                    <motion.h2 variants={fadeInUp}>User Details</motion.h2>         
                                <ul>
                                    <motion.li variants={fadeInUp}><span>Name: </span><br />{name}</motion.li>
                                    <motion.li variants={fadeInUp}><span>Email: </span><br />{email}</motion.li>    
                                    <motion.li variants={fadeInUp}><span>Phone No: </span><br />{phonenumber}</motion.li>
                                </ul>
                    <Link to = '/edituserdetails'><motion.button variants={fadeInUp} whileHover={{scale:1.05}} whileTap={{scale:0.95}}>Edit Details</motion.button></Link>
                    </div>
                </div>
            
            </motion.div>
      </motion.div>
   
    );
  }
  
  export default Userprofile;