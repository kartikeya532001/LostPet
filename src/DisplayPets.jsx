import "./Assets/CSS/App.css";
import Nav from "./Nav";
import { motion } from "framer-motion";
import { Link, Redirect } from 'react-router-dom';
import React from "react";
import Petsd from "./Petsd";
import { useState, useEffect } from 'react';
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

  const history = useHistory();
  const o_id = sessionStorage.getItem("loggedInUserId");
  const [pets, setPets] = useState([])
  const [Err, setErr] = useState("")
  const [num, setNum] = useState(5)
  useEffect(() => {
    axios.get(`${url}/getownerpets/${o_id}`)
    .then((res)=>{
      console.log("here")
      if(res.data.success){
        const petsArray = res.data.rows
        setPets(petsArray)
        console.log(petsArray)
        console.log(pets)
        setNum(1)
      }
      else{
        setNum(1)
        console.log("else")
        setErr("0 registered pets found")
      }
    }, (err)=>{console.log(err)})


  }, [num]);




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
                    <motion.h2 variants={fadeInUp} style={{marginLeft:'50px', marginTop:'-80px',marginBottom:'30px'}}>
                        List of Pets
                    </motion.h2>
                    <motion.table variants={fadeInUp}>
                    <tr>
                      <th>Pet ID</th>
                      <th style={{paddingLeft: '40px',paddingRight: '50px'}}>Name</th>
                      <th>Edit Details</th>
                    </tr>
                    </motion.table>
    {pets.map((pets) => (
      <Petsd
          Pet_ID={pets.p_id}
          name={pets.name}
          link= {`/petdetails/${pets.p_id}`}
          
      />
    ))}
    <Link to = '/petregistration'>
                        <motion.button variants={fadeInUp} whileHover={{scale:1.05}} whileTap={{scale:0.95}}
                        style={{
                        height:'45px',width:'80px', marginLeft:'73px', marginTop: '10px',fontSize:'15px'
                        }}
                        >
                          Add Pet
                        </motion.button>
                      </Link>
    </div>
        </div>
    
    </motion.div>
</motion.div>
  );
}

export default DisplayPets;