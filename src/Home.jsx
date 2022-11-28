import { Link, Redirect } from 'react-router-dom';
import "./Assets/CSS/Home.scss";
import {motion} from 'framer-motion';
import { useState, React } from 'react';

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
    y:-60,
    opacity:0,
    transition: {
      duration: 0.6, ease: easeing
    }
  },
  animate:{
    y:0,
    opacity:1,
    transition:{
      duration:0.6,
      delay:0.5,
      ease: easeing
    }
  }
};

const transition = {duration:1.4,ease:[0.6,0.01,-0.05,0.9]};

const firstName = {
  initial: {
    y:-20,
  },
  animate: {
    y:0,
    transition:{
      delayChildren:0.4,
      staggerChildren:0.04,
      staggerDirection:-1
    }
  }
}
const lastName = {
  initial: {
    y:-20,
  },
  animate: {
    y:0,
    transition:{
      delayChildren:0.4,
      staggerChildren:0.04,
      staggerDirection:1
    }
  }
}

const letter = {
  initial: {
    y:400,
  },
  animate: {
    y:0,
    transition:{duration:1, ...transition}
  }
};

const btnGroup = {
  initial: {
    y:-60,
    opacity:0,
    transition:{duration:0.6, ease:easeing}
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

const star = {
  initial: {
    y:60,
    opacity:0,
    transition:{duration:0.8, ease:easeing}
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


function Home() {
  
  const [text, setText] = useState('');

  const handleChange = event => {
    setText(event.target.value);
  };

  return (
    <motion.div initial='initial' animate='animate'>
      <motion.header variants={stagger}>
        <motion.div className='logo_wrapper' variants={header}>Lost<span>Pets</span></motion.div>
      </motion.header>

      <motion.div className='content_wrapper' initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition=
      {{duration:0.3,ease:easeing}}>
        <div className='left_content_wrapper'>
            <motion.h2>
               <motion.span variants={firstName} initial='initial' animate='animate' className='first'>
               <motion.span variants={letter}>D</motion.span>
               <motion.span variants={letter}>e</motion.span>
               <motion.span variants={letter}>s</motion.span>
               <motion.span variants={letter}>i</motion.span>
               <motion.span variants={letter}>g</motion.span>
               <motion.span variants={letter}>n</motion.span>
               <motion.span variants={letter} className='second'>f</motion.span>
               <motion.span variants={letter}>o</motion.span>
               <motion.span variants={letter}>c</motion.span>
               <motion.span variants={letter}>u</motion.span>
               <motion.span variants={letter}>s</motion.span>
               <motion.span variants={letter}>e</motion.span>
               <motion.span variants={letter}>d</motion.span>
               </motion.span>
               <motion.span variants={lastName} initial='initial' animate='animate' className='last'>
               <motion.span variants={letter}>S</motion.span>
               <motion.span variants={letter}>t</motion.span>
               <motion.span variants={letter}>a</motion.span>
               <motion.span variants={letter}>r </motion.span>
               <motion.span variants={letter}>t</motion.span>
               <motion.span variants={letter}>u</motion.span>
               <motion.span variants={letter}>p,</motion.span>
               <motion.span variants={letter} className='second'>f</motion.span>
               <motion.span variants={letter}>o</motion.span>
               <motion.span variants={letter}>r</motion.span>
               <motion.span variants={letter} className='second'>s</motion.span>
               <motion.span variants={letter}>t</motion.span>
               <motion.span variants={letter}>a</motion.span>
               <motion.span variants={letter}>r</motion.span>
               <motion.span variants={letter}>t</motion.span>
               <motion.span variants={letter}>u</motion.span>
               <motion.span variants={letter}>p</motion.span>
               <motion.span variants={letter}>s.</motion.span>

               </motion.span>
            </motion.h2>
            <motion.p variants={fadeInUp}>
            Happiness is a warm puppy. <br /> There are always paw prints on our hearts.<br />
            </motion.p>
            <motion.div className='btn_group' variants={stagger}>
              <motion.div className='btn btn_primary' variants={btnGroup} whileHover={{scale:1.05}} whileTap={{scale:0.95}}> <Link to ='/signup' style={{color:'white',textDecoration: 'none'}}>Register</Link>
              </motion.div>
             <motion.div className='btn btn_secondary' variants={btnGroup} whileHover={{scale:1.05}} whileTap={{scale:0.95}}><Link to ='/login' style={{color:'black',textDecoration: 'none'}}>Login </Link></motion.div> 
            </motion.div> 
            <motion.div className='review_container' variants={stagger}>
              <motion.p className='total_review' variants={star}> Enter Pet Id to be searched</motion.p>
              <form method='post' action='' className='forms'>
                <motion.input type='String' name='Pet_ID' placeholder= 'Enter Pet ID'  variants={star} onChange = {handleChange} /> <br /> 
                <Link to ={`/petdetails/${text}`}><motion.button type= 'button' variants={star} whileHover={{scale:1.05}} whileTap={{scale:0.95}} > Search </motion.button></Link>
              </form>
            </motion.div>
        </div> 
        <motion.div className='right_content_wrapper'>
          <motion.img src={process.env.PUBLIC_URL + '/images/home.png'} alt='background' initial={{x:200, opacity:0}} animate={{x:0,
          opacity:1}} transition={{duration:0.5,delay:.8}} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Home;