import { Link as ReactRouterLink } from "@tanstack/react-router";

export const Link = ({
  href,
  children,
  className,
  target,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
}) => {
  return (
    <ReactRouterLink
      to={href}
      className={`text-fuel-green hover:underline ${className}`}
      target={target}
    >
      {children}
    </ReactRouterLink>
  );
};
