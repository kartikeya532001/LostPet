import "./Assets/CSS/App.css";
import { Link, Redirect } from 'react-router-dom';
import Nav from "./Nav";
import { motion } from "framer-motion";

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


function DisplayPetsN() {
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
                    <motion.h2 variants={fadeInUp} style={{marginLeft:'80px', marginTop:'-40px',marginBottom:'30px'}}>
                        List of Pets
                    </motion.h2>
                    <motion.p variants={fadeInUp} style={{marginLeft:'-50px',marginBottom:'30px',fontSize:'1.42vw',color:'#000000',fontWeight:'600'}}>
                        No pets registered on this account.<br />
                        Click on the button below to register a new pet.
                    </motion.p>
                    <Link to ='/petregistration'>
                        <motion.button variants={fadeInUp} whileHover={{scale:1.05}} whileTap={{scale:0.95}} style={{marginLeft:'60px'}}>
                            Register Pet
                        </motion.button>
                    </Link>
            </div>
        </div>
    
    </motion.div>
</motion.div>
 
  );
}

export default DisplayPetsN;