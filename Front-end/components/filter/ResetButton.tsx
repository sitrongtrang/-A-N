import { FilterType } from '@/Type';
import React from 'react'

const ResetButton = ({
  setFilterList,
}: {
  setFilterList: React.Dispatch<React.SetStateAction<FilterType>>;
}) => {
  return (
    <button
      className="flex items-center gap-1 hover:rounded-full hover:bg-slate-200 p-2 text-sm"
      onClick={() => setFilterList({})}
    >
      <img src="/filter/reset.png" alt="reset" className="w-4" />
      Reset
    </button>
  );
};

export default ResetButton