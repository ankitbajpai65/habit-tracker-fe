"use client";
import React, { useEffect, useState } from "react";
import Input from "@/components/common/Input";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import HabitModal from "./HabitModal";
import LocalLoader from "@/components/common/LocalLoader";
import { HabitType } from "./type";
import HabitCard from "./HabitCard";

const Habits = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [habits, setHabits] = useState<HabitType[]>();
  const [activeHabit, setActiveHabit] = useState<HabitType>();
  const [addHabitMenu, setAddHabitMenu] = useState<boolean>(false);
  const [showHabitModal, setShowHabitModal] = useState<boolean>(false);

  useEffect(() => {
    fetchhabits();
  }, []);

  const toggleHabitMenu = () => {
    setAddHabitMenu((prev) => !prev);
  };

  async function fetchhabits() {
    setIsFetching(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/habit/getAll`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const res = await response.json();
      if (res.status === "ok") {
        setHabits(res.data);
      }
    } catch (error) {
      console.log("Error in fetching habits", error);
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <section
      className="flex flex-col gap-10 px-6 py-8 lg:p-8 xl:p-12"
      style={{ minHeight: "calc(100vh - 4rem)", height: "auto" }}
    >
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between">
        <h3 className="text-habit-200 text-2xl md:text-3xl font-bold leading-tight text-center md:text-start">
          All Habits
        </h3>
        <div className="flex gap-3 lg:gap-6 items-center justify-center text-sm sm:text-base">
          <Input
            type="text"
            placeholder="Search Habits.."
            name="search"
            style="w-36 sm:w-auto max-w-fit"
          />
          <div
            className="relative p-2 "
            onMouseEnter={toggleHabitMenu}
            onMouseLeave={toggleHabitMenu}
          >
            <button
              // onClick={onClick}
              className={`w-fit flex items-center gap-2 bg-habit-200 text-white text-sm sm:text-base px-2 sm:px-4 py-2 rounded-sm`}
            >
              <IoMdAdd />
              <span className="text-nowrap">Add Habit</span>
              <IoIosArrowDown />
            </button>
            {addHabitMenu && (
              <div className="absolute top-14 w-max flex flex-col bg-[var(--menu-bg)] py-2 rounded-md shadow-lg z-[1000]">
                <button
                  onClick={() => {
                    setShowHabitModal(true);
                    setAddHabitMenu(false);
                  }}
                  className="w-full text-start px-3 py-2 hover:bg-[var(--menuHover-bg)]"
                >
                  Create Good habit
                </button>
                <button
                  onClick={() => {
                    setShowHabitModal(true);
                    setAddHabitMenu(false);
                  }}
                  className="w-full text-start px-3 py-2 hover:bg-[var(--menuHover-bg)]"
                >
                  Break Bad habit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* GOOD HABIT */}
      <div>
        {/* <h4 className="text-green-600 text-2xl font-bold leading-tight text-center md:text-start mb-7">
          Good Habits
        </h4> */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-4">
          {isFetching ? (
            <div className="flex justify-center w-full my-6">
              <LocalLoader
                status={isFetching}
                size={22}
                style="text-habit-200 mx-2"
              />
            </div>
          ) : (
            habits &&
            habits.map((habit, index) => (
              <HabitCard
                key={index}
                habit={habit}
                setHabits={setHabits}
                setActiveHabit={setActiveHabit}
                setShowHabitModal={setShowHabitModal}
              />
            ))
          )}
        </div>
      </div>

      {showHabitModal && (
        <HabitModal
          isOpen={showHabitModal}
          setIsOpen={setShowHabitModal}
          activeHabit={activeHabit}
          setHabits={setHabits}
        />
      )}
    </section>
  );
};

export default Habits;
