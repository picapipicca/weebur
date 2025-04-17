"use client";

import { Controller, type Control } from "react-hook-form";
import ChevronDown from "@/shared/assets/icons/chevronDown.svg";

/**
 * Tailwind‑styled select box component that visually matches the dropdown buttons
 * used in the Workshop Planner UI. Works seamlessly with react‑hook‑form.
 */
export interface Option {
  name: string;
  value?: string | number | boolean;
  code?: string | number | boolean;
}

interface SelectBoxProps {
  /** react‑hook‑form field name */
  name: string;
  /** react‑hook‑form control object */
  control: Control<any>;
  /** option array → [{ name:"최신순", value:"latest" }, …]  */
  optionSet: Option[];
  /** placeholder text shown on the first empty option */
  optionTitle?: string;
  /** additional classes appended to the <select> element */
  addClass?: string;
  /** disable state */
  isDisabled?: boolean;
  /** required state */
  isRequired?: boolean;
  /** error object from RHF (field state) */
  errors?: Record<string, any>;
}

export default function SelectBox({
  name,
  control,
  optionSet,
  optionTitle,
  addClass = "",
  isDisabled = false,
  isRequired = false,
  errors,
}: SelectBoxProps) {
  const errorState = Boolean(errors?.[name]);

  return (
    <div className="relative w-full">
      <Controller
        name={name}
        control={control}
        defaultValue={
          optionTitle
            ? ""
            : optionSet[0]?.value ?? optionSet[0]?.code ?? optionSet[0]?.name
        }
        rules={{ required: isRequired }}
        render={({ field: { onChange, value } }) => (
          <>
            <select
              value={value ?? ""}
              disabled={isDisabled}
              aria-invalid={errorState}
              onChange={(e) => {
                const v = e.target.value;
                if (v === "true") onChange(true);
                else if (v === "false") onChange(false);
                else onChange(v);
              }}
              className={`peer block w-full appearance-none rounded-md rounded-r-none border border-r-0 bg-white px-3 h-8 pr-10 text-sm text-gray-700 transition focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                errorState
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              } ${addClass}`}
            >
              {optionTitle && (
                <option value="" disabled hidden>
                  {optionTitle}
                </option>
              )}
              {optionSet.map((item, idx) => (
                <option
                  key={`${item.name}-${idx}`}
                  value={item.value ?? item.code ?? item.name}
                >
                  {item.name}
                </option>
              ))}
            </select>

            {/* Chevron icon */}
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 peer-disabled:text-gray-300"
            />
          </>
        )}
      />

      {errorState && (
        <p className="mt-1 text-xs text-red-500">{errors?.[name]?.message}</p>
      )}
    </div>
  );
}
