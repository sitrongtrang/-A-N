import React from 'react'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import {v4 as uuid} from "uuid"
import { Select } from "@chakra-ui/react";
import { FilterType } from '@/Type';
const MySelectMultiple = ({
  optList,
  objField,
  filterList,
  setFilterList,
  placeholder,
}: {
  optList: string[];
  objField: keyof FilterType;
  filterList: FilterType;
  setFilterList: React.Dispatch<React.SetStateAction<FilterType>>;
  placeholder: string
}) => {
  return (
    <Select
      onChange={e => {
        const selectOpt = e.target.value;
        let updateList = filterList[objField];
        if (!Array.isArray(updateList)) updateList = [selectOpt];
        else if (Array.isArray(updateList)) {
          updateList.indexOf(selectOpt) == -1 && updateList.push(selectOpt);
        }
        setFilterList(old => ({ ...old, [objField]: updateList }));
      }}
      defaultValue={"None"}
      placeholder={placeholder}
      size="sm"
      bgColor="#1814F3"
      borderRadius={6}
      width={40}
      textColor="white"
      iconColor='white'
    >
      {optList.map(item => (
        <option key={uuid()} value={item} className='text-black'>
          {item}
        </option>
      ))}
    </Select>
  );
};

export default MySelectMultiple;
