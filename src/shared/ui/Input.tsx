import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export interface IInputProps {
  max?: number;
  min?: number;
  submitHandler?: (...arg: any) => void;
  submitCondition?: boolean | number | undefined;
  name: string;
  leftInnerLabel?: string;
  rightInnerLabel?: string;
  placeholder?: string;
  control: any;
  errors?: any;
  register?: any;
  useErrorMessage?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  addClass?: string;
  isReadOnly?: boolean;
}

const Input = ({
  submitHandler,
  name,
  submitCondition,
  leftInnerLabel,
  rightInnerLabel,
  placeholder,
  isDisabled = false,
  useErrorMessage = true,
  control,
  errors,
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
        {leftInnerLabel && (
          <div className="flex-col -mr-px">
            <span
              className={`pt-px flex items-center text-[#5e5e5e] leading-normal bg-grey-lighter rounded-none border border-r-0 border-gray-300 h-8 px-3 whitespace-nowrap text-base ${
                errors.message ? "border-danger" : ""
              }
							${addClass}`}
            >
              {leftInnerLabel}
            </span>
          </div>
        )}
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <>
                <input
                  {...field}
                  autoComplete="off"
                  type={"text"}
                  disabled={isDisabled}
                  placeholder={placeholder}
                  onChange={(e) => {
                    if (isDisabled) {
                      e.preventDefault();
                    } else {
                      field.onChange(e.target.value.trimStart());
                    }
                  }}
                  readOnly={isReadOnly}
                  onKeyDown={(e: any) => enterSearch(e)}
                  className={`text-[#444444] leading-normal w-full border border-gray-300 rounded-none text-base h-8 px-3 relative focus:bg-white focus:outline-none placeholder:text-base 
										${isDisabled ? "pointer-events-none opacity-60" : ""}
										${isReadOnly ? "cursor-text bg-background-gray focus:bg-background-gray" : ""}
										${leftInnerLabel ? "rounded-none" : ""}
										${rightInnerLabel ? "rounded-none" : ""}
										${errors?.message ? "border-danger focus:border-danger" : ""}
										${addClass}
										`}
                />
              </>
            );
          }}
        />
        {rightInnerLabel && (
          <div className="flex-col -mr-px">
            <span
              className={`pt-px text-[#5e5e5e] flex items-center leading-normal bg-grey-lighter rounded-none border border-l-0 border-grey-light h-8 px-3 whitespace-nowrap text-base  ${
                errorMsg ? "border-danger" : ""
              } ${addClass}`}
            >
              {rightInnerLabel}
            </span>
          </div>
        )}
      </div>
      {useErrorMessage && errors && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => {
            return (
              <div className="text-right absolute right-0">
                <p className="text-red-500 text-base leading-3.5 mb-0 my-1">
                  {message}
                </p>
              </div>
            );
          }}
        />
      )}
    </div>
  );
};

export default Input;
