import "./Assets/CSS/App.css";
import { Switch, Route, useHistory } from "react-router-dom";
import Nav from "./Nav";
// import Chat from "./Chat";
import io from 'socket.io-client'
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import RecentChat from "./components/RecentChat";
import Navbar from "./components/Navbar";
import Chat from "./components/chat";
import data from "./Data";
import "./Assets/CSS/UserHome.scss";
import {socket} from './index'
const url = process.env.url || 'http://localhost:5000';


function UserHome() {
  
  const [Err, setErr] = useState("")
  const [userChats, setUserChats] = useState([])
  const [num, setNum] = useState(5)
  const [view, setView] = useState("fasle")
  const[sender_id, setSender_id] = useState("")
  const[receiver_id, setReceiver_id] = useState("")
  const[sender_name, setSender_name] = useState("")
  const[receiver_name, setReceiver_name] = useState("")
  const[room, setRoom] = useState("")
  const[msgHistory, setMsgHistory] = useState([])
  const [currMsg, setCurrMsg] = useState("")
  const[msgList, setMsgList] = useState([])  


  useEffect(()=>{setMsgHistory([])},[room])


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

  const sendMsg = async ()=>{
    console.log("sent button clicked")
    console.log(currMsg)
    if(currMsg !== ""){
      const msgdata = {
        room: room,
        author: sender_id,
        message: currMsg,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }
      console.log(msgdata)
      setCurrMsg("")
      // axios.addchatmessage will be here before emitting
      

      socket.emit("send_msg", msgdata)
      console.log(currMsg)
      console.log(msgList)
      setMsgList((list) => [...list, msgdata])
      console.log(msgList)

    }
  }

  useEffect(()=>{
    socket.on("receive_msg", (data)=>{
    setMsgList((list) => [...list, data])
  })
  }, [socket])

  function rend(){
      
    if(view == "true"){
      console.log(msgList)
      return (
        <>
        <div className="chat">
          <div className="chatInfo">
            <span>{receiver_name}</span>
          </div>
          <div className="messages">
          {msgList.map((msgContent)=>{

            if(msgContent.author == sender_id){
              console.log('m')
            return(
              <div >
                  <div className="message" style={{display:'flex',flexDirection:'row-reverse'}}>
                    <div className="messageContent" >
                      <p style={{borderRadius: '10px 0px 10px 10px'}}>{msgContent.message}</p>
                    </div>
                  </div>
                </div>
                )
            }
            else{
              return(
                <div >
              <div className="message" >
                    <div className="messageContent">
                      <p >{msgContent.message}</p>
                    </div>
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
  
  
  
  }




  return (
    <>
    <Nav />
    {/* Here the side pannel code will be there and ideally once the chat is clicked the joinRoom func should be called */}
    {/* {joinRoom()}
    <Chat socket = {socket} sender_id = {sender_id} receiver_id={receiver_id} room={room}/> */}

    <div className="home">
      <div className="container">

      <div className="sidebar">
      <Navbar />

      {userChats.map((chats)=>{
     return(
          <>
            <div className="chats">
              <div className="userChat" >        
                <div className="userChatInfo" >
                  <span onClick={()=>{
                    if(msgList == []){
                    // axios.getUserchat will be here
                    socket.emit("join_room", chats.c_id)
                    setView("true"); 
                    setSender_id(chats.sender_id); 
                    setReceiver_id(chats.receiver_id); 
                    setReceiver_name(chats.receiver_name); 
                    setRoom( chats.c_id);
                    setMsgList([])
                    try{
                      axios.post(`${url}/getchatbyid`, {"c_id": chats.c_id})
                    .then((res)=>{
                        if(res.data.success){
                          //setMsgList([])
                          setMsgList(res.data.rows.msgList)
                        }
                        else{
                          setMsgList([])
                        }
                    }, (err)=>{console.log(err)})

                    }
                    catch(err){
                      setMsgList([])
                    }
                    }
                    else{
                      
                      axios.post(`${url}/updatechatbyid`, {"c_id": room, "history" : {"msgList" : msgList}})
                      .then((res)=>{
                          if(res.data.success){
                            socket.emit("join_room", chats.c_id)
                            setView("true"); 
                            setSender_id(chats.sender_id); 
                            setReceiver_id(chats.receiver_id); 
                            setReceiver_name(chats.receiver_name); 
                            setRoom( chats.c_id);
                            setMsgList([])
                            try{
                              axios.post(`${url}/getchatbyid`, {"c_id": chats.c_id})
                            .then((res)=>{
                                if(res.data.success){
                                  //setMsgList([])
                                  setMsgList(res.data.rows.msgList)
                                }
                                else{
                                  setMsgList([])
                                }
                            }, (err)=>{console.log(err)})

                            }
                            catch(err){
                              setMsgList([])
                            }
                          }
                      }, (err)=>{console.log(err)})
                    }
                    
                    console.log(msgHistory)
                    }}>{chats.receiver_name}</span>             
                </div>
              </div>
            </div>
            
          </>
          )
        })}
   </div>
        
    

      {rend()}
   {/* <Chat viewable = {view} socket = {socket} sender_id = {sender_id} receiver_id={receiver_id} room={room} receiver_name = {receiver_name} messageHistory = {msgHistory}/> */}
   
        
      </div>

    </div>
    </>
  );
}

export default UserHome;