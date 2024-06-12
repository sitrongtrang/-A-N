"use client";

import { DeviceInfoType } from "@/Type";
import ASTChecker from "@/visitor/VisitCheck";
import ActionList from "@/components/auto-action/ActionList";
import SelectAction from "@/components/auto-action/SelectAction";
import SelectExp from "@/components/auto-action/SelectExp";
import { DeviceNode, IfStmt } from "@/utils/AST";
import { Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useToast } from "@chakra-ui/react";
import ASTJsonParser from "@/visitor/VisitJsonParse";

const AddAction = () => {
  const toast = useToast();
  const [actionName, setActionName] = useState<string>("");
  const [actionList, setActionList] = useState<
    {
      device: DeviceInfoType;
      state: number | null;
    }[]
  >([]);
  const ast = new IfStmt(null, []);
  ast.actions = actionList.map(
    ele =>
      new DeviceNode(
        ele.device.name,
        ele.device.type,
        ele.state ? ele.state : 0
      )
  );
  return (
    <>
      <h2 className="font-semibold text-xl mb-2">Action Name</h2>
      <Input
        variant={"outline"}
        placeContent="Enter Action name here"
        bgColor={"white"}
        size={"sm"}
        value={actionName}
        onChange={e => {
          setActionName(e.target.value);
        }}
      />
      <h2 className="font-semibold text-xl mb-2 mt-4">Condition</h2>
      <div>
        <SelectExp ast={ast} pos="none" />
      </div>
      <div className="flex items-center gap-4 mt-4">
        <h2 className="font-semibold text-xl">Actions</h2>
        <Button
          colorScheme="blue"
          size="sm"
          onClick={() => {
            setActionList(oldLst => {
              const newArr = oldLst.map(dev => ({ ...dev }));
              newArr.push({
                device: { name: "", type: "" },
                state: null,
              });
              return newArr;
            });
          }}
        >
          New Action
        </Button>
      </div>

      <ActionList>
        {actionList.map((deviceObj, idx) => (
          <SelectAction
            key={uuid()}
            deviceObj={deviceObj}
            updateActionList={setActionList}
            actionListIdx={idx}
          />
        ))}
        {/* <SelectAction ast={ast}/> */}
      </ActionList>
      <div className="w-full flex justify-end">
        <Button
          bgColor="#3531F0"
          color={"white"}
          _hover={{ bgColor: "#5855FC" }}
          onClick={() => {
            console.log(ast);
            try {
              const actChecker = new ASTChecker(ast);
              const astJson = new ASTJsonParser(ast, actionName);
              console.log(astJson);
            } catch (e: any) {
              // alert(e);
              toast({
                title: e.err,
                description: e.message,
                status: "error",
                duration: 2000,
                isClosable: true,
                position: 'top'
              });
            }
            
          }}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default AddAction;
