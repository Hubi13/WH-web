
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'white';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon, 
  className = '', 
  ...props 
}) => {
  // Enforced sharp corners
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-none font-medium transition-all duration-300 active:scale-95 text-sm tracking-wide";
  
  const variants = {
    primary: "bg-rhome-900 text-white hover:bg-rhome-800 shadow-lg shadow-rhome-900/20",
    secondary: "bg-white/80 backdrop-blur-md border border-white/40 text-rhome-900 hover:bg-white shadow-sm",
    ghost: "bg-transparent text-rhome-900 hover:bg-rhome-100",
    white: "bg-white text-rhome-900 hover:bg-rhome-50 shadow-xl shadow-black/10"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};
