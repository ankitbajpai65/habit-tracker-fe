import React from "react";

export const Progressbar = (props: { progress: number; total: number }) => {
  const { progress, total } = props;

  const percentage = (progress / total) * 100;
  const completionText = `${progress}/${total}`;

  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg
      className="relative"
      width="60"
      height="60"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="30"
        cy="30"
        r={radius}
        stroke="#e5e7eb"
        strokeWidth="5"
        fill="none"
      />

      <circle
        cx="30"
        cy="30"
        r={radius}
        // stroke="#4caf50"
        stroke="#5A5E32"
        strokeWidth="5"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform="rotate(-90 30 30)"
      />
      <text
        x="50%"
        y="45%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="text-xs font-bold fill-[var(--text-color)]"
      >
        {completionText}
      </text>
      <text
        x="50%"
        y="67%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="text-[10px] font-medium fill-[var(--text-color)]"
      >
        {Math.round(percentage)}%
      </text>
    </svg>
  );
};
