import React from "react";

const Input = (props: {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  style?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { type, placeholder, name, value, style, onChange } = props;

  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className={`border border-gray-300 px-3 py-2 rounded-sm ${style}`}
      // autoComplete={false}
    />
  );
};

export default Input;
