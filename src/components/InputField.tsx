import React, { ChangeEvent, FC } from "react";

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  min?: number;
  max?: number;
  dataTestId?: string;
}

const InputField: FC<InputFieldProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  min,
  max,
  dataTestId,
}) => (
  <label
    htmlFor={id}
    className="text-left block overflow-hidden rounded-md border bg-white border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
  >
    <span className="text-xs font-medium text-gray-700">{label}</span>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      data-testid={dataTestId}
    />
  </label>
);

export default InputField;
