import React from 'react'

const DeviceState = ({type, state}:{type:string, state:number}) => {
  return (
    <p>
      <span className="font-semibold">State:</span>{" "}
      {
        (type == "fan"
          ? state == 0
            ? "Off"
            : state
          : type == "door"
          ? state == 0
            ? "Lock"
            : "Unlock"
          : state == 0
          ? "Off"
          : "On")}
    </p>
  );
}

export default DeviceState