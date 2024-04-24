import React, { FC, ReactNode, ButtonHTMLAttributes } from "react";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "link" | "danger";
}

const commons =
  "items-center gap-1.5 py-3 focus:outline-none disabled:cursor-not-allowed";
export const styles = {
  primary: classNames(
    "w-fit flex rounded-lg bg-indigo-600 px-5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:bg-indigo-500 focus:ring",
    commons
  ),
  secondary: classNames(
    "inline-flex w-fit justify-center rounded-lg border border-gray-200 bg-white px-5 text-sm text-gray-500 transition hover:text-gray-700 disabled:text-gray-500 focus:ring",
    commons
  ),
  link: classNames(
    "inline-flex text-gray-500 underline transition hover:text-gray-700 focus:none",
    commons
  ),
  danger: classNames(
    "inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 text-sm font-medium text-white hover:bg-red-400 focus:none disabled:bg-red-400",
    commons
  ),
};

const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  type = "button",
  ...props
}) => {
  return (
    <button type={type} className={styles[variant]} {...props}>
      {children}
    </button>
  );
};

export default Button;
