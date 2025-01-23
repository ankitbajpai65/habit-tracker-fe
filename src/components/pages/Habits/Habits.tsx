"use client";
import React, { useEffect, useRef, useState } from "react";
import Input from "@/components/common/Input";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import HabitModal from "./HabitModal";
import { useRouter } from "next/navigation";
import LocalLoader from "@/components/common/LocalLoader";
import { HabitType } from "./type";
import { Progressbar } from "@/components/common/Progressbar";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";

const Habits = () => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [habits, setHabits] = useState<HabitType[]>();
  const [activeHabit, setActiveHabit] = useState<HabitType>();
  const [showHabitMenu, setShowHabitMenu] = useState<boolean>(false);
  const [activeMenuHabitId, setActiveMenuHabitId] = useState<string>("");
  const [showHabitModal, setShowHabitModal] = useState<boolean>(false);

  useEffect(() => {
    fetchhabits();
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenuHabitId("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleHabitMenu = () => {
    setShowHabitMenu((prev) => !prev);
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

  async function editHabit(
    e: React.MouseEvent<HTMLButtonElement>,
    habit: HabitType
  ) {
    e.stopPropagation();
    setActiveHabit(habit);
    setShowHabitModal(true);
  }

  async function deleteHabit(
    e: React.MouseEvent<HTMLButtonElement>,
    habitId: string
  ) {
    e.stopPropagation();
    const confirmation = confirm("Do you want to delete this habit?");
    if (!confirmation) return;

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
        setHabits((prev) => prev?.filter((habit) => habit._id !== habitId));
      }
    } catch (error) {
      console.log("Error in deleting habit:", error);
    } finally {
      setActiveMenuHabitId("");
    }
  }

  const handleUpdate = (habitId: string, type: string) => {
    setHabits((prev) =>
      prev?.map((item) =>
        item._id === habitId
          ? {
              ...item,
              history: [
                {
                  ...item.history![0],
                  quantity:
                    type === "increment"
                      ? item.history![0].quantity + 1
                      : item.history![0].quantity - 1,
                },
              ],
            }
          : item
      )
    );
  };

  const handleMarkDone = (
    e: React.MouseEvent<HTMLButtonElement>,
    habitId: string
  ) => {
    e.stopPropagation();
    setHabits((prev) =>
      prev?.map((item) =>
        item._id === habitId
          ? {
              ...item,
              history: [
                {
                  ...item.history[0],
                  quantity:
                    item.history[0].quantity < item.target.quantity
                      ? item.target.quantity
                      : item.history[0].quantity,
                },
              ],
            }
          : item
      )
    );
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
          <Input type="text" placeholder="Search Habits.." name="search" />
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
          {isFetching ? (
            <div className="flex justify-center my-6">
              <LocalLoader
                status={isFetching}
                size={22}
                style="text-habit-200 mx-2"
              />
            </div>
          ) : (
            habits &&
            habits.map((habit, index) => (
              <div
                key={index}
                onClick={() => router.push(`habits/${habit._id}`)}
                className="w-1/6 bg-[var(--auth-bg)] flex flex-col gap-4 px-3 py-4 rounded-md cursor-pointer"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <h6>{habit.habitName}</h6>
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuHabitId(habit._id);
                        }}
                      >
                        <BsThreeDotsVertical
                          size={25}
                          className="hover:bg-white rounded-full p-1"
                        />
                      </button>
                      {activeMenuHabitId && activeMenuHabitId === habit._id && (
                        <div
                          ref={menuRef}
                          className="absolute -right-24 top-0 bg-white text-sm rounded-md shadow-xl z-50"
                        >
                          <button
                            onClick={(e) => editHabit(e, habit)}
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-habit-200 hover:text-white"
                          >
                            <FaRegEdit />
                            Edit
                          </button>
                          <button
                            onClick={(e) => deleteHabit(e, habit._id)}
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-habit-200 hover:text-white"
                          >
                            <MdOutlineDeleteOutline size={16} />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs">{habit.category}</p>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <Progressbar
                    progress={habit.history![0].quantity}
                    total={habit.target.quantity}
                  />
                  <span className="flex gap-2 text-sm">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdate(habit._id, "decrement");
                      }}
                    >
                      <FaMinus
                        size={20}
                        className="bg-white p-1 rounded-full"
                      />
                    </button>
                    {habit.history![0].quantity}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdate(habit._id, "increment");
                      }}
                    >
                      <FaPlus size={20} className="bg-white p-1 rounded-full" />
                    </button>
                  </span>
                </div>
                <button
                  className={`${
                    habit.target.quantity === habit.history![0].quantity &&
                    "text-green font-medium"
                  } text-xs flex items-center gap-1 rounded-md ml-auto `}
                  onClick={(e) => handleMarkDone(e, habit._id)}
                >
                  <FaCircleCheck />
                  {habit.target.quantity === habit.history![0].quantity
                    ? "Marked"
                    : "Mark"}
                  as done
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/*  BAD HABIT  */}
      {/* <div>
        <h4 className="text-red-600 text-2xl font-bold leading-tight text-center md:text-start mb-7">
          Bad Habits
        </h4>
        <div className="flex gap-4">
          {[1, 2].map((_, index) => (
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
      </div> */}

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
