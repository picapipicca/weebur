"use client";

import React from "react";
import { Controller, type Control } from "react-hook-form";

import ChevronDown from "@/shared/assets/icons/chevron-down.svg";

export interface Option {
  name: string;
  value?: string;
}

interface SelectBoxProps {
  name: string;
  control: Control<any>;
  optionSet: Option[];
  addClass?: string;
  isDisabled?: boolean;
}

export default function SelectBox({
  name,
  control,
  optionSet,
  addClass = "",
  isDisabled = false,
}: SelectBoxProps) {
  return (
    <div className="relative w-full">
      <Controller
        name={name}
        control={control}
        defaultValue={optionSet[0]?.value ?? optionSet[0]?.name}
        render={({ field: { onChange, value } }) => (
          <>
            <select
              role="combobox"
              value={value ?? ""}
              disabled={isDisabled}
              onChange={(e) => onChange(e.target.value)}
              className={`peer block w-full appearance-none rounded-md rounded-r-none border border-r-0 bg-white px-3 h-8 pr-10 text-sm text-gray-700 transition focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 border-gray-300
               ${addClass}`}
            >
              {optionSet.map((item, idx) => (
                <option
                  key={`${item.name}-${idx}`}
                  value={item.value ?? item.name}
                >
                  {item.name}
                </option>
              ))}
            </select>

            <ChevronDown
              width={16}
              height={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 peer-disabled:text-gray-300"
            />
          </>
        )}
      />
    </div>
  );
}
