export const Button: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}> = ({ children, className, onClick, ...props }) => {
  return (
    <button
    {...props}
      className={`bg-fuel-green text-white px-4 py-2 rounded-md ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
