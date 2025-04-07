import clsx from "clsx";
import { HTMLProps } from "react";

type InputProps = HTMLProps<HTMLInputElement> & {
  className?: string;
};

export const Input = ({ className, ...rest }: InputProps) => {

  return (
    <input
      placeholder="Enter text"
      className={clsx("border bg-transparent border-gray-300 transition-colors rounded-md p-2 focus:outline-none focus:border-blue-500", className)}
      {...rest}
    />
  );
}
