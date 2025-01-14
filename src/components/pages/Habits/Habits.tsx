"use client";
import React, { useState } from "react";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { MdEdit } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import HabitModal from "./HabitModal";
import { useRouter } from "next/navigation";

const Habits = () => {
  const router = useRouter();
  const [showHabitMenu, setShowHabitMenu] = useState<boolean>(false);
  const [showHabitModal, setShowHabitModal] = useState<boolean>(false);

  const toggleHabitMenu = () => {
    setShowHabitMenu((prev) => !prev);
  };

  return (
    <section
      className="flex flex-col gap-10 p-12"
      style={{ minHeight: "calc(100vh - 4rem)", height: "auto" }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-habit-200 text-3xl font-bold leading-tight text-center md:text-start">
          All Habits
        </h3>
        <div className="flex gap-6 items-center">
          <Input type="text" placeholder="Search Habits.." />
          <div
            className="relative p-2"
            onMouseEnter={toggleHabitMenu}
            onMouseLeave={toggleHabitMenu}
          >
            <button
              // onClick={onClick}
              className={`flex items-center gap-2 bg-habit-200 text-white px-4 py-2 rounded-sm`}
            >
              <IoMdAdd />
              Add Habit
              <IoIosArrowDown />
            </button>
            {showHabitMenu && (
              <div className="absolute top-14 w-max flex flex-col bg-white py-2 rounded-md shadow-lg">
                <button
                  onClick={() => setShowHabitModal(true)}
                  className="w-max px-3 py-2 hover:bg-habit-200 hover:text-white"
                >
                  Create Good habit
                </button>
                <button
                  onClick={() => setShowHabitModal(true)}
                  className="w-max px-3 py-2 hover:bg-habit-200 hover:text-white"
                >
                  Breake Bad habit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* GOOD HABIT */}
      <div>
        <h4 className="text-green-600 text-2xl font-bold leading-tight text-center md:text-start mb-7">
          Good Habits
        </h4>
        <div className="flex gap-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              onClick={() => router.push("habits/1")}
              className="w-1/6 bg-[var(--auth-bg)] px-3 py-4 rounded-md cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <h6>Drinking Water</h6>
                <button>
                  <MdEdit />
                </button>
              </div>
              <div className="flex items-center justify-between mt-5">
                <div className="h-2 w-1/2 bg-habit-200 rounded-lg"></div>
                <span className="text-sm">3 / 5</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*  BAD HABIT  */}
      <div>
        <h4 className="text-red-600 text-2xl font-bold leading-tight text-center md:text-start mb-7">
          Bad Habits
        </h4>
        <div className="flex gap-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="w-1/6 bg-[var(--auth-bg)] px-3 py-4 rounded-md cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <h6>Smoking</h6>
                <button>
                  <MdEdit />
                </button>
              </div>
              <div className="flex items-center justify-between mt-5">
                <div className="h-2 w-1/2 bg-habit-200 rounded-lg"></div>
                <span className="text-sm">3 / 5</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showHabitModal && (
        <HabitModal isOpen={showHabitModal} setIsOpen={setShowHabitModal} />
      )}
    </section>
  );
};

export default Habits;
