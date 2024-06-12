"use client";

import React, { useState } from "react";
import { Select } from "@chakra-ui/react";
import DisplayNot from "./DisplayNot";
import DisplayBinary from "./DisplayBinary";

function convertOperator(selectOp: string) {
  let htmlEntityCode = ""
  if (selectOp == "and")
    htmlEntityCode = "and"
  else if (selectOp == "or")
    htmlEntityCode = "or"
  else if (selectOp == "not")
    htmlEntityCode = "not"
  else if (selectOp == "gt")
    htmlEntityCode = '\&gt;'
  else if (selectOp == "gte")
    htmlEntityCode = "\&ge;"
  else if (selectOp == "lt")
    htmlEntityCode = "&lt;"
  else if (selectOp == "lte")
    htmlEntityCode = "&le;"
  else if (selectOp == "ne")
    htmlEntityCode = "&ne;"
  else if (selectOp == "eq")
    htmlEntityCode = "&#61;";
  return htmlEntityCode
}

// The removal should be handle by selectExpr otherwise it will create a lot of redundant DisplayBinary

const SelectExp = ({ ast, pos }: { ast: any; pos: string }) => {
  const [op, setOp] = useState<string>("");
  const [isRemoveChild, setRemoveChild] = useState<boolean>(true)
  return (
    <>
      {isRemoveChild && (
        <Select
          placeholder="Choose operator"
          bgColor={"white"}
          size="sm"
          onChange={e => {
            setRemoveChild(false)
            setOp(e.target.value)
          }}
          width={40}
        >
          <option value="and">and</option>
          <option value="or">or</option>
          <option value="not">not</option>
          <option value="gt">&gt;</option>
          <option value="gte">&ge;</option>
          <option value="lt">&lt;</option>
          <option value="lte">&le;</option>
          <option value="ne">&ne;</option>
          <option value="eq">&#61;</option>
        </Select>
      )}
      {!isRemoveChild && op !== "not" && <DisplayBinary operator={convertOperator(op)} ast={ast} pos={pos} setRemoveChild={setRemoveChild}/>}
      {!isRemoveChild && op === "not" && <DisplayNot ast={ast} pos={pos} setRemoveChild={setRemoveChild}/>}
    </>
  );
};
export default SelectExp;
