import React from "react";
import clsx from "clsx";

export type Props = {
  color?: "primary" | "secondary";
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
        className,
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
