"use client";
import Room from "@/components/Room";
import FilterSection from "@/components/filter/FilterSection";
import MySelect from "@/components/filter/MySelectMult";
import SearchBar from "@/components/filter/SearchBar";
import { FilterType } from "@/Type";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { be_url } from "@/web_config";
import { DoorFactory, FanFactory, LightFactory } from "@/utils/DeviceFactory";
import Card from "@/components/card/Card";

const Devices = () => {
  const [filterList, setFilterList] = useState<FilterType>({});
  const [deviceList, setDeviceList] = useState<any>();

  const getStatusList = async () => {
    console.log("Set interval in /devics");
    try {
      const getDevices = await axios.get(`${be_url}/statusDevices`);
      // console.log("In side Devices page ", getDevices.data);
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

  useEffect(() => {
    getStatusList();
  }, []);

  useEffect(() => {
    const devicesInterval = setInterval(getStatusList, 2000);
    return () => clearInterval(devicesInterval);
  }, []);

  // console.log(deviceList);

  return (
    <>
      {/* <FilterSection filterList={filterList} setFilterList={setFilterList}>
        <div className="flex gap-2 items-center">
          <MySelect
            optList={["Fan", "Light", "Door"]}
            filterList={filterList}
            setFilterList={setFilterList}
            objField="devices"
            placeholder="Devices"
          />
          <MySelect
            optList={["Living Room", "Kitchen", "Bedroom", "Bathroom", "Yard"]}
            filterList={filterList}
            setFilterList={setFilterList}
            objField="rooms"
            placeholder="Rooms"
          />
          <SearchBar
            handleSearch={searchKeyword => {
              setFilterList(old => ({ ...old, searchKey: searchKeyword }));
            }}
            placeholder="Search Device Name"
          />
          <button
            className="flex items-center gap-1 hover:rounded-full hover:bg-slate-200 p-2 text-sm"
            onClick={() =>
              setFilterList({ devices: [], sensors: [], searchKey: "" })
            }
          >
            <img src="/filter/reset.png" alt="reset" className="w-4" />
            Reset
          </button>
          <button className="bg-my-primary active:bg-blue-600 text-white py-1 px-2 rounded-md text-sm ml-auto">
            Add Room
          </button>
        </div>
      </FilterSection> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {deviceList &&
          deviceList.map((device, idx) => (
            <Card key={idx} kind="devices" device={device} />
          ))}
      </div>
      {/* <Room name="Living Room" kind="devices" />
      <Room name="Kitchen" kind="devices" />
      <Room name="Bedroom" kind="devices" />
      <Room name="Garden" kind="devices" /> */}
    </>
  );
};

export default Devices;
