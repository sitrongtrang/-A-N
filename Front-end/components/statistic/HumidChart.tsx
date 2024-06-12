"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import autocolors from "chartjs-plugin-autocolors";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { be_url } from "@/web_config";



const data = [
  { year: 2010, count: 10 },
  { year: 2011, count: 20 },
  { year: 2012, count: 15 },
  { year: 2013, count: 25 },
  { year: 2014, count: 22 },
  { year: 2015, count: 30 },
  { year: 2016, count: 28 },
];

const HumidChart = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const [humidData, setHumidData] = useState<{time: string[], humidity: number[]}>()
  const getHumidData = async() => {
    try {
      const fetchData = await axios.get(`${be_url}/stat/humid`)
      // console.log(fetchData.data)
      const rawData = fetchData.data
      const timeList = []
      const dataList = []
      for (let data of rawData) {
        timeList.push(data.time)
        dataList.push(data.humidity)
      }
      setHumidData({time: timeList, humidity: dataList})
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getHumidData()
  }, [])

  // console.log(humidData)

  return (
    <div>
      <div className="flex gap-2 items-center">
        <h2 className="font-semibold text-xl">Humid Chart Over Time</h2>
        {/* <Select>
          <SelectTrigger className="w-28 h-8">
            <SelectValue placeholder="Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">By Day</SelectItem>
            <SelectItem value="week">By Week</SelectItem>
            <SelectItem value="month">By Month</SelectItem>
            <SelectItem value="year">By Year</SelectItem>
          </SelectContent>
        </Select> */}
      </div>
      <div className={`relative h-80`}>
        <Line
          datasetIdKey="humidchart"
          updateMode="show"
          options={{
            maintainAspectRatio: false,
          }}
          data={{
            labels: humidData?.time,
            datasets: [
              {
                label: "Humidity over time",
                data: humidData?.humidity,
                backgroundColor: "#718EBF",
                borderColor: "#1814F3",
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default HumidChart;
