"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";

const Profile = () => {
  const [profile, setProfile] = useState({email: "", username: ""});
  return (
    <div className="mt-6 ">
      <div className="flex gap-20">
        <form
          action=""
          className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full"
        >
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={profile.username}
              onChange={e =>
                setProfile(old => ({ ...old, username: e.target.value }))
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={profile.email}
              onChange={e =>
                setProfile(old => ({ ...old, email: e.target.value }))
              }
            />
          </FormControl>
          <div className="col-span-full flex justify-end gap-4">
            <Button colorScheme="red" onClick={() => {console.log(profile)}}>Logout</Button>
            <Button colorScheme="messenger" onClick={() => {console.log(profile)}}>Update</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
