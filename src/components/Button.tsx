import React, { FC, ReactNode, ButtonHTMLAttributes } from "react";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "link";
}

const commons = "items-center gap-1.5 py-3 focus:outline-none";
const styles = {
  primary: classNames(
    "w-fit flex rounded-lg bg-indigo-600 px-5 text-sm font-medium text-white transition hover:bg-indigo-700 focus:ring",
    commons
  ),
  secondary: classNames(
    "inline-flex w-fit justify-center rounded-lg border border-gray-200 bg-white px-5 text-sm text-gray-500 transition hover:text-gray-700 focus:ring",
    commons
  ),
  link: classNames(
    "inline-flex text-gray-500 transition hover:text-gray-700 focus:none",
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
