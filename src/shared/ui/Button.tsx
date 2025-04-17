import React, { ReactNode } from "react";

interface IButtonProps {
  addClass?: string;
  isRounded?: boolean;
  size?: "sm" | "md" | "lg" | "full";
  buttonType?: "primary" | "default" | "none";
  children: string | number | ReactNode;
  clickHandler?: () => void;
  isDisabled?: boolean;
}

const buttonSizeObj: { [key: string]: string } = {
  lg: "h-8 px-7 text-base",
  sm: "h-8 px-4 text-base",
  md: "h-8 px-8 text-base",
  full: "w-full h-8 px-5 text-base",
};

const buttonTypeObj: { [key: string]: string } = {
  primary: "bg-[#007aff] text-white border-[#007aff] shadow-button",
  default: "bg-[#F1EFEC]",
  none: "",
};

const buttonHoverObj: { [key: string]: string } = {
  primary:
    "hover:bg-[#0F5AF1FF] hover:border-[#0F5AF1FF] hover:text-shadow-none cursor-pointer",
  default: "hover:bg-[#E4E0E1] cursor-pointer",
  none: "",
};

const Button = ({
  addClass,
  clickHandler,
  size = "full",
  isRounded = true,
  buttonType = "none",
  children,
  isDisabled = false,
}: IButtonProps) => {
  return (
    <button
      className={`transition-button font-sans border-none inline-block no-underline disabled:opacity-30
				${isRounded ? "rounded-base" : ""}
				${buttonTypeObj[buttonType]} 
				${isDisabled ? "" : buttonHoverObj[buttonType]}
				${buttonSizeObj[size]}
				${addClass}`}
      type="button"
      onClick={clickHandler}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
