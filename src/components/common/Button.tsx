import React from "react";
import LocalLoader from "./LocalLoader";

const Button = (props: {
  type?: "button" | "submit";
  variant: "outlined" | "filled";
  text: string;
  style?: string;
  onClick?: (e?: React.FormEvent<HTMLButtonElement>) => void;
  loading?: boolean;
}) => {
  const { type, variant, text, onClick, style, loading } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center justify-center gap-2 ${
        variant === "outlined"
          ? "border border-habit-200 text-habit-200"
          : "bg-habit-200 text-white"
      } text-sm sm:text-base px-3 sm:px-5 py-2 rounded-sm ${style}`}
    >
      {text}
      {loading && <LocalLoader size={5} status={loading} />}
    </button>
  );
};

export default Button;
