import { Link, Redirect } from 'react-router-dom';
import "./Assets/CSS/petdetails.scss";
import {motion} from 'framer-motion';
import Nav from './Nav';

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
    return (
      <motion.div initial='initial' animate='animate'>
            <Nav />
            <motion.div className='content_wrapper2' initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition=
            {{duration:0.3,ease:easeing}}>
            
                <motion.div className='left_content_wrapper2'>
                    <motion.img src={process.env.PUBLIC_URL + '/images/home.png'} alt='background' initial={{x:0, opacity:0}} animate={{x:100,
                        opacity:1}} transition={{duration:0.5,delay:.8}} />
                </motion.div>
                <div className='right_content_wrapper3'>
                <div className='Petd'>
                    <motion.h2 variants={fadeInUp}> Pet Details</motion.h2>
                    <div className='flex'>
                        <div className='divl'>
                                <ul>
                                <motion.li variants={fadeInUp}><span>Name: </span><br />pname</motion.li>
                                <motion.li variants={fadeInUp}><span>Email: </span><br />pname</motion.li>    
                                </ul>
                        </div>
                            
                            <div className='divR'>
                            <ul>
                                <motion.li variants={fadeInUp}><span>Phone No: </span><br />pname</motion.li>
                                </ul>
                                </div>
                    </div>
                    <motion.button variants={fadeInUp} whileHover={{scale:1.05}} whileTap={{scale:0.95}}>Contact Owner</motion.button>
                    </div>
                </div>
            
            </motion.div>
      </motion.div>
   
    );
  }
  
  export default Userprofile;