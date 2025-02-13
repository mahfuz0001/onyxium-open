import React from "react";

interface ProgressBarProps {
  score: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ score }) => {
  const formattedScore = (score * 100).toFixed(2);
  const circumference = 60 * Math.PI;
  const percent = score * 100;
  const offset = circumference - (percent / 100) * circumference;
  // console.log(offset);

  return (
    <div className="flex h-16 w-64 max-w-xs flex-wrap items-center rounded-2xl bg-white px-4 py-2 shadow-xl">
      <div className="-m-4 flex items-center justify-center overflow-hidden rounded-full bg-white">
        <svg
          className="h-20 w-20 translate-x-1 translate-y-1 transform"
          aria-hidden="true"
        >
          <circle
            className="text-gray-300"
            strokeWidth="6"
            stroke="currentColor"
            fill="transparent"
            r="30"
            cx="35"
            cy="35"
          />
          <circle
            className="text-lime-600"
            strokeWidth="5"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="30"
            cx="35"
            cy="35"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
            }}
          />
        </svg>
        <span className="absolute text-sm text-lime-700">{`${formattedScore}%`}</span>
      </div>
      <p className="ml-4 text-sm font-medium text-gray-600">Accuracy Score</p>
      <span className="ml-auto hidden text-lg font-medium text-lime-600 sm:block">
        {formattedScore}
      </span>
    </div>
  );
};

export default ProgressBar;
