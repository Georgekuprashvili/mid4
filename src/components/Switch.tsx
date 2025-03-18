"use client";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onCheckedChange }) => {
  return (
    <button
      onClick={() => onCheckedChange(!checked)}
      className={`cursor-pointer w-[20px] h-[20px] flex items-center p-1 transition ${
        checked ? "bg-green-300" : "bg-gray-600"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="13"
        viewBox="0 0 15 13"
        fill="none"
        className={checked ? "block" : "hidden"}
      >
        <path
          d="M2 6.60659L5.39341 10L13.3934 2"
          stroke="#18171F"
          strokeWidth="3"
        />
      </svg>
    </button>
  );
};
