"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoIosWater } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import streakImg from "@/assets/streak.svg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { BarChartDataType, HabitType, PieChartDataType } from "./type";
import { Cell, Pie, PieChart } from "recharts";
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
// @ts-ignore
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import HabitModal from "./HabitModal";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useTheme } from "next-themes";

const localizer = momentLocalizer(moment);

const HabitInfo = () => {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const { theme } = useTheme();
  const habitId = pathname.split("/")[pathname.split("/").length - 1];

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [habitData, setHabitData] = useState<HabitType>();
  const [pieChartData, setPieChartData] = useState<PieChartDataType>();
  const [barChartData, setBarChartData] = useState<BarChartDataType>();
  const [completedDays, setCompletedDays] = useState<number>(0);
  const [incompleteDays, setIncompleteDays] = useState<number>(0);
  const [currentDate, setCurrentDate] = useState<string>();

  const COLORS = ["#5A5E32", `${theme !== "dark" ? "#f2f2f2" : "#121212"}`];

  useEffect(() => {
    fetchHabitInfo();
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (habitData) {
      let completed = 0;
      let incomplete = 0;
      let barData: BarChartDataType = [];

      habitData.history &&
        habitData.history.forEach((entry) => {
          if (entry.status === "completed") {
            completed += 1;
          } else if (entry.status === "incomplete") {
            incomplete += 1;
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
          name: "Incomplete Days",
          value: incomplete,
        },
      ]);
      setBarChartData(barData);
      setCompletedDays(completed);
      setIncompleteDays(incomplete);
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

  async function deleteHabit(habitId?: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/habit/delete/${habitId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const res = await response.json();

      if (res.status === "ok") {
        router.push("/habits");
      }
    } catch (error) {
      console.log("Error in deleting habit:", error);
    } finally {
      setIsMenuOpen(false);
    }
  }

  const dayPropGetter = (date: Date) => {
    if (!habitData || !habitData.history) return {};

    const formattedDate = moment(date).format("YYYY-MM-DD");
    const entry = habitData.history.find((e) => e.date === formattedDate);

    if (entry) {
      if (entry.status === "completed") {
        return {
          style: { backgroundColor: theme === "dark" ? "#032e15" : "#d4edda" },
        };
      } else if (entry.status === "incomplete") {
        return {
          style: { backgroundColor: theme === "dark" ? "#540015" : "#f8d7da" },
        };
      }
    }
    return {
      style: { backgroundColor: theme === "dark" ? "#00000057" : "#fff" },
    };
  };

  return (
    <section
      className="flex flex-col gap-6"
      style={{ minHeight: "calc(100vh - 4rem)", height: "auto" }}
    >
      {/* HABIT HEADER */}
      <div className="bg-[var(--habitBanner-bg)] flex gap-2 justify-between px-3 md:px-8 py-6 mb-8">
        <span className="flex items-center gap-3">
          <IoIosWater
            size={45}
            className="text-blue-300 bg-white dark:bg-black p-2 rounded-full"
          />
          <div>
            <h1 className="text-xl md:text-2xl font-bold">
              {habitData?.habitName}
            </h1>
            <h6 className="font-medium">{habitData?.category}</h6>
          </div>
        </span>
        <div className="relative">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <BsThreeDotsVertical size={25} />
          </button>
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute -left-24 top-0 bg-[var(--menu-bg)] text-sm rounded-md shadow-xl z-50"
            >
              <button
                onClick={(e) => setIsModalOpen(true)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-tl-md rounded-tr-md hover:bg-[var(--menuHover-bg)]"
              >
                <FaRegEdit />
                Edit
              </button>
              <button
                onClick={() => setIsConfirmModalOpen(true)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-bl-md rounded-br-md hover:bg-[var(--menuHover-bg)]"
              >
                <MdOutlineDeleteOutline size={16} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* STATS */}
      <div className="flex flex-col md:flex-row gap-3 lg:gap-6 px-3 md:px-6 lg:px-10">
        <div className="bg-[var(--auth-bg)] w-full md:w-1/5 flex flex-col items-center justify-center gap-3 rounded-xl py-5">
          <span className="bg-gray-200 size-20 flex items-center justify-center p-3 rounded-full">
            <Image
              src={streakImg}
              width={40}
              height={40}
              alt="Picture of the author"
            />
          </span>
          <p className="text-lg text-center font-semibold">
            <span className="text-3xl font-bold mr-1">
              {habitData?.streak?.current}
            </span>
            days streak
          </p>
        </div>
        <div className="bg-[var(--auth-bg)] w-full md:w-2/5 flex items-center justify-center rounded-xl">
          <PieChart width={300} height={280}>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              stroke="none"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={50}
              fill="#5A5E32"
            >
              {pieChartData?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
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
        <div className="bg-[var(--auth-bg)] w-full md:w-3/5 flex flex-col justify-center text-base md:text-lg lg:text-xl gap-4 rounded-xl p-5 lg:px-8">
          <div className="bg-[var(--subcard-bg)] flex justify-between rounded-md">
            <span className="text-lg lg:text-xl font-semibold py-3 pl-5">
              Completed Days
            </span>
            <span className="bg-habit-200 text-white font-semibold rounded-tl-full rounded-bl-full rounded-tr-md flex items-center px-4 sm:px-6">
              {completedDays} / {habitData?.history!.length}
            </span>
          </div>
          <div className="bg-[var(--subcard-bg)] flex justify-between rounded-md">
            <span className="font-semibold py-3 pl-5">Incomplete Days</span>
            <span className="bg-habit-200 text-white font-semibold rounded-tl-full rounded-bl-full rounded-tr-md flex items-center px-4 sm:px-6">
              {incompleteDays} / {habitData?.history!.length}
            </span>
          </div>
          <div className="bg-[var(--subcard-bg)] flex justify-between rounded-md">
            <span className="font-semibold py-3 pl-5">Longest Streak</span>
            <span className="bg-habit-200 text-white font-semibold rounded-tl-full rounded-bl-full rounded-tr-md flex items-center gap-2 px-4 sm:px-6">
              {habitData?.streak?.longest}
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
      <div className="w-full flex flex-col md:flex-row justify-center gap-3 lg:gap-6 px-3 md:px-6 lg:px-10 m-auto mb-20">
        <div className="bg-[var(--auth-bg)] w-full md:w-2/5 h-96 flex justify-center items-center text-xs rounded-xl p-3 lg:p-6">
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
        <div className="bg-[var(--auth-bg)] w-full md:w-3/5 xl:w-2/5 h-96 text-xs rounded-xl py-8">
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
                <Tooltip
                  cursor={{ fill: "none" }}
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#000000" : "#fff",
                    borderColor: theme === "dark" ? "#4b5563" : "#e5e7eb",
                    borderRadius: "4px",
                  }}
                />
                <Legend />
                <Bar dataKey="quantity" fill="#5A5E32" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {isModalOpen && (
        <HabitModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          activeHabit={habitData}
          setHabitData={setHabitData}
        />
      )}

      {isConfirmModalOpen && (
        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          setIsOpen={setIsConfirmModalOpen}
          title="Delete Habit"
          text="Are you sure you want to delete this habit"
          confirmText="Delete"
          onConfirm={() => deleteHabit(habitData?._id)}
        />
      )}
    </section>
  );
};

const CustomToolbar = ({ label, onNavigate }: any) => {
  return (
    <div className="flex justify-between items-center p-2 bg-[var(--footer-bg)]">
      <button
        onClick={() => onNavigate("PREV")}
        className="px-2 py-1 bg-[var(--auth-bg)] rounded hover:bg-[var(--footer-bg)]"
      >
        <MdKeyboardArrowLeft size={20} />
      </button>
      <span className="font-semibold">{label}</span>
      <button
        onClick={() => onNavigate("NEXT")}
        className="px-2 py-1 bg-[var(--auth-bg)] rounded hover:bg-[var(--footer-bg)]"
      >
        <MdKeyboardArrowRight size={20} />
      </button>
    </div>
  );
};

export default HabitInfo;
