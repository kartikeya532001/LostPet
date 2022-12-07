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


function Petsd(props) {
  return (
    
    
                <div className="table">
                  <motion.table variants={fadeInUp}>
                   
                    <tr>
                      <td>{props.Pet_ID}</td>
                      <td style={{
                         paddingLeft:'40px', paddingRight:'40px',paddingTop: '20px',paddingBottom:'20px'
                        }}>{props.name}</td>
                      <td>
                      <Link to = '/editpetdetails'>
                        <motion.button variants={fadeInUp} whileHover={{scale:1.05}} whileTap={{scale:0.95}}
                        style={{
                        height:'45px',width:'80px', marginLeft:'10px', marginTop: '0px',fontSize:'15px'
                        }}
                        >
                          Edit Details
                        </motion.button>
                      </Link>
                      </td>
                    </tr>
                  </motion.table>
                        
                </div>                 
     
 
  );
}

export default Petsd;