import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'inline-block px-8 py-3 rounded-sm font-montserrat font-bold uppercase text-sm tracking-wide transition-all duration-300';

  const variantStyles = {
    primary: 'bg-gold text-black hover:bg-gold-dark',
    secondary: 'border-2 border-gold text-gold hover:bg-gold hover:text-black',
    tertiary: 'bg-white text-black hover:bg-gray-100',
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
}
