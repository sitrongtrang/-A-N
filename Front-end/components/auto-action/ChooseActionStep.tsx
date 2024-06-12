import React from "react";
import DeviceInfo from "./DeviceInfo";
import { DeviceInfoType } from "@/Type";
import { Select } from "@chakra-ui/react";

const ChooseAction = ({
  deviceInf,
  disabled,
  action,
  handleAction,
}: {
  deviceInf: DeviceInfoType;
  action: {
    device: DeviceInfoType;
    state: number | null;
  };
  handleAction: React.Dispatch<
    React.SetStateAction<{
      device: DeviceInfoType;
      state: number | null;
    }>
  >;
  disabled: boolean;
}) => {
  return (
    <div>
      <div className="bg-slate-200 p-4 rounded-lg cursor-default border-2 border-slate-300">
        <p>
          <span className="font-semibold">Device Name:</span> {deviceInf.name}
        </p>
        <p>
          <span className="font-semibold">Device Type:</span> {deviceInf.type}
        </p>
      </div>
      <p className="my-4">What you want to do with this device</p>
      <Select
        defaultValue={action.state ? action.state : 0}
        disabled={disabled}
        onChange={e => {
          handleAction(old => ({ ...old, state: Number(e.target.value) }));
        }}
      >
        {deviceInf.type == "light" && (
          <>
            <option value={0}>Turn Off</option>
            <option value={1}>Turn On</option>
          </>
        )}
        {deviceInf.type == "door" && (
          <>
            <option value={0}>Lock</option>
            <option value={1}>Unlock</option>
          </>
        )}
        {deviceInf.type == "fan" && (
          <>
            <option value={0}>Turn Off</option>
            <option value={1}>Speed 1</option>
            <option value={2}>Speed 2</option>
            <option value={3}>Speed 3</option>
            <option value={4}>Speed 4</option>
          </>
        )}
      </Select>
    </div>
  );
};

export default ChooseAction;
