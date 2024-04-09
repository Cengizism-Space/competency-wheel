import React, { FC, ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "link" | "whitey";
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  type = "button",
  ...props
}) => {
  const defaultBlockClasses =
    "flex flex-row items-center justify-center w-full rounded px-8 py-3 text-sm font-medium shadow focus:outline-none focus:ring sm:w-auto";

  const variantClasses = {
    primary: `${defaultBlockClasses} bg-red-500 text-white hover:bg-red-600 active:bg-red-700`,
    secondary: `${defaultBlockClasses} bg-white text-gray-700 hover:bg-gray-200 focus:relative`,
    link: "flex flex-row items-center text-slate-500 hover:text-red-700",
    whitey: "flex flex-row items-center text-white hover:text-slate-900",
  };

  return (
    <button type={type} className={variantClasses[variant]} {...props}>
      {children}
    </button>
  );
};

export default Button;