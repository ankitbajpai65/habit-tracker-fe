export type HabitType = {
  _id: string;
  habitName: string;
  startDate: string;
  category: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
  target: {
    quantity: number;
    unit: string;
  };
  history?: {
    date: string;
    quantity: number;
    status: "completed" | "missed" | "incomplete";
  }[];
  streak?: {
    current: number;
    longest: number;
  };
};

export type PieChartDataType = {
  name: string;
  value: number;
}[];

export type BarChartDataType = {
  name: string;
  date: string;
  quantity: number;
}[];
