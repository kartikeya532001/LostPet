import { Link, Redirect } from 'react-router-dom';
import "./Assets/CSS/Nav.scss";
import {motion} from 'framer-motion';
import {FaBehance, FaDribble} from 'react-icons/fa';
import {IoMailOutline, IoChevronForwardCircle, IoStar} from 'react-icons/io5';
import {Iconcontext} from 'react-icons';
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


function Nav() {

//   const [name, setName] = useState("");
//   const u_id = 2;
//   useEffect(()=>{
//     axios.get(`${url}/getusers/${u_id}`).then((res) => {
//       if(res.data.success){
//         const user = res.data.rows[0];
//         setName(user.name);  
//     }
//     else{
//         const msg = res.data.message;
//         console.log(msg);
//     }
// }
// )
      
//   }, []);
  
  
  return (
    <motion.div initial='initial' animate='animate'>
    <motion.header variants={stagger}>
    <motion.div className='logo_wrapper' variants={header}>Lost<span>Pets</span></motion.div>
    <motion.div className='menu_container'>
    <motion.span variants={header} style={{width:'85px'}}>
      Profile
    </motion.span>
    <motion.span variants={header} style={{width:'65px'}}>
      Pets
    </motion.span>
    <motion.span variants={header}>
      Logout
    </motion.span>
      
    </motion.div>
  </motion.header>
  </motion.div>
  );
}

export default Nav;