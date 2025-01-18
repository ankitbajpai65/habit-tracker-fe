export type HabitType = {
  _id: string;
  habitName: string;
  startDate: string;
  category: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  target: {
    quantity: number;
    unit: string;
  };
  history?: [
    {
      date: Date;
      quantity: number;
      status: "completed" | "missed" | "incomplete";
    }
  ];
};
