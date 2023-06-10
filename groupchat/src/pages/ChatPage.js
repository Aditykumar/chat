// import React from "react";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const ChatPage = () => {
//   const [chats, setChats] = useState([]);
//   const fetchChat = async () => {
//     const { data } = await axios.get("/api/chat");
//     setChats(data);
//   };
//   useEffect(() => {
//     fetchChat();
//   }, []);
//   console.log(chats);
//   return (
//     <div>
//       {chats.map((chat) => (
//         <div key={chat._id}>{chat.chatName}</div>
//       ))}
//     </div>
//   );
// };

// export default ChatPage;

import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/commonComponent/SideDrawer";
import Mychats from "../components/Mychats";
import ChatBox from "../components/ChatBox";

const ChatPage = () => {
  const { user } = ChatState();
const [fetchAgain,setFetchAgain]=useState(false)
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <Mychats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  );
};

export default ChatPage;
