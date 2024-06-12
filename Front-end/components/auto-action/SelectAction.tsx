import { Button, useDisclosure, useSteps } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  CloseButton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { DeviceInfoType, FilterType } from "@/Type";
import DeviceStepper from "./DeviceStepper";
import DeviceChooseStep from "./DeviceChooseStep";
import ChooseAction from "./ChooseActionStep";

const steps = [
  { title: "First", description: "Choose Device" },
  { title: "Second", description: "Choose Action" },
  { title: "Third", description: "Final Review" },
];

const SelectAction = ({
  updateActionList,
  actionListIdx,
  deviceObj,
}: {
  updateActionList: React.Dispatch<
    React.SetStateAction<
      {
        device: DeviceInfoType;
        state: number | null;
      }[]
    >
  >;
  actionListIdx: number;
  deviceObj: {
    device: DeviceInfoType;
    state: number | null;
  };
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const [action, setAction] = useState<{
    device: DeviceInfoType;
    state: number | null;
  }>(deviceObj);

  function actionName(action: {
    device: DeviceInfoType;
    state: number | null;
  }) {
    if (action.device.type == "light") {
      if (!action.state || action.state == 0) return "Turn off";
      else return "Turn on";
    } else if (action.device.type == "fan") {
      if (!action.state || action.state == 0) return "Turn off";
      else return `Set speed to ${action.state}`;
    } else if (action.device.type == "door") {
      if (!action.state || action.state == 0) return "Lock";
      else return "Unlock";
    }
  }

  return (
    <>
      {action.device.name !== "" ? (
        <div className="flex items-center font-semibold w-full justify-between bg-slate-200 p-1 pl-4 rounded-md hover:bg-slate-100">
          {actionName(action)} for {action.device.name}
          <CloseButton
            onClick={() => {
              updateActionList(oldList => {
                return oldList.filter(
                  ele =>
                    ele.device.name !== deviceObj.device.name ||
                    ele.device.type !== deviceObj.device.type ||
                    ele.state !== deviceObj.state
                );
              });
            }}
          />
        </div>
      ) : (
        <div
          className="font-semibold flex items-center justify-between bg-slate-300 p-1 pl-4 cursor-pointer rounded-md hover:bg-slate-200"
          onClick={onOpen}
        >
          Choose Device
          <CloseButton
            onClick={() => {
              updateActionList(oldList => {
                return oldList.filter(
                  ele =>
                    ele.device.name !== deviceObj.device.name ||
                    ele.device.type !== deviceObj.device.type ||
                    ele.state !== deviceObj.state
                );
              });
            }}
          />
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="6xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              setAction({
                device: { name: "", type: ""},
                state: null,
              });
              setActiveStep(0);
              onClose();
            }}
          />

          <ModalBody>
            <DeviceStepper activeStep={activeStep} steps={steps} />
            {activeStep == 0 ? (
              <DeviceChooseStep
                handleAction={setAction}
                moveNext={() => {
                  setActiveStep(activeStep + 1);
                }}
              />
            ) : activeStep === 1 && action.device.name !== "" ? (
              <ChooseAction
                deviceInf={action.device}
                disabled={false}
                action={action}
                handleAction={setAction}
              />
            ) : (
              <ChooseAction
                deviceInf={action.device}
                disabled={true}
                action={action}
                handleAction={setAction}
              />
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setActiveStep(activeStep > 0 ? activeStep - 1 : activeStep);
              }}
            >
              Previous
            </Button>
            {activeStep == 2 ? (
              <Button
                colorScheme="green"
                mr={3}
                onClick={() => {
                  console.log("Current action state ", action);
                  updateActionList(old => {
                    old[actionListIdx] = {
                      device: action.device,
                      state: action.state,
                    };
                    return [...old];
                  });
                  onClose();
                }}
              >
                Accept
              </Button>
            ) : (
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  setActiveStep(
                    activeStep < 3 && action.device.name !== ""
                      ? activeStep + 1
                      : activeStep
                  );
                }}
              >
                Next
              </Button>
            )}

            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                setActiveStep(0);
                setAction({
                  device: { name: "", type: "", location: "" },
                  state: null,
                });
                onClose();
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectAction;
