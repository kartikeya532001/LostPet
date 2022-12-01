import "./Assets/CSS/App.css";
import { Switch, Route } from "react-router-dom";
import Nav from "./Nav";
import Chat from "./Chat";
import io from 'socket.io-client'
import { useState } from "react";



function UserHome() {
  const socket = io.connect("http://localhost:5001");

  //const sender_id = sessionStorage.get('loggedInUserId')
  //const reciever_id = sessionStorage.get('reciever_id')
  const sender_id = "babd"
  const reciever_id = "bwg"
  
  var room = ""
  if(sender_id <= reciever_id)
    room = sender_id+reciever_id
  if(sender_id>reciever_id)
    room = reciever_id+sender_id
  console.log(room)

  const joinRoom = ()=> {
    if(room !==  ""){
      console.log("here")
      socket.emit("join_room", room)
    }
  }

  return (
    <>
    <Nav />
    {/* Here the side pannel code will be there and ideally once the chat is clicked the joinRoom func should be called */}
    {joinRoom()}
    <Chat socket = {socket} sender_id = {sender_id} reciever_id={reciever_id} room={room}/>
    </>
  );
}

export default UserHome;