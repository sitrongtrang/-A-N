import { Threshold } from "@/utils/AST";
import { Input } from "@chakra-ui/react";
import React, { useState } from "react";

const SensorInput = ({ ast }: { ast: any }) => {
  const [inpValue, setInpValue] = useState<string>("");
  const thresholdObj: Threshold = ast.addSubTree(ast.lhs, new Threshold(inpValue));
  return (
    <Input
      width={16}
      size="sm"
      bgColor="white"
      value={inpValue}
      onChange={e => {
        setInpValue(e.target.value)
      }}
    />
  );
};

export default SensorInput;
