import React, { useContext } from "react";
// import Cam from "../img/cam.png";
// import Add from "../img/add.png";
// import More from "../img/more.png";
// import Messages from "./Messages";
// import Input from "./Input";
import Message from "./Message";

// import { ChatContext } from "../context/ChatContext";

const Chat = () => {


  return (
    <>
    <div className="chat">
      <div className="chatInfo">
        <span>Kartikeya</span>
      </div>
      <div className="messages">
        <Message />
   
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
};

export default Chat;