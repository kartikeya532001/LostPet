import React from "react";
import Navbar from "./Navbar";
import Chats from "./Chats";
import data from "./Data";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />

      {data.map((requests) => (
     <Chats 
        ID={requests.ID}
         name={requests.name}  
     />
   ))}
   </div>
  
  );
};

export default Sidebar;