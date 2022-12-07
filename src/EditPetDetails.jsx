
import { Link, Redirect } from 'react-router-dom';
import "./Assets/CSS/petregis.scss";
import {motion} from 'framer-motion';
import Nav from './Nav';
import { useState, useEffect, React } from 'react';
import { useHistory } from 'react-router-dom';
import ShortUniqueId from 'short-unique-id';
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
    x:60,
    opacity:0,
    transition: {
      duration: 0.6, ease: easeing
    }
  },
  animate:{
    x:0,
    opacity:1,
    transition:{
      duration:1.5,
      delay:0.5,
      ease: easeing
    }
  }
};


function EditPetDetails() {

  const [credentials, setCredentials] = useState({name:"", category:"", breed:"" ,colour:"", gender:"",  marks:"", license:"" });
  const [Err, setErr] = useState("");

  let history = useHistory();

  const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  useEffect(() => {
    const loggedInUserId = sessionStorage.getItem("loggedInUserId");
    if (loggedInUserId) {
      //do nothing
    }
    else{
      history.push("/login");
    }
  }, []);

  
  function addPet(){
    
    if(credentials.name == '' || credentials.breed == '' || credentials.colour == '' || credentials.gender == '' || credentials.category == '' || credentials.marks == '' || credentials.license == '')
    {
      setErr("Empty fields");
    }

    else if (checkname(credentials.name) == false){
      setErr("Name Invalid");
    }

    else if (checkbreed(credentials.breed) == false){
      setErr("Breed Invalid");
    }

    else if (checkcolour(credentials.colour) == false){
      setErr("Colour Invalid");
    }

    else if (checkgender(credentials.gender) == false){
      setErr("Gender Invalid");
    }

    else if (checkcategory(credentials.category) == false){
      setErr("Category Invalid");
    }

    else if (checkmarks(credentials.marks) == false){
      setErr("Marks Invalid");
    }

    else if (checklicense(credentials.license) == false && credentials.license.length != 15) {
      setErr("Invalid LicenseNo");
    }

    else{
      const o_id = sessionStorage.getItem("loggedInUserId")
      const suid = new ShortUniqueId({ length: 8 });
      var p_id = suid();
      console.log(p_id)
      axios.post(`${url}/pidexists`, {"p_id": p_id})
      .then((res)=>{
        if(!res.data.success){
          console.log("Existing p_id detected")
          p_id = suid();
        }
        console.log("returning")
        axios.post(`${url}/addpet`, {"p_id": p_id,"o_id":o_id, "name":credentials.name, "breed":credentials.breed ,"colour":credentials.colour, "gender":credentials.gender, "category":credentials.category, "marks":credentials.marks, "license":credentials.license })
        .then((res) => {
          console.log("called")
          if(!res.data.success){
            setErr(res.data.message);
        }else{
          console.log(res.data.message)
          history.push("/userhome"); 
        }
        })
      }, (err)=>{console.log(err)})
    }
  }

  function checkname(name){
    var regex = /^[A-Za-z ]*$/;
    var isValid = regex.test(name);
    var result = true;
    result = (!isValid) ? false : true
    return result;
  }

  function checkbreed(breed){
    var regex = /^[A-Za-z ]*$/;
    var isValid = regex.test(breed);
    var result = true;
    result = (!isValid) ? false : true
    return result;
  }

  function checkcolour(colour){
    var regex = /^[A-Za-z ]*$/;
    var isValid = regex.test(colour);
    var result = true;
    result = (!isValid) ? false : true
    return result;
  }

  function checkgender(gender){
    var regex = /^[A-Za-z ]*$/;
    var isValid = regex.test(gender);
    var result = true;
    result = (!isValid) ? false : true
    return result;
  }

  function checkcategory(category){
    var regex = /^[A-Za-z ]*$/;
    var isValid = regex.test(category);
    var result = true;
    result = (!isValid) ? false : true
    return result;
  }

  function checkmarks(marks){
    var regex = /^[A-Za-z ]*$/;
    var isValid = regex.test(marks);
    var result = true;
    result = (!isValid) ? false : true
    return result;
  }

  function checklicense(license){
    var regex = /^[A-Za-z0-9]*$/;
    var isValid = regex.test(license);
    var result = true;
    result = (!isValid) ? false : true
    return result;
  }

  return (
  <motion.div initial='initial' animate='animate'>
      <Nav />
    <motion.div className='content_wrapper2' initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition=
    {{duration:0.3,ease:easeing}}>
    
    <motion.div className='left_content_wrapper2'>
    <motion.img src={process.env.PUBLIC_URL + '/images/home.png'} alt='background' initial={{x:0, opacity:0}} animate={{x:100,
        opacity:1}} transition={{duration:0.5,delay:.8}} />
    </motion.div>
    <div className='right_content_wrapper2'>
      <motion.h2> <motion.span variants={fadeInUp} style={{marginLeft:'12px'}}>Edit Pet Details</motion.span></motion.h2>
      <form action="" className='pet'>
      <motion.input type='text' name='name' placeholder='Enter your Pet Name' onChange={onChange} variants={fadeInUp} /> <br />
      <motion.input type='text' name='category' placeholder='Enter your pet category' onChange={onChange} variants={fadeInUp} /> <br />
      <motion.input type='text' name='breed' placeholder='Enter your Pet Breed' onChange={onChange} variants={fadeInUp} /> <br />
      <motion.input type='text' name='colour' placeholder='Enter your Pet Colour' onChange={onChange} variants={fadeInUp} /> <br />
      <motion.input type='text' name='gender' placeholder='Enter your Pet Gender' onChange={onChange} variants={fadeInUp}  /> <br />
      <motion.input type='text' name='marks' placeholder='Enter your Pet Marks' onChange={onChange} variants={fadeInUp} /> <br />
      <motion.input type='text' name='license' placeholder='Enter your Pet License No' onChange={onChange} variants={fadeInUp} /> <br />
      <motion.button type= 'button' variants={fadeInUp} whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick = {addPet} >Update</motion.button>
      <p style={{color:'#000000',marginLeft:'250px',marginTop:'20px',fontWeight:'700'}}>{Err} </p>
      </form>
    </div>
  </motion.div>
  </motion.div>
      );
    }

export default EditPetDetails;