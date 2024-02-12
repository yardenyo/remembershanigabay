import React from "react";

type DropDownOption = {
  value: string;
  label: string;
};

type DropDownProps = {
  id: string;
  name: string;
  label: string;
  showLabel?: boolean;
  value: string;
  options: DropDownOption[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  errors: string | undefined;
  touched: boolean | undefined;
};

const DropDown: React.FC<DropDownProps> = ({
  id,
  name,
  label,
  showLabel = true,
  value,
  options,
  onChange,
  errors,
  touched,
}) => {
  return (
    <div className="mb-4">
      {showLabel && (
        <label
          htmlFor={id}
          className="block text-sm font-normal text-blue-gray-700"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="block w-full h-10 mt-1 border-b border-blue-gray-200 bg-transparent font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-black focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors && touched && (
        <div className="text-red-500 text-sm mt-1">{errors}</div>
      )}
    </div>
  );
};

export default DropDown;
