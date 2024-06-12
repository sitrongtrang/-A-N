import React, { useState } from "react";
import SelectExp from "./SelectExp";
import { BinaryOp, NotOp } from "@/utils/AST";

const DisplayNot = ({
  setRemoveChild,
  ast,
  pos
}: {
  setRemoveChild: React.Dispatch<React.SetStateAction<boolean>>;
  ast: any,
  pos: string
}) => {
  let nextAst = null;
  if (pos == "left")
    nextAst = ast.addSubTree(new NotOp(null), ast.rhs);
  else if (pos == "right")
    nextAst = ast.addSubTree(ast.lhs, new NotOp(null));
  else nextAst = ast.addSubTree(new NotOp(null));

  return (
    <div className="flex items-center flex-wrap gap-1">
      <span className="font-semibold select-none text-2xl">(</span>
      <span className="font-semibold select-none">not</span>
      <SelectExp ast={nextAst} pos="none"/>
      <span
        className="w-6 h-6 rounded-full flex items-center justify-center bg-slate-300 active:bg-slate-200"
        onClick={() => {
          if (pos == "none")
            ast.removeSubTree()
          else 
            ast.removeSubTree(pos)
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
      <span className="font-semibold select-none text-2xl">)</span>
    </div>
  );
};

export default DisplayNot;
