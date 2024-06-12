"use client";
import React, { useEffect, useState } from "react";
import { Switch, Input } from "@chakra-ui/react";
import axios from "axios";
import { be_url } from "@/web_config";
import DeviceState from "./DeviceState";

type DeviceKind = "devices" | "sensors";

const Card = ({ device, kind }: { device: any; kind: DeviceKind}) => {
  // console.log("Rerender Cart")
  // const [mydevice, setDevice] = useState(device)
  const [state, setState] = useState<number>(device.state);
  // const [isChange, setIsChange] = useState(false);
  // const [changeName, setChangeName] = useState("Device Name");
  useEffect(() => {
    setState(device.state)
  }, [device])
  async function changeDeviceState(state: number, type: string) {
    setState(state);
    try {
      let sendFormat = {};
      if (type == "fan") {
        sendFormat = {
          topic: "thinhdadn/feeds/V2/fan",
          message: "4" + state * 25,
        };
      } else if (type == "door") {
        sendFormat = {
          topic: "thinhdadn/feeds/V2/door",
          message: "3" + (state == 0 ? "2" : "1"),
        };
      } else if (type == "light") {
        sendFormat = {
          topic: "thinhdadn/feeds/V2/lights",
          message:
            (state == 0 ? "2" : "1") +
            device.name.slice(device.name.length - 1),
        };
      }
      const changeState = await axios.post(
        `${be_url}/publish/topic/message`,
        sendFormat
      );
      // console.log(changeState.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="bg-white w-full p-4 rounded-2xl flex flex-col border-2 border-gray-200">
      <div className="flex items-center gap-4 w-full h-6">
        <img
          src={`/card/${
            device &&
            (device.type == "fan"
              ? "fan"
              : device.type == "light"
              ? "light"
              : device.type == "door"
              ? "door"
              : device.type == "humid"
              ? "humidity"
              : device.type == "sun"
              ? "sun"
              : "temp")
          }.png`}
          alt=""
        />
        {/* {isChange ? (
          <Input
            variant="flushed"
            value={changeName}
            onChange={e => setChangeName(e.target.value)}
          />
        ) : ( */}
        <h4 className="text-lg font-semibold text-my-secondary">
          {device && device.name}
        </h4>
        {/* )} */}
        {/* <img
          src="/card/edit.png"
          alt=""
          onClick={() => setIsChange(old => !old)}
          className="ml-auto"
        /> */}
      </div>
      {kind == "devices" ? (
        <>
          <div className="mt-4">
            {device && <DeviceState type={device.type} state={state}/>}
            {/* <p>
              <span className="font-semibold">State:</span>{" "}
              {device &&
                (device.type == "fan"
                  ? state == 0
                    ? "Off"
                    : device.state
                  : device.type == "door"
                  ? state == 0
                    ? "Lock"
                    : "Unlock"
                  : state == 0
                  ? "Off"
                  : "On")}
            </p> */}
          </div>
          <div className="mt-10">
            {device.type !== "fan" ? (
              <Switch
                size="lg"
                isChecked={state == 0 ? false : true}
                onChange={async () => {
                  // setState(old => (old + 1) % 2);
                  await changeDeviceState((state + 1) % 2, device.type);
                }}
              />
            ) : (
              <div className="flex gap-2">
                <div
                  className={`w-8 h-8 flex justify-center items-center font-semibold rounded-full border-2 border-my-secondary cursor-pointer ${
                    state == 0 ? "bg-my-secondary" : ""
                  }`}
                  onClick={async () => {
                    // setState(device.state);
                    await changeDeviceState(0, device.type);
                  }}
                >
                  0
                </div>
                <div
                  className={`w-8 h-8 flex justify-center items-center font-semibold rounded-full border-2 border-my-secondary cursor-pointer ${
                    state == 1 ? "bg-my-secondary" : ""
                  }`}
                  onClick={async () => {
                    // setState(1);
                    await changeDeviceState(1, device.type);
                  }}
                >
                  1
                </div>
                <div
                  className={`w-8 h-8 flex justify-center items-center font-semibold rounded-full border-2 border-my-secondary cursor-pointer ${
                    state == 2 ? "bg-my-secondary" : ""
                  }`}
                  onClick={async () => {
                    // setState(2);
                    await changeDeviceState(2, device.type);
                  }}
                >
                  2
                </div>
                <div
                  className={`w-8 h-8 flex justify-center items-center font-semibold rounded-full border-2 border-my-secondary cursor-pointer ${
                    state == 3 ? "bg-my-secondary" : ""
                  }`}
                  onClick={async () => {
                    // setState(3);
                    await changeDeviceState(3, device.type);
                  }}
                >
                  3
                </div>
                <div
                  className={`w-8 h-8 flex justify-center items-center font-semibold rounded-full border-2 border-my-secondary cursor-pointer ${
                    state == 4 ? "bg-my-secondary" : ""
                  }`}
                  onClick={async () => {
                    // setState(4);
                    await changeDeviceState(4, device.type);
                  }}
                >
                  4
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="mt-4 h-full flex justify-center items-center">
          <p className="font-semibold text-7xl">
            {device.value}
            {device.type == "temp" ? (
              <>
                <sup>o</sup>C
              </>
            ) : device.type == "humid" ? (
              " RH"
            ) : (
              " lx"
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default Card;
