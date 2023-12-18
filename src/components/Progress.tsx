import React from "react";

import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  color: "success" | "danger" | "warning";
}

const ProgressBar: React.FC<ProgressProps> = ({ value, color }) => {
  return (
    <div className="relative h-4 w-full bg-content2">
      <div
        className={cn("h-full", {
          "bg-success-400": color === "success",
          "bg-danger-400": color === "danger",
          "bg-warning-400": color === "warning",
        })}
        style={{ width: `${value}%` }}
      ></div>
      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
        <span className="text-foreground">{value}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
