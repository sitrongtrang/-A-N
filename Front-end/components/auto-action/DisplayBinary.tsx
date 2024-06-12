"use client";

import React, { useEffect, useState } from "react";
import SelectExp from "./SelectExp";
import SelectTimeOrSensor from "./SelectTimeOrSensor";
import CondInput from "./SensorInput";
import SensorInput from "./SensorInput";
import DateInput from "./DateInput";
import { BinaryOp, IfStmt, NotOp } from "@/utils/AST";
import { AstType, cmpType } from "@/Type";
import next from "next";

const DisplayBinary = ({
  operator,
  pos,
  ast,
  setRemoveChild,
}: {
  operator: string;
  pos: string;
  ast: any;
  setRemoveChild: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [cmpType, setCmpType] = useState<cmpType>("Choosing")
  console.log("current operator ", operator)
  let nextAst = null;
  if (pos == "left")
    nextAst = ast.addSubTree(new BinaryOp(operator, null, null), ast.rhs, "left")
  else if (pos == "right") 
    nextAst = ast.addSubTree(ast.lhs, new BinaryOp(operator, null, null), "right")
  else 
    nextAst = ast.addSubTree(new BinaryOp(operator, null, null))

  return (
    <div className="flex items-center flex-wrap gap-2">
      <span className="font-semibold text-2xl select-none">(</span>
      {["and", "or"].indexOf(operator) == -1 ? (
        <SelectTimeOrSensor
          ast={nextAst}
          cmpType={cmpType}
          setCmpType={setCmpType}
        />
      ) : (
        <SelectExp ast={nextAst} pos="left" />
      )}{" "}
      <span
        className="font-semibold select-none"
        dangerouslySetInnerHTML={{ __html: operator }}
      >
        {/* {operator} */}
      </span>
      {["and", "or"].indexOf(operator) == -1 ? (
        cmpType == "Sensor" ? (
          <SensorInput ast={nextAst} />
        ) : cmpType == "Time" ? (
          <DateInput ast={nextAst} />
        ) : (
          <p>Waiting...</p>
        )
      ) : (
        <SelectExp ast={nextAst} pos="right" />
      )}
      <span
        className="w-6 h-6 rounded-full flex items-center justify-center bg-slate-300 active:bg-slate-200"
        onClick={() => {
          console.log("Remove child node ", nextAst)
          ast.removeSubTree(pos);
          setRemoveChild(true);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="0.5rem"
          height="0.5rem"
          viewBox="0 0 14 14"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M1.707.293A1 1 0 0 0 .293 1.707L5.586 7L.293 12.293a1 1 0 1 0 1.414 1.414L7 8.414l5.293 5.293a1 1 0 0 0 1.414-1.414L8.414 7l5.293-5.293A1 1 0 0 0 12.293.293L7 5.586z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      <span className="font-semibold text-2xl select-none">)</span>
    </div>
  );
};

export default DisplayBinary;
