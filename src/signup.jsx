
import { Link, Redirect } from 'react-router-dom';
import "./Assets/CSS/login.scss";
import {motion} from 'framer-motion';

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

function signup() {
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
        <motion.input type='text' name='name' placeholder='Enter your Name' variants={fadeInUp} /> <br />
        <motion.input type='email' name='emailId' placeholder='Enter your Email' variants={fadeInUp}/> <br />
        <motion.input type='text' name='phone' placeholder='Enter your PhoneNo' variants={fadeInUp}/> <br />
        <motion.input type='password' name='password' placeholder='Enter your password' variants={fadeInUp}/> <br />
        <motion.button type= 'sumbit' variants={fadeInUp} whileHover={{scale:1.05}} whileTap={{scale:0.95}}>SignUp</motion.button>
        </form>
      </div>
    </motion.div>
    </motion.div>
        );
      }
      
      export default signup;