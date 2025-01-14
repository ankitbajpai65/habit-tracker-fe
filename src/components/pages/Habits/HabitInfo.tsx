"use client";
import React from "react";
import { IoIosWater } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import streakImg from "@/assets/streak.svg";
import piechart from "@/assets/piechart.png";
import Image from "next/image";

const HabitInfo = () => {
  return (
    <section
      className="flex flex-col gap-10"
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
            <h1 className="text-white text-2xl font-bold">Drink Water</h1>
            <h6 className="text-white text-lg font-semibold">
              You are on fire, keep going
            </h6>
          </div>
        </span>
        <button>
          <BsThreeDotsVertical size={25} className="text-white" />
        </button>
      </div>

      {/* STATS */}
      <div className="flex gap-10">
        <div className="w-1/5 border flex flex-col items-center gap-3">
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
        <div className="border border-red-300 w-2/5 flex justify-center">
          <Image
            src={piechart}
            width={250}
            height={250}
            alt="Picture of the author"
          />
        </div>
        <div className="border border-red-300 w-3/5 flex flex-col gap-4 px-8">
          <div className="bg-habit-100 flex justify-between rounded-md">
            <span className="text-xl font-semibold py-3 pl-5">
              Completed Days
            </span>
            <span className="bg-habit-200 text-white text-xl font-semibold rounded-tl-full rounded-bl-full rounded-tr-md flex items-center px-6">
              10 / 12
            </span>
          </div>
          <div className="bg-habit-100 flex justify-between rounded-md">
            <span className="text-xl font-semibold py-3 pl-5">Missed Days</span>
            <span className="bg-habit-200 text-white text-xl font-semibold rounded-tl-full rounded-bl-full rounded-tr-md flex items-center px-6">
              10 / 12
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
      <div className="border w-3/5 flex gap-4 m-auto">
        <div className="bg-white w-1/2 h-72"></div>
        <div className="bg-white w-1/2 h-72"></div>
      </div>
    </section>
  );
};

export default HabitInfo;
