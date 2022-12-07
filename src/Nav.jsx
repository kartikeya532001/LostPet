import { Link, Redirect, useHistory } from 'react-router-dom';
import "./Assets/CSS/Nav.scss";
import {motion} from 'framer-motion';
import { useState, useEffect, React } from 'react';


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

  const history = useHistory()
  const [loginLogout, setLoginLogout] = useState("")
  const [link, setLink] = useState('/')
  useEffect(() => {
    const loggedInUserId = sessionStorage.getItem("loggedInUserId");
    if (loggedInUserId) {
      setLoginLogout("Logout") 
      setLink('/userhome')
    }
    else{
      setLoginLogout("Login")
    }
  }, []);
  
  function loginLogoutClick(){
    const loggedInUserId = sessionStorage.getItem("loggedInUserId");
    if (loggedInUserId) {
      sessionStorage.clear();
      history.push('/')
    }
    else{
      history.push('/login')
    }
  }

  
  return (
    <motion.div initial='initial' animate='animate'>
    <motion.header variants={stagger}>
    <motion.div className='logo_wrapper' variants={header} onClick = {()=>{history.push(link)}} style={{cursor: 'pointer'}}>Lost<span>Pets</span></motion.div>
    <motion.div className='menu_container'>
    <Link to='/requests' style={{color:'#000000',textDecoration: 'none', marginRight:'25px'}}>
    <motion.span variants={header} style={{width:'85px'}}>
      Requests
    </motion.span>
    </Link>
    <Link to='/userprofile' style={{color:'#000000',textDecoration: 'none'}}>
    <motion.span variants={header} style={{width:'85px'}}>
      Profile
    </motion.span>
    </Link>
    <Link to='/displaypets' style={{color:'#000000',textDecoration: 'none'}}>
    <motion.span variants={header} style={{width:'65px'}}>
      Pets
    </motion.span>
    </Link>
    <motion.span variants={header} onClick = {loginLogoutClick} style={{cursor: 'pointer'}}>
      {loginLogout}
    </motion.span>
      
    </motion.div>
  </motion.header>
  </motion.div>
  );
}

export default Nav;