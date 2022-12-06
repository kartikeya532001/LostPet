import "./Assets/CSS/App.css";
import { Link, Redirect } from 'react-router-dom';
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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


function RequestD(props) {

  const history = useHistory()
    function accept (){
        console.log(props);
        axios.post(`${url}/acceptrequest`, {"s_id" : props.s_id, "r_id": props.r_id})
        .then((res)=>{
          console.log("gwg")
          
          if(res.data.success){
            axios.post(`${url}/newchat`, {"s_id" : props.s_id, "r_id": props.r_id})
            .then((res)=>{
              if(res.data.success){
                
                history.push("/userhome")
              }
              else{
                console.log("Unable to accept the request by "+ props.s_name)
              }

            }, (err) => {console.log(err)})
            
          }
          else{
            console.log("Unable to accept the request by "+ props.s_name)
          }

        }, (err) => {console.log(err)})
    }


    function reject (){
      axios.post(`${url}/rejectrequest`, {"s_id" : props.s_id, "r_id": props.r_id})
      .then((res)=>{
        if(res.data.success){
          history.push("/userhome")
        }
        else{
          console.log("Unable to reject the request by "+ props.s_name)
        }

      }, (err) => {console.log(err)})
    }
  return (
    
    
                <div className="table">
                  <motion.table variants={fadeInUp}>
                   
                    <tr>
                      
                      <td style={{
                         paddingRight:'68px',paddingTop: '10px',paddingBottom:'10px',paddingLeft:'20px'
                        }}>{props.s_name}</td>
                      <td>
                        <motion.button variants={fadeInUp} whileHover={{scale:1.05}} whileTap={{scale:0.95}}
                        style={{
                        height:'30px',width:'70px', marginLeft:'10px', marginTop: '0px',fontSize:'15px'
                        }} onClick={accept}
                        >
                          Accept
                        </motion.button>
                        <motion.button variants={fadeInUp} whileHover={{scale:1.05}} whileTap={{scale:0.95}}
                        style={{
                        height:'30px',width:'70px', marginLeft:'10px', marginTop: '0px',fontSize:'15px'
                        }} onClick={reject}
                        >
                          Reject
                        </motion.button>
                      </td>
                    </tr>
                  </motion.table>
                        
                </div>                 
     
 
  );
}

export default RequestD;