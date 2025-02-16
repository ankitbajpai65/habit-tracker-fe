import React, { useEffect, useRef, useState } from "react";
import { HabitType } from "./type";
import { useRouter } from "next/navigation";
import { Progressbar } from "@/components/common/Progressbar";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";

const HabitCard = (props: {
  habit: HabitType;
  setHabits: React.Dispatch<React.SetStateAction<HabitType[] | undefined>>;
  setActiveHabit: React.Dispatch<React.SetStateAction<HabitType | undefined>>;
  setShowHabitModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { habit, setHabits, setActiveHabit, setShowHabitModal } = props;
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const [activeMenuHabitId, setActiveMenuHabitId] = useState<string>("");

  useEffect(() => {
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

  async function editHabit(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setActiveHabit(habit);
    setShowHabitModal(true);
  }

  async function deleteHabit(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (!confirm("Do you want to delete this habit?")) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/habit/delete/${habit._id}`,
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
        setHabits((prev) => prev?.filter((item) => item._id !== habit._id));
      }
    } catch (error) {
      console.log("Error in deleting habit:", error);
    } finally {
      setActiveMenuHabitId("");
    }
  }

  async function updateHabit(
    updatedQuantity: number,
    e?: React.MouseEvent<HTMLButtonElement>
  ) {
    e?.stopPropagation();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/habit/update/${habit._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updatedQuantity }),
          credentials: "include",
        }
      );
      const res = await response.json();
      // console.log(res);

      if (response.ok) {
        setHabits((prev) =>
          prev?.map((item) =>
            item._id === habit._id
              ? {
                  ...item,
                  history: item.history
                    ? item.history.map((entry, index, historyArray) =>
                        index === historyArray.length - 1
                          ? { ...entry, quantity: updatedQuantity }
                          : entry
                      )
                    : [],
                }
              : item
          )
        );
      } else {
        console.error("Failed to update habit:", res.error);
      }
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  }

  const updateQuantity = async (type: string) => {
    const today = new Date().toLocaleDateString("en-CA");
    const todayEntryIndex = habit.history!.findIndex(
      (entry) => entry.date === today
    );

    let updatedHistory = [...habit.history!];
    if (todayEntryIndex !== -1) {
      updatedHistory[todayEntryIndex].quantity =
        type === "increment"
          ? (updatedHistory[todayEntryIndex].quantity || 0) + 1
          : updatedHistory[todayEntryIndex].quantity - 1;
    } else {
      updatedHistory.push({ date: today, quantity: 1, status: "incomplete" });
    }

    setHabits((prev) =>
      prev?.map((item) =>
        item._id === habit._id ? { ...item, history: updatedHistory } : item
      )
    );

    updateHabit(updatedHistory[todayEntryIndex]?.quantity || 1);
  };

  const latestQuantity =
    habit.history?.[habit.history.length - 1]?.quantity ?? 0;
  const targetQuantity = habit.target.quantity;

  return (
    <div
      key={habit._id}
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
                  // onClick={(e) => editHabit(e, habit)}
                  onClick={editHabit}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-habit-200 hover:text-white"
                >
                  <FaRegEdit />
                  Edit
                </button>
                <button
                  // onClick={(e) => deleteHabit(e, habit._id)}
                  onClick={deleteHabit}
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
        {habit && habit.history && (
          <Progressbar progress={latestQuantity} total={targetQuantity} />
        )}
        <span className="flex gap-2 text-sm">
          <button
            onClick={(e) => {
              e.stopPropagation();
              updateQuantity("decrement");
            }}
            disabled={latestQuantity === 0}
          >
            <FaMinus
              size={20}
              className={`p-1 rounded-full ${
                latestQuantity === 0 ? "bg-zinc-300" : "bg-white"
              }`}
            />
          </button>
          {latestQuantity}
          <button
            onClick={(e) => {
              e.stopPropagation();
              updateQuantity("increment");
            }}
            disabled={latestQuantity === targetQuantity}
          >
            <FaPlus
              size={20}
              className={`p-1 rounded-full ${
                latestQuantity === targetQuantity ? "bg-zinc-300" : "bg-white"
              }`}
            />
          </button>
        </span>
      </div>
      <button
        className={`${
          targetQuantity === latestQuantity && "text-green font-medium"
        } text-xs flex items-center gap-1 rounded-md ml-auto `}
        onClick={(e) =>
          updateHabit(latestQuantity === targetQuantity ? 0 : targetQuantity, e)
        }
      >
        <FaCircleCheck />
        {latestQuantity === targetQuantity ? "Marked" : "Mark"} as done
      </button>
    </div>
  );
};

export default HabitCard;
