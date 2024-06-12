"use client";

import React from "react";
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from "@chakra-ui/react";
import { FilterType } from "@/Type";

const FilterSection = ({
  children,
  filterList,
  setFilterList,
}: {
  children: React.ReactNode;
  filterList: FilterType;
  setFilterList: React.Dispatch<React.SetStateAction<FilterType>>;
}) => {
  return (
    <>
      {children}
      <div className="mt-2 flex flex-wrap gap-4">
        {filterList.devices &&
          filterList.devices.map((e, idx) => (
            <Tag
              key={idx}
              size="md"
              borderRadius="full"
              backgroundColor={"#718EBF"}
              className="p-1"
            >
              <TagLabel className="text-white">{e}</TagLabel>
              <TagCloseButton
                className="*:brightness-0 *:invert"
                onClick={() =>
                  setFilterList(old => {
                    let updateDeviceList =
                      old.devices && old.devices.filter(device => device !== e);
                    return { ...old, devices: updateDeviceList };
                  })
                }
              />
            </Tag>
          ))}

        {filterList.sensors &&
          filterList.sensors.map((e, idx) => (
            <Tag
              key={idx}
              size="md"
              borderRadius="full"
              backgroundColor={"#718EBF"}
              className="p-1"
            >
              <TagLabel className="text-white">{e}</TagLabel>
              <TagCloseButton
                className="*:brightness-0 *:invert"
                onClick={() =>
                  setFilterList(old => {
                    let updateSensorList =
                      old.sensors && old.sensors.filter(device => device !== e);
                    return { ...old, sensors: updateSensorList };
                  })
                }
              />
            </Tag>
          ))}

        {filterList.rooms &&
          filterList.rooms.map((e, idx) => (
            <Tag
              key={idx}
              size="md"
              borderRadius="full"
              backgroundColor={"#718EBF"}
              className="p-1"
            >
              <TagLabel className="text-white">{e}</TagLabel>
              <TagCloseButton
                className="*:brightness-0 *:invert"
                onClick={() =>
                  setFilterList(old => {
                    let updateRoomList =
                      old.rooms && old.rooms.filter(room => room !== e);
                    return { ...old, rooms: updateRoomList };
                  })
                }
              />
            </Tag>
          ))}

        {filterList.searchKey && filterList.searchKey.length !== 0 && (
          <Tag
            size="md"
            borderRadius="full"
            backgroundColor={"#718EBF"}
            className="p-1"
          >
            <TagLabel className="text-white">{filterList.searchKey}</TagLabel>
            <TagCloseButton
              className="*:brightness-0 *:invert"
              onClick={() =>
                setFilterList(old => {
                  return { ...old, searchKey: "" };
                })
              }
            />
          </Tag>
        )}
        {filterList.dateFrom && (
          <Tag
            size="md"
            borderRadius="full"
            backgroundColor={"#718EBF"}
            className="p-1"
          >
            <TagLabel className="text-white">
              From {filterList.dateFrom.toDateString()}
            </TagLabel>
            <TagCloseButton
              className="*:brightness-0 *:invert"
              onClick={() =>
                setFilterList(old => {
                  return { ...old, dateFrom: undefined };
                })
              }
            />
          </Tag>
        )}

        {filterList.dateTo && (
          <Tag
            size="md"
            borderRadius="full"
            backgroundColor={"#718EBF"}
            className="p-1"
          >
            <TagLabel className="text-white">
              Until {filterList.dateTo.toDateString()}
            </TagLabel>
            <TagCloseButton
              className="*:brightness-0 *:invert"
              onClick={() =>
                setFilterList(old => {
                  return { ...old, dateTo: undefined };
                })
              }
            />
          </Tag>
        )}
      </div>
    </>
  );
};

export default FilterSection;
