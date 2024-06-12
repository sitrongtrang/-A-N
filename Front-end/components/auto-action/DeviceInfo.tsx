import { DeviceInfoType, SensorInfoType } from "@/Type";
import React from "react";

const DeviceInfo = ({
  deviceInf,
  handleClick,
}: {
  deviceInf: DeviceInfoType;
  handleClick: (deviceInfo: DeviceInfoType) => void;
}) => {
  return (
    <div
      className="bg-slate-200 p-4 rounded-lg cursor-pointer border-2 border-slate-300 hover:bg-slate-100"
      onClick={() => {
        handleClick(deviceInf);
      }}
    >
      <p>
        <span className="font-semibold">Device Name:</span> {deviceInf.name}
      </p>
      <p>
        <span className="font-semibold">Device Type:</span> {deviceInf.type}
      </p>
    </div>
  );
};

export default DeviceInfo;
