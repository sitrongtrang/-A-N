"use client";

import React, { useState } from "react";
import Member from "./Member";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  ButtonGroup,
} from "@chakra-ui/react";

const fakeUser = [
  {
    username: "Shimoe Koharu",
    email: "shimoekoharu1604@email.com",
  },
  {
    username: "Urawa Hanako",
    email: "urawahanako0301@email.com",
  },
  {
    username: "Sorasaki Hina",
    email: "sorasakihina192@email.com",
  },
  {
    username: "Shiromi Iori",
    email: "shiromiiori811@gmail.com",
  },
  {
    username: "Rikuhachima Aru",
    email: "rikuhachimaaru123@gmail.com",
  },
];

const HomeMng = () => {
  const [isOwner, setIsOwner] = useState<boolean>(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchMember, setSearchMember] = useState("")
  const [memberResult, setMemResult] = useState<{username:string, email:string} | null | undefined>(null)
  const [isSelect, setIsSelect] = useState<boolean>(false)
  return (
    <div>
      <p className="font-medium mt-2">
        {isOwner
          ? "You are the owner of this smart home"
          : "You are a member in this smart home"}
      </p>
      <h3 className="font-medium mt-4">List of member</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
        <Member />
        <Member />
        <Member />
        <Member />
      </div>
      <div className="mt-6">
        <Button colorScheme="messenger" onClick={onOpen}>
          Add Member
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <FormControl>
                <FormLabel>Find User</FormLabel>
                <div className="flex">
                  <Input
                    type="text"
                    placeholder="Enter user email"
                    value={searchMember}
                    onChange={e => {
                      setSearchMember(e.target.value);
                    }}
                    borderEndRadius={"none"}
                  />
                  <Button
                    borderStartRadius={"none"}
                    onClick={() => {
                      const res = fakeUser.find(
                        ele => ele.email == searchMember
                      );
                      setMemResult(res);
                    }}
                  >
                    Find
                  </Button>
                </div>
              </FormControl>
              <div>
                {memberResult ? (
                  <div className={`border-[1px] p-2 mt-4 rounded-md cursor-pointer select-none ${isSelect && "bg-slate-100"}`} onClick={() => {setIsSelect(prev => !prev)}}>
                    <p>
                      <span className="font-medium">username:</span>{" "}
                      {memberResult.username}
                    </p>
                    <p>
                      <span className="font-medium">email:</span>{" "}
                      {memberResult.email}
                    </p>
                  </div>
                ) : memberResult === undefined ? (
                  <p>Could not find that user</p>
                ) : (
                  <span></span>
                )}
              </div>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="green" isDisabled={!isSelect} onClick={() => {
                console.log("You added a member!!")
                onClose()
              }}>
                Add Member
              </Button>
              <Button
                colorScheme="blue"
                ml={3}
                onClick={() => {
                  setMemResult(null);
                  onClose();
                }}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default HomeMng;
