"use client";

import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";

function PasswordInput({pwd, setPwd}: {
  pwd: string;
  setPwd: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Enter password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default PasswordInput;
