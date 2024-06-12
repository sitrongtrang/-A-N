"use client";
import { FilterType, SensorInfoType } from "@/Type";
import Room from "@/components/Room";
import Card from "@/components/card/Card";
import FilterSection from "@/components/filter/FilterSection";
import MySelect from "@/components/filter/MySelectMult";
import ResetButton from "@/components/filter/ResetButton";
import SearchBar from "@/components/filter/SearchBar";
import {
  HumidSensorFactory,
  LightSensorFactory,
  TemperatureSensorFactory,
} from "@/utils/SensorFactory";
import { be_url } from "@/web_config";
import axios from "axios";
import React, { useEffect, useState } from "react";

const SensorsPage = () => {
  const [filterList, setFilterList] = useState<FilterType>({});
  const [sensorList, setSensorList] = useState<SensorInfoType[]>([]);

  const getStatusList = async () => {
    console.log("use effect in sensor page");
    try {
      const getDevices = await axios.get(`${be_url}/statusDevices`);

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
    getStatusList();
  }, []);

  useEffect(() => {
    const sensorInterval = setInterval(getStatusList, 2000);

    return () => clearInterval(sensorInterval);
  }, []);
  return (
    <>
      <FilterSection filterList={filterList} setFilterList={setFilterList}>
        <div className="flex gap-2 items-center">
          <MySelect
            optList={["Temperature Sensor", "Distance Sensor"]}
            filterList={filterList}
            setFilterList={setFilterList}
            objField="sensors"
            placeholder="Sensors"
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
          <ResetButton setFilterList={setFilterList} />
          <button className="bg-my-primary active:bg-blue-600 text-white py-1 px-2 rounded-md text-sm ml-auto">
            Add Room
          </button>
        </div>
      </FilterSection>
      <div className="mt-4 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {sensorList &&
          sensorList.map((sensor, idx) => (
            <Card key={idx} kind="sensors" device={sensor} />
          ))}
      </div>
    </>
  );
};

export default SensorsPage;
