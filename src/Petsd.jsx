import "./Assets/CSS/App.css";
import { Link, Redirect } from 'react-router-dom';
import Nav from "./Nav";
import { motion } from "framer-motion";
import Data from "./PetListD";

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
                      <td>{props.name}</td>
                      <td>
                      <Link to = {props.link}>
                        <motion.button variants={fadeInUp} whileHover={{scale:1.05}} whileTap={{scale:0.95}}>
                          View Details
                        </motion.button>
                      </Link>
                      </td>
                    </tr>
                  </motion.table>
                        
                </div>                 
     
 
  );
}

export default Petsd;