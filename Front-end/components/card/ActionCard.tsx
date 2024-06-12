"use client";

import { Input, Tag, TagLabel } from "@chakra-ui/react";
import React, { useState } from "react";

const ActionCard = ({ actionName }: { actionName: string }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [actName, setActName] = useState<string>(actionName);
  return (
    <div className="bg-white p-4 rounded-2xl border-gray-100 border-2 w-full flex flex-col">
      <div className="flex items-center gap-2 text-my-secondary">
        {isEdit ? (
          <Input
            variant="flushed"
            value={actName}
            size="lg"
            onChange={e => setActName(e.target.value)}
          />
        ) : (
          <h2 className="font-semibold text-lg">{actName}</h2>
        )}
        <img
          src="/card/edit.png"
          alt="edit"
          onClick={() => setIsEdit(old => !old)}
        />
      </div>
      <div className="flex flex-col gap-2 md:flex-row mt-4">
        <p className="font-medium">Controlling Sensor(s): </p>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((ele, id) => (
            <Tag key={id} bgColor="#718EBF" color="#FFFFFF">
              <TagLabel>Tag 2</TagLabel>
            </Tag>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 md:flex-row mt-4">
        <p className="font-medium">Controlled Device(s): </p>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((ele, id) => (
            <Tag key={id} bgColor="#718EBF" color="#FFFFFF">
              <TagLabel>Tag 2</TagLabel>
            </Tag>
          ))}
        </div>
      </div>
      <button className="bg-my-secondary text-white font-medium px-2 py-1 rounded-md active:bg-[#8EABDE] mt-4 ml-auto">
        See Detail
      </button>
    </div>
  );
};

export default ActionCard;
