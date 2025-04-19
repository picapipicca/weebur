import React from "react";
const Spinner = ({
  addClass,
  style,
}: {
  addClass?: string;
  style?: { [key: string]: string };
}) => {
  return (
    <div
      style={style}
      className={`animate-spin h-9 w-9 border border-[#3e82f1] rounded-[50%] border-t-0 border-r-0 ${addClass}`}
    ></div>
  );
};
export default Spinner;
