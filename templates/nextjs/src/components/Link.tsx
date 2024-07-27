import NextLink from "next/link";

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
    <NextLink
      href={href}
      className={`text-fuel-green hover:underline ${className}`}
      target={target}
    >
      {children}
    </NextLink>
  );
};
