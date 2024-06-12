import { FilterType } from "@/Type";
import { Input } from "@chakra-ui/react";
import React, { useRef } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
} from "@chakra-ui/react";

const DateInput = ({
  filter,
  setFilter,
  dateLabel,
}: {
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  dateLabel: "Date From" | "Date To";
}) => {
  const dateType: keyof FilterType =
    dateLabel == "Date From"
      ? "dateFrom"
      : dateLabel == "Date To"
      ? "dateTo"
      : "dateFrom";
  const popverRef = useRef();
  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button
          size={"sm"}
          bgColor={"#3531F0"}
          textColor={"white"}
          _hover={{ bgColor: "#6B69EE" }}
        >
          {dateLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
        <PopoverBody>
          <DayPicker
            mode="single"
            captionLayout="dropdown-buttons"
            fromYear={new Date().getFullYear() - 10}
            toDate={new Date()}
            selected={filter[dateType]}
            onSelect={e => {
              setFilter(old => ({ ...old, [dateType]: e }));
            }}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default DateInput;
