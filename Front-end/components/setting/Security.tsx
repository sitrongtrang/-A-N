'use client'

import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";
import PasswordInput from "./PwdInput";

const Security = () => {
  const [pwd, setPwd] = useState<string>("")
  const [repwd, setRepwd] = useState<string>("") 
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-6">
      <FormControl>
        <FormLabel>Password</FormLabel>
        <PasswordInput pwd={pwd} setPwd={setPwd} />
      </FormControl>
      <FormControl>
        <FormLabel>Re-enter password</FormLabel>
        <PasswordInput pwd={repwd} setPwd={setRepwd} />
      </FormControl>
      <div className="col-span-full flex justify-end">
        <Button colorScheme="messenger">Change Password</Button>
      </div>
    </div>
  );
};

export default Security;
