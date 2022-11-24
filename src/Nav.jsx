import { Link, Redirect } from 'react-router-dom';
import "./Assets/CSS/Nav.scss";
import {motion} from 'framer-motion';
import {FaBehance, FaDribble} from 'react-icons/fa';
import {IoMailOutline, IoChevronForwardCircle, IoStar} from 'react-icons/io5';
import {Iconcontext} from 'react-icons';

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

const header = {
  initial: {
    y:-60,
    opacity:0,
    transition:{duration:0.05 , ease:easeing}
  },
  animate: {
    y:0,
    opacity:1,
    animation:{
      duration:0.6,
      ease:easeing
    }
  }
};


function Nav() {
  return (
    <motion.div initial='initial' animate='animate'>
    <motion.header variants={stagger}>
    <motion.div className='logo_wrapper' variants={header}>Lost<span>Pets</span></motion.div>
    <motion.div className='menu_container'>
    <span>
      Kartikeya
      {/* {$name} */}
    </span>
      <span className='menu'>
        <span></span>
        <span></span>
        <span></span>
      </span>
    </motion.div>
  </motion.header>
  </motion.div>
  );
}

export default Nav;