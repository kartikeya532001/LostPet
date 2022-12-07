import React, { useContext } from "react";
import Message from "./Message";
import { useEffect } from 'react';
import io from 'socket.io-client'
import { useState } from 'react';
import axios from "axios";
const url = process.env.url || 'http://localhost:5000';


// import { ChatContext } from "../context/ChatContext";

function Chat({socket, sender_id, receiver_id, receiver_name, room, viewable, messageHistory}) {

    // here one more prop will be sent messageHistory [] of prev chats and it will be written in useState(messgeHistory)
    

  console.log("msh" + messageHistory)
  
  const [currMsg, setCurrMsg] = useState("")
  const[msgList, setMsgList] = useState([])

  useEffect(()=>{
    // console.log(msgList)
    // axios.post(`${url}/updatechatbyid`, {"c_id": room, "history" : {"msgList" : msgList}})
    //   .then((res)=>{
    //       console.log(res.data.message)
    //   }, (err)=>{console.log(err)})

      // axios.post(`${url}/getchatbyid`, {"c_id": room})
      // .then((res)=>{
      //     if(res.data.success){
      //       //setMsgList(res.data.rows)
      //     }
      // }, (err)=>{console.log(err)})
  },[msgList])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log('This will run every second!');
      


  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  const sendMsg = ()=>{
    console.log("test")
    if(currMsg !== ""){
      const msgdata = {
        room: room,
        author: sender_id,
        message: currMsg,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }
      setCurrMsg("")
      // axios.addchatmessage will be here before emitting


      socket.emit("send_msg", msgdata)
      console.log("hi");

      //setMsgList((list) => [...list, msgdata])

    }
  }

  useEffect(()=>{
    socket.on("receive_msg", (data)=>{
    setMsgList((list) => [...list, data])
  })
  }, [socket])

if(viewable == "true"){
  return (
    <>
    <div className="chat">
      <div className="chatInfo">
        <span>{receiver_name}</span>
      </div>
      <div className="messages">
      {msgList.map((msgContent)=>{
        if(msgContent.author == sender_id){

        return(
              <div className="message" style={{display:'flex',flexDirection:'row-reverse'}}>
                <div className="messageContent" >
                  <p >{msgContent.message}</p>
                </div>
              </div>
            )
        }
        else{
          return(
          <div className="message" >
                <div className="messageContent">
                  <p >{msgContent.message}</p>
                </div>
              </div>
          )
        }
        })
        
        }
           
    </div>
    <div className="input">
      <input
        type="text"
        placeholder="Type something..." value={currMsg} onChange={(e)=>{setCurrMsg(e.target.value)}} onKeyPress={(event) => {event.key == 'Enter' &&  sendMsg()}}/>
      
      <div className="send">
        <button onClick={sendMsg}>Send</button>
      </div>
    </div>
    </div>
    </>
  );
}
else{
  return (
    <>
    <div className="chat">
      <div className="chatInfo">
        {/* <span>Kartikeya</span> */}
      </div>
      <div className="messages">
        {/* <Message /> */}
   
    </div>
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
      />
      <div className="send">
        <button>Send</button>
      </div>
    </div>
    </div>
    </>
  );
}
  
};

export default Chat;