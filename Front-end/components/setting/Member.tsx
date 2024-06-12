import React from 'react'
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";

const Member = () => {
  return (
    <div className="flex gap-2 items-center">
      <div>
        <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
      </div>
      <div>
        <p className="text-sm font-medium">Username</p>
        <p className="text-sm font-medium">User email</p>
      </div>
    </div>
  );
}

export default Member