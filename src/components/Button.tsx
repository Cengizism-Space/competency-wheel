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
  const variantClasses = {
    primary: `block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring`,
    secondary: `inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-500 transition hover:text-gray-700 focus:outline-none focus:ring`,
    link: "inline-flex items-center justify-center gap-1.5 px-5 py-3 text-gray-500 transition hover:text-gray-700 focus:outline-none focus:none",
    whitey: "flex flex-row items-center text-white hover:text-slate-900",
  };

  return (
    <button type={type} className={variantClasses[variant]} {...props}>
      {children}
    </button>
  );
};

export default Button;
