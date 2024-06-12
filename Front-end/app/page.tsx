"use client";

import Card from "@/components/card/Card";
import PersonWaterChart from "@/components/statistic/PersonWaterChart";
import WaterChart from "@/components/statistic/WaterChart";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { be_url } from "@/web_config";
import {DoorFactory, FanFactory, LightFactory} from "@/utils/DeviceFactory"
import {HumidSensorFactory, TemperatureSensorFactory, LightSensorFactory} from "@/utils/SensorFactory"
import { SensorInfoType } from "@/Type";

export default function Dashboard() {
  const [deviceList, setDeviceList] = useState([])
  const [sensorList, setSensorList] = useState<SensorInfoType[]>([])

  const getStatusList = async () => {
    console.log("Set interval in /dashboard");
    try {
      const getDevices = await axios.get(`${be_url}/statusDevices`);
      console.log(getDevices.data)
      const light1Id = getDevices.data.light1;
      const light2Id = getDevices.data.light2;
      const fanId = getDevices.data.fan;
      const doorId = getDevices.data.door;
      const lightFac = new LightFactory();
      const light1Obj = lightFac.createDevice(String(light1Id));
      const light2Obj = lightFac.createDevice(String(light2Id));

      const fanFac = new FanFactory();
      const fanObj = fanFac.createDevice(String(fanId));

      const doorFac = new DoorFactory();
      const doorObj = doorFac.createDevice(String(doorId));
      setDeviceList([
        light1Obj.displayState(),
        light2Obj.displayState(),
        fanObj.displayState(),
        doorObj.displayState(),
      ]);

      const humidSensorObj = new HumidSensorFactory().createDevice(
        "Humid Sensor",
        getDevices.data.humid
      );
      const lightSensorObj = new LightSensorFactory().createDevice(
        "Light Sensor",
        getDevices.data.uv
      );
      const TempSensorObj = new TemperatureSensorFactory().createDevice(
        "Temperature Sensor",
        getDevices.data.temp
      );
      setSensorList([
        TempSensorObj.displayState(),
        humidSensorObj.displayState(),
        lightSensorObj.displayState(),
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getStatusList()
  }, [])

  useEffect(() => {
    let myInterval = setInterval(getStatusList, 2000)
    return () => clearInterval(myInterval)
  }, []);
  // console.log(deviceList)
  // setInterval(() => {
  //   console.log("repeat after 10s")
    
  // }, 10000)
  return (
    <>
      <h3 className="text-xl font-semibold">My Devices</h3>
      <div className="mt-4 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {deviceList.length !== 0 &&
          deviceList.map((device, id) => (
            <Card
              key={id}
              kind="devices"
              device={device}
            />
          ))}
        {/* <Card kind="devices" />
        <Card kind="devices" /> */}
      </div>

      <h3 className="text-xl font-semibold mt-8">My Sensors</h3>
      <div className="mt-4 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {sensorList &&
          sensorList.map((sensor, idx) => (
            <Card
              key={idx}
              kind="sensors"
              device={sensor}
            />
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
        <WaterChart />
        {/* <PersonWaterChart /> */}
      </div>
    </>
  );
}
