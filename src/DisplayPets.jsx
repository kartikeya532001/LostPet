import "./Assets/CSS/App.css";
import { Link, Redirect } from 'react-router-dom';
import Nav from "./Nav";
import { motion } from "framer-motion";
import Dat from "./PetListD";
import React from "react";
import Petsd from "./Petsd";


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



function DisplayPets() {
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
                    <motion.h2 variants={fadeInUp} style={{marginLeft:'120px', marginTop:'-160px',marginBottom:'30px'}}>
                        List of Pets
                    </motion.h2>
                    <motion.table variants={fadeInUp}>
                    <tr>
                      <th>Pet ID</th>
                      <th>Name</th>
                      <th>View Details</th>
                    </tr>
                    </motion.table>
    {Dat.map((dat) => (
      <Petsd
          Pet_ID={dat.Pet_ID}
          name={dat.name}
          link={dat.link}
         
      />
    ))}
    </div>
        </div>
    
    </motion.div>
</motion.div>
  );
}

export default DisplayPets;