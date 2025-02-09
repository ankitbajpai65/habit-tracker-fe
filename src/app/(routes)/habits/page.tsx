import Habits from "@/components/pages/Habits/Habits";
import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

const page = () => {
  return (
    <ProtectedRoute>
      <Habits />
    </ProtectedRoute>
  );
};

export default page;
