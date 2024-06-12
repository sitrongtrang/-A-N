"use client";

import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = [
  { year: 2010, count: 10 },
  { year: 2011, count: 20 },
  { year: 2012, count: 15 },
  { year: 2013, count: 25 },
  { year: 2014, count: 22 },
  { year: 2015, count: 30 },
  { year: 2016, count: 28 },
];

const PersonWaterChart = () => {
  return (
    <div>
      <div className="flex gap-2 items-center">
        <h2 className="font-semibold text-xl">Amount of Water Consumed by Person</h2>
        <Select>
          <SelectTrigger className="w-28 h-8">
            <SelectValue placeholder="Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">By Day</SelectItem>
            <SelectItem value="week">By Week</SelectItem>
            <SelectItem value="month">By Month</SelectItem>
            <SelectItem value="year">By Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className={`relative h-80`}>
        <Pie
          datasetIdKey="piechart"
          options={{
            maintainAspectRatio: false,
          }}
          data={{
            labels: data.map(row => row.year),
            datasets: [
              {
                label: "Acquisitions by year",
                data: data.map(row => row.count),
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default PersonWaterChart;
