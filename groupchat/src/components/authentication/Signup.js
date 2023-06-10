import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLodaing] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const postDetails = (pics) => {

    setPic("https://w0.peakpx.com/wallpaper/588/847/HD-wallpaper-ironman-jfcx-rsj.jpg")



    // setLodaing(true);
    // if (pics === undefined) {
    //   toast({
    //     title: "Please Select an Image!",
    //     status: "warning",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "bottom",
    //   });
    //   return;
    // }
    // if (
    //   pics.type === "image/jpeg" ||
    //   pics.type === "image/png" ||
    //   pics.type === "image/jpg"
    // ) {
    //   const data = new FormData();
    //   data.append("files", pics);
    //   data.append("upload_preset", "chat-now");
    //   // data.append("cloud_name", "aditykumar");
    //   fetch("https://api.cloudinary.com/v1_1/aditykumar", {
    //     method: "POST",
    //     body: data,
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setPic(data.url.toString());
    //       setLodaing(false);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       setLodaing(false);
    //     });
    // } else {
    //   toast({
    //     title: "Please Select an Image!",
    //     // description: "We've created your account for you.",
    //     status: "warning",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "bottom",
    //   });
    //   return;
    // }
  };
  const submitHandler = async () => {
    setLodaing(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please Fill all the Fields",
        // description: "We've created your account for you.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLodaing(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Password Do Not Match",
        // description: "We've created your account for you.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLodaing(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/user`,
        { name, email, password, pic },
        config
      );

      toast({
        title: "Registration Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));

      setLodaing(false);
      navigate("/chat");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setLodaing(false);
    }
  };
  return (
    <VStack spacing={"5px"}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button onClick={() => setShow(!show)} h="1.75rem" size="sm">
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirm-assword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button onClick={() => setShow(!show)} h="1.75rem" size="sm">
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic" 
      // isRequired
      >
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={0.5}
          accept="image/*"
          placeholder="Enter Your Name"
          onChange={(e) => postDetails(e.target.value[0])}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
