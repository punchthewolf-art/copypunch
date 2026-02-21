"use client";

interface LoadingDotsProps {
  color?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-1.5 h-1.5",
  md: "w-2 h-2",
  lg: "w-3 h-3",
};

export default function LoadingDots({
  color = "bg-accent",
  size = "md",
}: LoadingDotsProps) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className={`loading-dot rounded-full ${color} ${sizeMap[size]}`} />
      <span className={`loading-dot rounded-full ${color} ${sizeMap[size]}`} />
      <span className={`loading-dot rounded-full ${color} ${sizeMap[size]}`} />
    </span>
  );
}
