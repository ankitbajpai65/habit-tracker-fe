"use client";
import React, { useEffect, useState } from "react";
import { IoIosWater } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import streakImg from "@/assets/streak.svg";
import piechart from "@/assets/piechart.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BarChartDataType, HabitType, PieChartDataType } from "./type";
import { Pie, PieChart } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const HabitInfo = () => {
  const pathname = usePathname();
  const habitId = pathname.split("/")[pathname.split("/").length - 1];

  const [habitData, setHabitData] = useState<HabitType>();
  const [pieChartData, setPieChartData] = useState<PieChartDataType>();
  const [barChartData, setBarChartData] = useState<BarChartDataType>();
  const [completedDays, setCompletedDays] = useState<number>(0);
  const [missedDays, setMissedDays] = useState<number>(0);
  const [currentDate, setCurrentDate] = useState<string>();

  useEffect(() => {
    fetchHabitInfo();
  }, []);

  useEffect(() => {
    if (habitData) {
      let completed = 0;
      let missed = 0;
      let barData: BarChartDataType = [];

      habitData.history &&
        habitData.history.forEach((entry) => {
          if (entry.status === "completed") {
            completed += 1;
          } else if (entry.status === "missed") {
            missed += 1;
          }
          barData.push({
            name: habitData.habitName,
            date: entry.date,
            quantity: entry.quantity,
          });
        });

      setPieChartData([
        {
          name: "Completed Days",
          value: completed,
        },
        {
          name: "Missed Days",
          value: missed,
        },
      ]);
      setBarChartData(barData);
      setCompletedDays(completed);
      setMissedDays(missed);
    }
  }, [habitData]);

  const handleNavigate = (date: string) => {
    setCurrentDate(date);
  };

  async function fetchHabitInfo() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/habit/${habitId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const res = await response.json();
      if (res.status === "ok") setHabitData(res.data);
    } catch (error) {
      console.log("Error fetching habit data:", error);
    }
  }

  const dayPropGetter = (date: Date) => {
    if (!habitData || !habitData.history) return {};

    const formattedDate = moment(date).format("YYYY-MM-DD");
    const entry = habitData.history.find((e) => e.date === formattedDate);

    if (entry) {
      if (entry.status === "completed") {
        return { style: { backgroundColor: "#d4edda", color: "#155724" } };
      }
      if (entry.status === "missed") {
        return { style: { backgroundColor: "#f8d7da", color: "#721c24" } };
      }
    }
    return { style: { backgroundColor: "#f8f9fa" } }; // Default
  };

  return (
    <section
      className="flex flex-col gap-6"
      style={{ minHeight: "calc(100vh - 4rem)", height: "auto" }}
    >
      {/* HABIT HEADER */}
      <div className="bg-habit-200 flex gap-2 justify-between px-8 py-6">
        <span className="flex items-center gap-3">
          <IoIosWater
            size={45}
            className="text-blue-300 bg-white p-2 rounded-full"
          />
          <div>
            <h1 className="text-white text-2xl font-bold">
              {habitData?.habitName}
            </h1>
            {/* <h6 className="text-white text-lg font-semibold">
              You are on fire, keep going
            </h6> */}
            <h6 className="text-white font-medium">{habitData?.category}</h6>
          </div>
        </span>
        <button>
          <BsThreeDotsVertical size={25} className="text-white" />
        </button>
      </div>

      {/* STATS */}
      <div className="flex gap-6 px-10">
        <div className="bg-white w-1/5 flex flex-col items-center justify-center gap-3">
          <span className="bg-gray-200 size-20 flex items-center justify-center p-3 rounded-full">
            <Image
              src={streakImg}
              width={40}
              height={40}
              alt="Picture of the author"
            />
          </span>
          <p className="text-lg font-semibold">
            <span className="text-3xl font-bold mr-1">5</span>days streak
          </p>
        </div>
        <div className="bg-white w-2/5 flex items-center justify-center">
          <PieChart width={300} height={280}>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#5A5E32"
            />
            <Tooltip
              formatter={(value, name) => [`${value} days`, name]}
              contentStyle={{
                backgroundColor: "#ffffff",
                borderRadius: "4px",
                padding: "4px 8px",
                fontSize: 12,
              }}
              labelStyle={{ fontWeight: "bold", color: "#333333" }}
            />
          </PieChart>
        </div>
        <div className="bg-white w-3/5 flex flex-col justify-center gap-4 px-8">
          <div className="bg-habit-100 flex justify-between rounded-md">
            <span className="text-xl font-semibold py-3 pl-5">
              Completed Days
            </span>
            <span className="bg-habit-200 text-white text-xl font-semibold rounded-tl-full rounded-bl-full rounded-tr-md flex items-center px-6">
              {completedDays} / {habitData?.history!.length}
            </span>
          </div>
          <div className="bg-habit-100 flex justify-between rounded-md">
            <span className="text-xl font-semibold py-3 pl-5">Missed Days</span>
            <span className="bg-habit-200 text-white text-xl font-semibold rounded-tl-full rounded-bl-full rounded-tr-md flex items-center px-6">
              {missedDays} / {habitData?.history!.length}
            </span>
          </div>
          <div className="bg-habit-100 flex justify-between rounded-md">
            <span className="text-xl font-semibold py-3 pl-5">
              Longest Streak
            </span>
            <span className="bg-habit-200 text-white text-xl font-semibold rounded-tl-full rounded-bl-full rounded-tr-md flex items-center gap-2 px-6">
              6
              <Image
                src={streakImg}
                width={20}
                height={20}
                alt="Picture of the author"
              />
            </span>
          </div>
        </div>
      </div>

      {/* GRAPHS */}
      <div className="w-full flex justify-center gap-6 px-10 m-auto">
        <div className="bg-white w-2/5 h-96 flex justify-center items-center text-xs p-6">
          <Calendar
            localizer={localizer}
            events={[]}
            date={currentDate}
            onNavigate={handleNavigate}
            style={{ height: 300, width: 400 }}
            components={{
              toolbar: CustomToolbar,
            }}
            dayPropGetter={dayPropGetter}
            views={["month"]}
          />
        </div>
        <div className="bg-white w-2/5 h-96 text-xs py-8">
          {barChartData && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={barChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis dataKey="quantity" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="quantity"
                  fill="#5A5E32"
                  // activeBar={<Rectangle fill="pink" stroke="blue" />}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </section>
  );
};

const CustomToolbar = ({ label, onNavigate }: any) => {
  return (
    <div className="flex justify-between items-center p-2 bg-gray-100">
      <button
        onClick={() => onNavigate("PREV")}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        Prev
      </button>
      <span className="font-semibold">{label}</span>
      <button
        onClick={() => onNavigate("NEXT")}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default HabitInfo;
