"use client";

import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { Bar } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  Chart,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import autocolors from "chartjs-plugin-autocolors";
import { Select } from "@chakra-ui/react";
import { be_url } from "@/web_config";
import axios from "axios";

Chart.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
  autocolors
);

const data = [
  { year: 2010, count: 10 },
  { year: 2011, count: 20 },
  { year: 2012, count: 15 },
  { year: 2013, count: 25 },
  { year: 2014, count: 22 },
  { year: 2015, count: 30 },
  { year: 2016, count: 28 },
];

const WaterChart = () => {
  console.log("Rerender")
  const [waterData, setWaterData] = useState<{
    time: string[];
    data: number[];
  }>();
  const [user, setUser] = useState<number>(0);
  const [chart, setChart] = useState<React.ReactNode>()

  const getWaterData = async () => {
    try {
      const fetchData = await axios.get(`${be_url}/stat/waterpump/${user}`);
      const rawData = fetchData.data;
      const timeList = [];
      const dataList = [];
      for (let data of rawData) {
        timeList.push(data.datetime);
        dataList.push(data.sum);
      }
      setWaterData({ time: timeList, data: dataList });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getWaterData();
  }, [user]);

  console.log("Get water", waterData)

  return (
    <div>
      <div className="flex gap-2 items-center">
        <h2 className="font-semibold text-xl">Water Consumption Over Time</h2>
        {/* <Select
          placeholder="Time"
          defaultValue={"day"}
          width={"120px"}
          size={"sm"}
          bgColor={"white"}
        >
          <option value="day">By day</option>
          <option value="week">By week</option>
          <option value="month">By month</option>
          <option value="year">By year</option>
        </Select>*/}
        <Select
          placeholder="Person"
          size="sm"
          width={"120px"}
          bgColor={"white"}
          onChange={e => {
            setUser(parseInt(e.target.value));
          }}
        >
          <option value={0}>All</option>
          <option value={1}>Chuong</option>
          <option value={2}>Huy</option>
          <option value={3}>Hoc</option>
          <option value={4}>Khang</option>
          <option value={5}>Khanh</option>
          <option value={6}>Trong</option>
        </Select>
      </div>
      <div className={`relative h-80 mt-auto`}>
        <Bar
          options={{
            maintainAspectRatio: false,
          }}
          data={{
            labels: waterData?.time,
            datasets: [
              {
                label: "Water Chart",
                data: waterData?.data,
                backgroundColor: "#1814F3",
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default WaterChart;
