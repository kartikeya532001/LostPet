import "./Assets/CSS/App.css";
import { Switch, Route } from "react-router-dom";
import Nav from "./Nav";
// import Chat from "./Chat";
import io from 'socket.io-client'
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Chat from "./components/chat";
import "./Assets/CSS/UserHome.scss";
const url = process.env.url || 'http://localhost:5000';


function UserHome() {
  const socket = io.connect("http://localhost:5001");

  const [Err, setErr] = useState("")
  const [userChats, setUserChats] = useState([])
  const [num, setNum] = useState(5)


  const sender_id = sessionStorage.getItem('loggedInUserId')
  const receiver_id = sessionStorage.getItem('receiver_id')
  // const sender_id = "babd"
  // const receiver_id = "bwg"
  
  var room = ""
  if(sender_id <= receiver_id)
    room = sender_id+receiver_id
  if(sender_id>receiver_id)
    room = receiver_id+sender_id
  //console.log(room)

  const joinRoom = ()=> {
    if(room !==  ""){
      console.log("here")
      socket.emit("join_room", room)
    }
  }
  
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
    <>
    <Nav />
    {/* Here the side pannel code will be there and ideally once the chat is clicked the joinRoom func should be called */}
    {/* {joinRoom()}
    <Chat socket = {socket} sender_id = {sender_id} receiver_id={receiver_id} room={room}/> */}

    <div className="home">
      <div className="container">

        <Sidebar />
        <Chat />

      </div>

    </div>
    </>
  );
}

export default UserHome;