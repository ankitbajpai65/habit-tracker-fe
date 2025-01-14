import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

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
}) => {
  const { isOpen, setIsOpen } = props;

  const [habit, setHabit] = useState({
    name: "",
    category: "",
    unit: "",
    target: "",
    // frequency: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHabit((prev) => ({ ...prev, [name]: value }));
  };

  // const handleFrequencyChange = (day) => {
  //   setHabit((prev) => {
  //     const updatedFrequency = prev.frequency.includes(day)
  //       ? prev.frequency.filter((d) => d !== day)
  //       : [...prev.frequency, day];
  //     return { ...prev, frequency: updatedFrequency };
  //   });
  // };

  return (
    <Modal isOpen={isOpen}>
      <div className="w-[450px] p-8 flex-col justify-center gap-4 rounded-lg flex items-center bg-white relative z-50 m-3">
        <IoClose
          size={25}
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-4 font-extrabold cursor-pointer text-bold p-1 hover:bg-habit-100 rounded-full"
        />
        <h3 className="text-2xl text-start font-bold text-habit-200 mb-5">
          Add Habit
        </h3>
        {/* <div className="w-full flex flex-col gap-2">
          <label htmlFor="" className="ml-1">
            Habit
          </label>
          <Input type="text" placeholder="Habit" style="w-full" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="" className="ml-1">
            Start Date
          </label>
          <Input type="date" placeholder="Start Date" style="w-full" />
        </div>
        <div className="w-full flex justify-end gap-6 mt-5">
          <Button
            type="outlined"
            text="Cancel"
            onClick={() => setIsOpen(false)}
          />
          <Button type="filled" text="Save" />
        </div> */}

        <form className="w-full text-sm flex flex-col gap-3">
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="" className="ml-1">
              Start Date
            </label>
            <Input type="date" placeholder="Start Date" style="w-full" />
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
              onChange={handleChange}
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
              onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
            <Button variant="filled" text="Save" />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default HabitModal;
