"use client";
import { FilterType } from "@/Type";
import ActionList from "@/components/auto-action/ActionList";
import ActionCard from "@/components/card/ActionCard";
import FilterSection from "@/components/filter/FilterSection";
import MySelect from "@/components/filter/MySelectMult";
import SearchBar from "@/components/filter/SearchBar";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AutoActionPage = () => {
  const router = useRouter();
  const [filterList, setFilterList] = useState<FilterType>({});
  return (
    <>
      <FilterSection filterList={filterList} setFilterList={setFilterList}>
        <div className="flex items-center gap-1">
          <MySelect
            optList={["Temperature Sensor", "Distance Sensor"]}
            handleSelectChange={opt => {
              let updateSensorList = filterList?.sensors;
              if (!updateSensorList) updateSensorList = [opt];
              else {
                updateSensorList.indexOf(opt) == -1 &&
                  updateSensorList.push(opt);
              }
              setFilterList(old => ({ ...old, sensors: updateSensorList }));
            }}
            placeholder="Sensors"
          />
          <MySelect
            optList={["Fan", "Light", "Door"]}
            handleSelectChange={opt => {
              let updateDeviceList = filterList?.devices;
              if (!updateDeviceList) updateDeviceList = [opt];
              else {
                updateDeviceList.indexOf(opt) == -1 &&
                  updateDeviceList.push(opt);
              }
              setFilterList(old => ({ ...old, devices: updateDeviceList }));
            }}
            placeholder="Devices"
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
          <button
            className="bg-my-primary active:bg-blue-600 text-white py-1 px-2 rounded-md text-sm ml-auto"
            onClick={e => {
              router.push("/actions/add");
            }}
          >
            Add New Action
          </button>
        </div>
      </FilterSection>
      <ActionList>
        <ActionCard actionName="Action 1" />
        <ActionCard actionName="Action 2" />
        <ActionCard actionName="Action 3" />
        <ActionCard actionName="Action 4" />
      </ActionList>
    </>
  );
};

export default AutoActionPage;
