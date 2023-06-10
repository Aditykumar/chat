import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const UserListItem = ({user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor={"pointer"}
      bg="e7e7e7"
      _hover={{
        background: "#38b2ac",
        color: "white",
      }}
      w="100%"
      display={"flex"}
      alignItems={"center"}
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius={"lg"}
    >
      <Avatar
        mr={2}
        size="sm"
        cursor={"pointer"}
        name={user.name}
        src={user.pic}
      ></Avatar>
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize={"xs"}>
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
