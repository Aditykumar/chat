import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  effect,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChevronDownIcon, BellIcon } from "@chakra-ui/icons";
import { ChatState } from "../../context/ChatProvider";
import ProfileModel from "./ProfileModel";
import { useNavigate } from "react-router-dom";
import NotificationBadge, { Effect } from "react-notification-badge"
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { getSender } from "../../config/ChatLogic";
const SideDrawer = () => {
  const [search, setSearch] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { user,setSelectedChat,chats,setChats,notification,setNotification } = ChatState();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

const handelSearch=async()=>{
    if (!search) {
        toast({
            title: "Please Enter something in search",
            // description: "We've created your account for you.",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top-left",
          });
        return;
    }
    try {
        setLoading(true)
        const config={
            headers:{
                Authorization:`Bearer ${user.token}`,
            },
        };
        const {data}=await axios.get(`https://chatapp-loh5.onrender.com/api/user?search=${search}`,config);
        setLoading(false)
        setSearchResult(data)
    } catch (error) {
        toast({
            title: "Error Occured!!",
            description: "Failed to Load the Search Results",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });

    }
}

const accessChat=async (userId)=>{
    try {
        setLoadingChat(true)
        const config={
            headers:{
                "Content-type":"application/json",
                Authorization:`Bearer ${user.token}`,
            },
        };

        const {data}=await axios.post(`https://chatapp-loh5.onrender.com/api/chat`,{userId},config);
       
       if (!chats.find((c)=>c._id===data._id)) setChats([data,...chats])
        setSelectedChat(data)
        setLoadingChat(true)
        onClose()
    } catch (error) {
        toast({
            title: "Error fetching the chat!",
            description:error.massege,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
    }

}
  const logOutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        bg="white"
        p="5px 10px 5px 10px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
            <Text display={{ base: "nane", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Chat Now
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
              count={notification.length}
              effect={Effect.SCALE}
              />
              <BellIcon fontSize={"2xl"} m={1} />
            </MenuButton>
            <MenuList>
              {!notification.length? <Text textAlign={"center"}  paddingLeft={2} paddingRight={2}>No New Message</Text>:

              (notification.map(newNotification=>(
                <MenuItem key={newNotification._id} onClick={()=>{
                  setSelectedChat(newNotification.chat)
                  setNotification(notification.filter((n)=>n!==newNotification))
                }}>
                  <Text isTruncated maxWidth={"198px"}>

                  {newNotification.chat.isGroupChat?`Message in ${newNotification.chat.chatName}`:
                  `Message from ${getSender(user,newNotification.chat.users)}`
                  }
                  </Text>
                </MenuItem>
              )))
              }
             </MenuList>
          </Menu>
          <Menu>
            <MenuButton p={1} as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModel user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModel>
              <MenuDivider />
              <MenuItem onClick={logOutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"1px"}>Search Users</DrawerHeader>
          <DrawerBody>
            <Box display={"flex"} pb={2}>
              <Input
                placeholder={"Search by name or email"}
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handelSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat&&<Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
