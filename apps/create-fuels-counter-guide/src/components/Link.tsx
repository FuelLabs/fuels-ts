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
    <a
      href={href}
      className={`text-fuel-green hover:underline ${className}`}
      target={target}
    >
      {children}
    </a>
  );
};
