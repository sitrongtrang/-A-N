"use client";

import React, { useState } from "react";
import Card from "./card/Card";
import { Input } from "@chakra-ui/react";

type DeviceKind = "devices" | "sensors";

const Room = ({ name, kind }: { name: string, kind: DeviceKind }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [roomName, setRoomName] = useState(name);
  return (
    <div className="mt-6">
      <div className="flex items-center gap-2">
        {isEdit ? (
          <Input variant={"flushed"} value={roomName} width={40} onChange={e => setRoomName(e.target.value)}/>
        ) : (
          <h2 className="font-bold text-3xl">{roomName}</h2>
        )}

        <img src="/card/edit.png" className="w-6 h-6" onClick={() => {setIsEdit(previousState => !previousState)}}/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        <Card kind={kind} />
        <Card kind={kind} />
        <Card kind={kind} />
        <Card kind={kind} />
      </div>
    </div>
  );
};

export default Room;
