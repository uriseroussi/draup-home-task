import React from 'react';

interface props extends React.HTMLProps<HTMLInputElement> {
  children?: React.ReactNode;
  className?: string;
  name: string;
}

const Input: React.FC<props> = ({ name, label, className, ...rest }) => {
  return (
    <input
      className={`${className} w-full border-2 border-highlight rounded-xl bg-transparent py-[1rem] px-[2rem]`}
      id={name}
      {...rest}
    />
  );
};

export default Input;
