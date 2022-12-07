import { Link, Redirect, useLocation, useParams, useHistory } from 'react-router-dom';
import "./Assets/CSS/petdetails.scss";
import {motion} from 'framer-motion';
import Nav from './Nav';
import { useState, useEffect, React } from 'react';
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
function PetDetails() {

  //the p_id should be sent here via props or have to included in the urls like /petdetails/${p_id}

  //const p_id = "6f5ggs"
  let history = useHistory();
  const [petname, setPetname] = useState("");
  const [o_id, setO_id] = useState();
  const [ownername, setOwnername] = useState("");
  const [breed, setBreed] = useState("");
  const [color, setColour] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [marks, setMarks] = useState("");
  const [license, setLicense] = useState("");
  const [Err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const params = useParams();
  const p_id = params.p_id

  useEffect(()=>{
  axios.get(`${url}/getpets/${p_id}`).then((res) => {
    if(res.data.success){
      console.log(res.data)
      const pet = res.data.rows[0]
      setPetname(pet.name);
      setO_id(pet.o_id);
      setOwnername(pet.ownername);
      setBreed(pet.breed);
      setColour(pet.colour);
      setGender(pet.gender);
      setCategory(pet.category);
      setMarks(pet.marks);
      setLicense(pet.license);
  }
  else{
    setMsg(res.data.message);
  }
}
)
}, []);

  function setOwner(){
    const s_id = sessionStorage.getItem('loggedInUserId')
    if(s_id == null){
      history.push('/login')
    }
    sessionStorage.setItem('receiver_id', o_id)
    // technically here the user has to be logged in to send the request
    // store p_id in sessionstorage and redirect to /login if not logged in, when he logs in if p_id exits redirect again to/petdetils/p_id instead of /userhome
    const r_id = sessionStorage.getItem('receiver_id')
    axios.post(`${url}/sendrequest`, {"s_id": s_id, "r_id": r_id })
    .then((res)=>{
      if(res.data.success){
        history.push("/userhome");         
      }
      else{
          setErr(res.data.message);
      }
    }, (err)=>{console.log(err)})
    
  }
    if ( msg == '') {
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
                    <motion.h2 variants={fadeInUp} style={{marginTop:'40px'}}> Pet Details</motion.h2>
                    <div className='flex'>
                        <div className='divl'>
                                <ul>
                                <motion.li variants={fadeInUp}><span>Pet ID: </span><br />{p_id}</motion.li>
                                <motion.li variants={fadeInUp}><span>Pet Name: </span><br />{petname}</motion.li>
                                <motion.li variants={fadeInUp}><span>Pet Category: </span><br />{category}</motion.li>
                                <motion.li variants={fadeInUp}><span>Identifications: </span><br />{marks}</motion.li>
                                </ul>
                        </div>
                            
                            <div className='divR'>
                            <ul>
                                <motion.li variants={fadeInUp}><span>Pet Breed: </span><br />{breed}</motion.li>
                                <motion.li variants={fadeInUp}><span>Pet Gender: </span><br />{gender}</motion.li>
                                <motion.li variants={fadeInUp}><span>Pet Colour: </span><br />{color}</motion.li>
                                <motion.li variants={fadeInUp}><span>Pet Owner Name: </span><br />{ownername}</motion.li>
                                </ul>
                            </div>
                    </div>
                    <motion.button variants={fadeInUp} whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick = {setOwner}>Contact Owner</motion.button>
                    </div>
                </div>
            
            </motion.div>
      </motion.div>
   
    );
  }
  else {
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
                    <motion.h2 variants={fadeInUp} style={{marginTop:'40px'}}> Pet Details</motion.h2>
                      <div className='flex'>
                        <p>Pet ID Not Found.</p>
                      </div>
                    
                  </div>
                </div>
            
            </motion.div>
      </motion.div>
   
    );
  }
}

  export default PetDetails;