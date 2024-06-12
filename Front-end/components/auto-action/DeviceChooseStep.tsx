import React, { useEffect, useState } from "react";
import FilterSection from "../filter/FilterSection";
import { DeviceInfoType, FilterType } from "@/Type";
import MySelectMultiple from "../filter/MySelectMult";
import ResetButton from "../filter/ResetButton";
import DeviceInfo from "./DeviceInfo";
import { DoorFactory, FanFactory, LightFactory } from "@/utils/DeviceFactory";
import axios from "axios";
import { be_url } from "@/web_config";

const DeviceChooseStep = ({
  handleAction,
  moveNext
}: {
  handleAction: React.Dispatch<
    React.SetStateAction<{
      device: DeviceInfoType;
      state: number | null;
    }>
  >;
  moveNext: () => void
}) => {
  console.log("Choosing list of device")
  const [filter, setFilter] = useState<FilterType>({});
  const [deviceList, setDeviceList] = useState<any>();
  useEffect(() => {
    const getStatusList = async () => {
      try {
        console.log("Retrieving list of devices")
        const getDevices = await axios.get(`${be_url}/statusDevices`);
        console.log("In side Devices page ", getDevices.data);
        const devices = [];
        for (let [key, value] of Object.entries(getDevices.data)) {
          if (key !== "humid" && key !== "uv" && key !== "temp") {
            if (String(value)[0] == "1" || String(value)[0] == "2")
              devices.push(
                new LightFactory().createDevice(String(value)).displayState()
              );
            else if (String(value)[0] == "3")
              devices.push(
                new DoorFactory().createDevice(String(value)).displayState()
              );
            else
              devices.push(
                new FanFactory().createDevice(String(value)).displayState()
              );
          }
        }
        setDeviceList(devices);
      } catch (e) {
        console.log(e);
      }
    };

    getStatusList();
  }, []);

  console.log(deviceList)



  return (
    <>
      <FilterSection filterList={filter} setFilterList={setFilter}>
        <div className="flex gap-2">
          <MySelectMultiple
            optList={["Fan", "Light", "Door"]}
            filterList={filter}
            setFilterList={setFilter}
            objField="devices"
            placeholder="Device"
          />
          <MySelectMultiple
            optList={["Room1", "Room2", "Room3"]}
            filterList={filter}
            setFilterList={setFilter}
            objField="rooms"
            placeholder="Room"
          />
          <ResetButton setFilterList={setFilter} />
        </div>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-4">
          {deviceList && deviceList.map((ele, id) => (
            <DeviceInfo
              key={id}
              deviceInf={ele}
              handleClick={chosenDevice => {
                handleAction(old => ({ ...old, device: chosenDevice }));
                moveNext()
              }}
            />
          ))}
        </div>
      </FilterSection>
    </>
  );
};

export default DeviceChooseStep;
