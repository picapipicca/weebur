"use client";

import React from "react";
import { Controller } from "react-hook-form";

export interface IInputProps {
  submitHandler?: (...arg: any) => void;
  submitCondition?: boolean | number | undefined;
  name: string;
  placeholder?: string;
  control: any;
  addClass?: string;
  isReadOnly?: boolean;
}

const Input = ({
  submitHandler,
  name,
  submitCondition,
  placeholder,
  control,
  addClass,
  isReadOnly,
}: IInputProps) => {
  const enterSearch = (e: KeyboardEvent) => {
    const key = e.key || e.keyCode;
    if ((key === "Enter" || key === 13) && submitCondition) {
      submitHandler && submitHandler();
    }
  };

  return (
    <div className="relative w-full">
      <div className={"flex items-stretch w-full relative"}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <>
                <input
                  role="textbox"
                  {...field}
                  autoComplete="off"
                  type={"text"}
                  placeholder={placeholder}
                  onChange={(e) => {
                    field.onChange(e.target.value.trimStart());
                  }}
                  readOnly={isReadOnly}
                  onKeyDown={(e: any) => enterSearch(e)}
                  className={`text-[#444444] leading-normal w-full border border-gray-300 rounded-none text-base h-8 px-3 relative focus:bg-white focus:outline-none placeholder:text-base 
										${isReadOnly ? "cursor-text bg-background-gray focus:bg-background-gray" : ""}
										${addClass}
										`}
                />
              </>
            );
          }}
        />
      </div>
    </div>
  );
};

export default Input;
