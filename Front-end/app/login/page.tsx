'use client'

import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

const page = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <form className="md:w-4/5 lg:w-2/5 mx-auto bg-white p-10 rounded-3xl border-2 border-slate-300 my-auto">
      <h2 className="text-center font-bold text-4xl mb-10 ">Log In</h2>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <div className="mt-4 flex justify-end">
        <Button colorScheme="messenger">Log In</Button>
      </div>
    </form>
  );
};

export default page;
