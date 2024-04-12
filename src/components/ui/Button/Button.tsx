import React from "react";

export const Button = ({
  children,
  onClick,
  classNames,
}: {
  children: React.ReactNode;
  onClick: () => void;
  classNames?: string;
}) => {
  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};
