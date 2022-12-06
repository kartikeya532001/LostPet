import React from "react";
import Navbar from "./Navbar";
import io from 'socket.io-client'
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import RecentChat from "./RecentChat";

const url = process.env.url || 'http://localhost:5000';

const Sidebar = () => {

  const [Err, setErr] = useState("")
  const [userChats, setUserChats] = useState([])
  const [num, setNum] = useState(5)


  // const sender_id = sessionStorage.getItem('loggedInUserId')
  // const receiver_id = sessionStorage.getItem('receiver_id')
  // // const sender_id = "babd"
  // // const receiver_id = "bwg"
  
  // var room = ""
  // if(sender_id <= receiver_id)
  //   room = sender_id+receiver_id
  // if(sender_id>receiver_id)
  //   room = receiver_id+sender_id
  //console.log(room)

  // const joinRoom = ()=> {
  //   if(room !==  ""){
  //     console.log("here")
  //     socket.emit("join_room", room)
  //   }
  // }
  
  useEffect(()=>{
    axios.post(`${url}/getuserchats`, {"s_id": sessionStorage.getItem('loggedInUserId')})
    .then((res)=>{
      if(res.data.success){
        setUserChats(res.data.rows)
        setNum(1)
        console.log(userChats);
      }
      else{
        setNum(1)
        setErr(res.data.message)
      }

    }, (err)=>{console.log(err)})

  },[num])


  return (
    <div className="sidebar">
      <Navbar />

      {userChats.map((chats) => (
     <RecentChat
        r_id={chats.receiver_id}
        r_name={chats.receiver_name}  
     />
   ))}
   </div>
  
  );
};

export default Sidebar;