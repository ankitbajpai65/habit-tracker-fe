import { errorAlert, successAlert } from "@/components/common/Alert";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { ToastContainer } from "react-toastify";
import { HabitType } from "./type";

const unitOptions = {
  "Physical Activities": [
    "minutes",
    "hours",
    "kilometers",
    "steps",
    "reps",
    "calories burned",
  ],
  Consumption: ["glasses", "liters", "cups", "calories", "grams", "milligrams"],
  Learning: ["pages", "minutes", "hours", "chapters", "videos", "courses"],
  Mindfulness: ["minutes", "sessions"],
  Sleep: ["hours", "minutes"],
  Hygiene: ["times", "minutes"],
  Work: ["tasks", "hours", "minutes"],
  Creativity: ["projects", "artworks", "minutes", "hours"],
  Social: ["calls", "meetings", "messages", "hours"],
  Finance: ["dollars saved", "dollars spent", "transactions"],
  Health: ["pills", "appointments", "tests"],
  Entertainment: ["episodes", "movies", "minutes", "hours"],
  Miscellaneous: ["custom unit"],
};

const HabitModal = (props: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeHabit?: HabitType;
  setHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
}) => {
  const { isOpen, setIsOpen, activeHabit, setHabits } = props;
  const { theme } = useTheme();

  const [habit, setHabit] = useState({
    name: "",
    startDate: "",
    category: "",
    unit: "",
    target: +"",
  });

  useEffect(() => {
    if (activeHabit) {
      setHabit({
        name: activeHabit.habitName,
        startDate: activeHabit.startDate,
        category: activeHabit.category,
        unit: activeHabit.target.unit,
        target: activeHabit.target.quantity,
      });
    }
  }, [activeHabit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setHabit((prev) => ({ ...prev, [name]: value }));
  };

  const addHabit = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/habit/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            habitName: habit.name,
            startDate: habit.startDate,
            category: habit.category,
            target: {
              quantity: habit.target,
              unit: habit.unit,
            },
          }),
        }
      );
      const res = await response.json();

      if (res.status === "ok") {
        setHabits((prev) => [
          {
            _id: "",
            habitName: habit.name,
            startDate: habit.startDate,
            category: habit.category,
            target: {
              quantity: habit.target,
              unit: habit.unit,
            },
            userId: "",
            createdAt: "",
            updatedAt: "",
            history: [
              {
                quantity: 0,
                status: "missed",
                date: habit.startDate,
              },
            ],
          },
          ...prev,
        ]);
        setIsOpen(false);
      }
    } catch (error) {
      console.log("Error in creating habit", error);
    }
  };

  const editHabit = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/habit/edit/${activeHabit?._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            habitName: habit.name,
            startDate: habit.startDate,
            category: habit.category,
            target: {
              quantity: habit.target,
              unit: habit.unit,
            },
          }),
          credentials: "include",
        }
      );

      const res = await response.json();

      if (res.status === "ok") {
        setHabits((prev) => {
          return prev.map((habit) => {
            if (habit._id === activeHabit?._id) {
              return {
                _id: activeHabit?._id,
                habitName: habit.name,
                startDate: habit.startDate,
                category: habit.category,
                target: {
                  quantity: habit.target,
                  unit: habit.unit,
                },
                userId: "",
                createdAt: "",
                updatedAt: "",
              };
            }
            return habit;
          });
        });
        setIsOpen(false);
      }
    } catch (error) {
      console.log("Error in editing habit:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !habit.name ||
      !habit.startDate ||
      !habit.category ||
      !habit.target ||
      !habit.unit
    ) {
      errorAlert(1000, "Please fill all fields!", theme!);
      return;
    }

    if (activeHabit) editHabit();
    else addHabit();
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="w-[450px] p-8 flex-col justify-center gap-4 rounded-lg flex items-center bg-white relative z-50 m-3">
        <IoClose
          size={25}
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-4 font-extrabold cursor-pointer text-bold p-1 hover:bg-habit-100 rounded-full"
        />
        <h3 className="text-2xl text-start font-bold text-habit-200 mb-5">
          {activeHabit ? "Edit Habit" : "Add Habit"}
        </h3>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-full text-sm flex flex-col gap-3"
        >
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="" className="ml-1">
              Start Date
            </label>
            <Input
              type="date"
              placeholder="Start Date"
              name="startDate"
              value={habit.startDate}
              onChange={(e) => handleChange(e)}
              style="w-full"
            />
          </div>

          {/* Habit Name */}
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="" className="ml-1">
              Habit
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={habit.name}
              onChange={(e) => handleChange(e)}
              className="border rounded w-full p-2"
              placeholder="e.g., Drink Water"
            />
          </div>

          {/* Category */}
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="" className="ml-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={habit.category}
              onChange={(e) => handleChange(e)}
              className="border rounded w-full p-2"
            >
              <option value="" disabled>
                Select Category
              </option>
              {Object.keys(unitOptions).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            {/* Target */}
            <div className="w-2/3 flex flex-col gap-1">
              <label htmlFor="" className="ml-1">
                Target
              </label>
              <input
                type="number"
                id="target"
                name="target"
                value={habit.target}
                onChange={(e) => handleChange(e)}
                className="border rounded w-full p-2"
                placeholder="e.g., 8 (glasses, minutes, etc.)"
              />
            </div>
            {/* Unit */}
            <div className="w-1/3 flex flex-col gap-1">
              <label htmlFor="" className="ml-1">
                Unit
              </label>
              <select
                id="unit"
                name="unit"
                value={habit.unit}
                onChange={(e) => handleChange(e)}
                disabled={!habit.category}
                className="border rounded w-full p-2 disabled:text-gray-400"
              >
                <option value="" disabled>
                  Select Unit
                </option>
                {unitOptions[habit?.category]?.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-end gap-6 mt-5">
            <Button
              variant="outlined"
              text="Cancel"
              onClick={() => setIsOpen(false)}
            />
            <Button variant="filled" text="Save" type="submit" />
          </div>
        </form>
      </div>

      <ToastContainer />
    </Modal>
  );
};

export default HabitModal;
