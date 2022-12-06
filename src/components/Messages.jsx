// import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
// import { ChatContext } from "../context/ChatContext";
// import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  // const [messages, setMessages] = useState([]);
  // const { data } = useContext(ChatContext);

  // useEffect(() => {
  //   const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
  //     doc.exists() && setMessages(doc.data().messages);
  //   });

  //   return () => {
  //     unSub();
  //   };
  // }, [data.chatId]);

  // console.log(messages)

  return (
    <>
    <div className="messages">
      {/* {messages.map((m) => ( */}
        {/* <Message message={m} key={m.id} /> */}
        <Message />
      {/* ))} */}
    </div>
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        // onChange={(e) => setText(e.target.value)}
        // value={text}
      />
      <div className="send">
        {/* <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label> */}
        {/* <button onClick={handleSend}>Send</button> */}
        <button>Send</button>
      </div>
    </div>
    </>
  );
};

export default Messages;