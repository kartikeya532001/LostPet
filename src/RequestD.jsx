import "./Assets/CSS/App.css";
import { Link, Redirect } from 'react-router-dom';
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


function RequestD(props) {

    function accept (){
        console.log(props.ID);
    }
    function reject (){
        console.log(props.ID);
        
    }
  return (
    
    
                <div className="table">
                  <motion.table variants={fadeInUp}>
                   
                    <tr>
                      
                      <td style={{
                         paddingRight:'68px',paddingTop: '10px',paddingBottom:'10px',paddingLeft:'20px'
                        }}>{props.name}</td>
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