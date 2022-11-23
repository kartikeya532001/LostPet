
import { Link, Redirect } from 'react-router-dom';
import "./Assets/CSS/petregis.scss";
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


function petregistration() {
    return (
    
    <motion.div initial='initial' animate='animate'>
     
      <motion.div className='content_wrapper2' initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition=
      {{duration:0.3,ease:easeing}}>
      
      <motion.div className='left_content_wrapper2'>
      <motion.img src={process.env.PUBLIC_URL + '/images/home.png'} alt='background' initial={{x:0, opacity:0}} animate={{x:100,
          opacity:1}} transition={{duration:0.5,delay:.8}} />
      </motion.div>
      <div className='right_content_wrapper2'>
        <motion.h2> <motion.span variants={fadeInUp}>Pet Registration</motion.span></motion.h2>
        <form method='post' action="" className='pet'>
        <motion.input type='text' name='pname' placeholder='Enter your Pet Name' variants={fadeInUp} /> <br />
        <motion.input type='text' name='category' placeholder='Enter your pet category' variants={fadeInUp}/> <br />
        <motion.input type='text' name='breed' placeholder='Enter your Pet Breed' variants={fadeInUp}/> <br />
        <motion.input type='text' name='colour' placeholder='Enter your Pet Colour' variants={fadeInUp}/> <br />
        <motion.input type='text' name='Gender' placeholder='Enter your Pet Gender' variants={fadeInUp}/> <br />
        <motion.input type='text' name='marks' placeholder='Enter your Pet Marks' variants={fadeInUp}/> <br />
        <motion.input type='text' name='license' placeholder='Enter your Pet License No' variants={fadeInUp}/> <br />
        <motion.button type= 'sumbit' variants={fadeInUp} whileHover={{scale:1.05}} whileTap={{scale:0.95}}>Register</motion.button>
        </form>
      </div>
    </motion.div>
    </motion.div>
        );
      }
      
      export default petregistration;