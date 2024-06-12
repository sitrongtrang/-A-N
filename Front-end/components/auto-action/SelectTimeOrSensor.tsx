"use client";

import { Select } from "@chakra-ui/react";
import React, { useState } from "react";
import SelectSensor from "./SelectSensor";
import { cmpType } from "@/Type";
import { AstTime } from "@/utils/AST";

const SelectTimeOrSensor = ({
  cmpType,
  setCmpType,
  ast
}: {
  cmpType: cmpType;
  setCmpType: React.Dispatch<React.SetStateAction<cmpType>>;
  ast: any
}) => {
  if (cmpType == "Choosing")
    return (
      <Select
        placeholder="Option"
        size="sm"
        bgColor={"white"}
        width={32}
        onChange={e => {
          if (e.target.value == "Time") {
            setCmpType("Time");
          } else if (e.target.value == "Sensor") {
            setCmpType("Sensor");
          }
        }}
      >
        <option value="Time">Time</option>
        <option value="Sensor">Sensor</option>
      </Select>
    );
  else if (cmpType == "Sensor")
    return <SelectSensor ast={ast}/>
  else if (cmpType == "Time") {
    ast.addSubTree(new AstTime(), ast.rhs, "left")
    return <span>CurrenTime</span>
  }
};

export default SelectTimeOrSensor;
