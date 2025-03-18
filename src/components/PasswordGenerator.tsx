"use client";
import { useState } from "react";
import { Slider } from "./Slider";
import { Switch } from "./Switch";

interface Options {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

const generatePassword = (length: number, options: Options): string => {
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  let characters = "";

  if (options.uppercase) characters += upperCase;
  if (options.lowercase) characters += lowerCase;
  if (options.numbers) characters += numbers;
  if (options.symbols) characters += symbols;

  if (!characters) return "";

  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters[Math.floor(Math.random() * characters.length)];
  }
  return password;
};

export default function PasswordGenerator() {
  const [length, setLength] = useState<number>(8);
  const [options, setOptions] = useState<Options>({
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });
  const [password, setPassword] = useState<string>("");

  const getStrength = () => {
    const activeOptions = Object.values(options).filter(Boolean).length;
    switch (activeOptions) {
      case 1:
        return { label: "Too Weak!", color: "bg-red-500", bars: 1 };
      case 2:
        return { label: "Weak", color: "bg-orange-400", bars: 2 };
      case 3:
        return { label: "Medium", color: "bg-yellow-400", bars: 3 };
      case 4:
        return { label: "Strong", color: "bg-green-400", bars: 4 };
      default:
        return { label: "", color: "bg-gray-700", bars: 0 };
    }
  };

  const handleGenerate = () => {
    setPassword(generatePassword(length, options));
  };

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
    }
  };

  const strength = getStrength();

  return (
    <>
      <div>
        <h1 className="text-amber-50 text-lg font-semibold text-center mb-4">
          Password Generator
        </h1>
        <div className="bg-gray-800 p-4  flex justify-between items-center">
          <span className="text-xl font-mono text-amber-50">
            {password || "Click Generate"}
          </span>
          <button className="cursor-pointer group" onClick={handleCopy}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="24"
              viewBox="0 0 21 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                d="M17.909 0.659016L20.341 3.09098C20.763 3.51294 21 4.08523 21 4.68197V17.25C21 18.4926 19.9926 19.5 18.75 19.5H15V21.75C15 22.9926 13.9926 24 12.75 24H2.25C1.00734 24 0 22.9926 0 21.75V6.75C0 5.50734 1.00734 4.5 2.25 4.5H6V2.25C6 1.00734 7.00734 0 8.25 0H16.3181C16.9147 3.12036e-6 17.4871 0.237058 17.909 0.659016ZM2.53126 21.75H12.4687C12.5434 21.75 12.6149 21.7204 12.6677 21.6677C12.7204 21.6149 12.75 21.5434 12.75 21.4687V19.5H8.25C7.00734 19.5 6 18.4926 6 17.25V6.75H2.53126C2.45665 6.75 2.38512 6.77963 2.33238 6.83238C2.27963 6.88512 2.25 6.95665 2.25 7.03126V21.4687C2.25 21.5434 2.27963 21.6149 2.33238 21.6677C2.38512 21.7204 2.45665 21.75 2.53126 21.75ZM18.4687 17.25H8.53126C8.45665 17.25 8.38512 17.2204 8.33238 17.1677C8.27963 17.1149 8.25 17.0434 8.25 16.9687V2.53126C8.25 2.45665 8.27963 2.38512 8.33238 2.33238C8.38512 2.27963 8.45665 2.25 8.53126 2.25H13.5V6.375C13.5 6.99632 14.0036 7.5 14.625 7.5H18.75V16.9687C18.75 17.0434 18.7204 17.1149 18.6677 17.1677C18.6149 17.2204 18.5434 17.25 18.4687 17.25ZM15.75 5.25H18.75V4.7985L16.4004 2.33236H15.75V5.25Z"
                fill="#A4FFAF"
                className="group-hover:fill-white"
              />
            </svg>
          </button>
        </div>
        <div className="bg-gray-900 text-white p-6  w-96 mx-auto mt-10 shadow-lg">
          <div className="mt-4">
            <label className="flex justify-between text-sm">
              Character Length: <span>{length}</span>
            </label>
            <Slider
              min={4}
              max={20}
              step={1}
              value={[length]}
              onValueChange={(val: number[]) => setLength(val[0])}
            />
          </div>
          <div className="mt-4 space-y-2">
            {Object.keys(options).map((key) => (
              <label key={key} className="flex items-center space-x-2">
                <Switch
                  checked={options[key as keyof Options]}
                  onCheckedChange={(val: boolean) =>
                    setOptions((prev) => ({
                      ...prev,
                      [key]: val,
                    }))
                  }
                />
                <span>
                  Include {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              </label>
            ))}
          </div>
          <div className="  h-[72px] bg-[#18171F] flex  justify-between items-center mt-6 pl-1.5 pr-1.5">
            <span className="text-sm text-[#817D92]">Strength: </span>
            <div className="flex gap-[5px]">
              {strength.label}
              <div className="flex gap-1.5">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-6  ${
                      i < strength.bars ? strength.color : "bg-gray-700"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          <button
            className=" cursor-pointer mt-6 bg-green-300 text-gray-900 font-semibold py-2 px-4 rounded w-full hover:border-1 hover:border-solid hover:border-[#A4FFAF] hover:bg-[#18171F] hover:text-[#A4FFAF]"
            onClick={handleGenerate}
          >
            Generate ➝
          </button>
        </div>
      </div>
    </>
  );
}
