import "./Assets/CSS/App.css";
import { Switch, Route } from "react-router-dom";
import React, { useEffect } from 'react';
import io from 'socket.io-client'
import { useState } from 'react';

function Chat({socket, sender_id, receiver_id, room}) {  

    const [currMsg, setCurrMsg] = useState("")
    const[msgList, setMsgList] = useState([])

    const sendMsg = async ()=>{
    if(currMsg !== ""){
      const msgdata = {
        room: room,
        author: sender_id,
        message: currMsg,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }
      await socket.emit("send_msg", msgdata)
      setMsgList((list) => [...list, msgdata])
      setCurrMsg("")
    }
  }
  
    useEffect(()=>{
        socket.on("receive_msg", (data)=>{
        setMsgList((list) => [...list, data])
    })
    }, [socket])

  return (
    <>
    <div className= "chat-header">
        <p>Live Chat</p>
      </div>
      <div className= "chat-body">
        {msgList.map((msgContent)=>{
            return <h1>{msgContent.message}</h1>
        })}

      </div>
      <div className= "chat-footer">
        <input type="text" placeholder="type here.." value={currMsg} onChange={(e)=>{setCurrMsg(e.target.value)}} onKeyPress={(event) => {event.key == 'Enter' &&  sendMsg()}}/>
        <button onClick={sendMsg}>&#9658;</button>
    </div>
        
    </>
  );
}

export default Chat;