import React from "react";
import clsx from "clsx";

export type Props = {
  color?: "primary" | "secondary" | "inactive";
} & React.ComponentProps<"button">;

export default function Button(props: Props) {
  const { color = "primary", children, disabled, className, ...rest } = props;

  return (
    <button
      type="button"
      className={clsx(
        "btn",
        color === "primary" && "btn-primary",
        color === "secondary" && "btn-secondary",
        color === "inactive" && "btn-inactive",
        className,
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
