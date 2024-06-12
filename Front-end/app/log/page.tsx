"use client";

import { FilterType } from "@/Type";
import DateInput from "@/components/logging/DateInput";
import FilterSection from "@/components/filter/FilterSection";
import React, { useState } from "react";
import ResetButton from "@/components/filter/ResetButton";
import DateLogList from "@/components/logging/DateLogList";
import DateLog from "@/components/logging/DateLog";

const ActivityLog = () => {
  const [appliedFilter, setAppliedFilter] = useState<FilterType>({
    dateFrom: undefined,
    dateTo: undefined,
  });
  console.log(appliedFilter);
  return (
    <>
      <FilterSection
        filterList={appliedFilter}
        setFilterList={setAppliedFilter}
      >
        <div className="flex items-center gap-2">
          <DateInput
            filter={appliedFilter}
            setFilter={setAppliedFilter}
            dateLabel="Date From"
          />
          <DateInput
            filter={appliedFilter}
            setFilter={setAppliedFilter}
            dateLabel="Date To"
          />
          <ResetButton setFilterList={setAppliedFilter} />
        </div>
      </FilterSection>
      <div>
        <DateLogList date={"1/5/2024"}/>
        <DateLogList date={"30/4/2024"}/>
        <DateLogList date={"29/4/2024"}/>
        <DateLogList date={"28/4/2024"}/>
      </div>
    </>
  );
};

export default ActivityLog;
