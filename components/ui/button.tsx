import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  variant?: "solid" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  children: ReactNode;
  href?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export function Button({
  variant = "solid",
  size = "default",
  children,
  href,
  onClick,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center whitespace-nowrap transition-all duration-300 rounded-xl font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 disabled:pointer-events-none disabled:opacity-50";

  const variantClasses = {
    solid:
      "bg-pink-500 border border-pink-500 text-white hover:bg-pink-600 hover:border-pink-600 active:bg-pink-700 active:border-pink-700 hover:scale-105 shadow-sm hover:shadow-md",
    outline:
      "bg-white text-pink-600 border border-pink-300 hover:bg-pink-50 active:bg-pink-100 hover:border-pink-400 hover:text-pink-700 shadow-sm",
    ghost:
      "hover:bg-gray-100 hover:text-gray-900 text-gray-600",
    destructive:
      "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:border-red-300 hover:text-red-700 shadow-sm",
  };

  const sizeClasses = {
    default: "h-10 md:h-12 px-6 md:px-6 text-sm md:text-base",
    sm: "h-8 md:h-9 px-3 md:px-3 text-sm md:text-sm",
    lg: "h-12 md:h-14 px-8 md:px-8 text-base md:text-lg",
    icon: "h-10 md:h-10 w-10 md:w-10",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

