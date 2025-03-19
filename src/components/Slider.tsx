"use client";

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number[];
  onValueChange: (value: number[]) => void;
}

export const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step,
  value,
  onValueChange,
}) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0]}
      onChange={(e) => onValueChange([Number(e.target.value)])}
      className="w-full cursor-pointer accent-emerald-300 "
    />
  );
};
