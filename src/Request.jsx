import "./Assets/CSS/App.css";
import Nav from "./Nav";
import { motion } from "framer-motion";
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



function DisplayRequests() {

  const history = useHistory();
  const u_id = sessionStorage.getItem("loggedInUserId");
  const [requests, setRequests] = useState([])
  const [Err, setErr] = useState("")
  const [num, setNum] = useState(5)
  useEffect(() => {
    axios.post(`${url}/getrequests`, {"r_id": u_id})
    .then((res)=>{
      console.log("here")
      if(res.data.success){
        const requestsArray = res.data.rows
        setRequests(res.data.rows)
        console.log(requests)
        setNum(1)
      }
      else{
        setNum(1)
        console.log("else")
        setErr("Currenty No Requests found")
      }
    }, (err)=>{console.log(err)})


  }, [num]);

  // function acceptRequest(s_id){
  //   // ideally here s_id = requests[x].sender_id
  //   axios.post(`${url}/acceptrequest`, {"s_id": s_id, "r_id": u_id})
  //   .then((res)=>{
  //     axios.post(`${url}/newchat`, {"s_id": u_id, "r_id": s_id})
  //     .then((res)=>{
  //       console.log(res.data.message)
  //     }, (err)=>{console.log(err)})

  //   }, (err)=>{console.log(err)})
  // }


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
                        List of Requests
                    </motion.h2>
                    <motion.table variants={fadeInUp}>
                    <tr>
                      <th>Sender ID</th>
                      <th >Name</th>
                      <th>Accept/Reject</th>
                    </tr>
                    </motion.table>
        
        {/* Here a new component will be there for displaying requests just like <Petsd /> 
        and give options to accpet or reject  */}
        
    {/* {requests.map((requests) => (
      here we will put the accept and reject buttons
      <Petsd
          Pet_ID={pets.p_id}
          name={pets.name}
          link= {`/petdetails/${pets.p_id}`}  
      />
    ))} */}

    </div>
        </div>
    
    </motion.div>
</motion.div>
  );
}

export default DisplayRequests;