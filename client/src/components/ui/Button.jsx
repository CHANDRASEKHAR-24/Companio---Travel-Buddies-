import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'default', 
  children, 
  disabled, 
  loading = false,
  asChild = false,
  ...props 
}, ref) => {
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium shadow-medium hover:shadow-large',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-medium shadow-medium hover:shadow-large',
    outline: 'border-2 border-neutral-300 hover:border-primary-500 bg-white hover:bg-primary-50 text-neutral-700 hover:text-primary-700 font-medium',
    ghost: 'bg-transparent hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900 font-medium',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs min-h-[32px]',
    default: 'px-4 py-2 text-sm min-h-[40px]',
    lg: 'px-6 py-3 text-base min-h-[48px]',
    xl: 'px-8 py-4 text-lg min-h-[56px]',
  };
  
  const baseClasses = 'inline-flex items-center justify-center rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2';
  
  const buttonClasses = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: cn(buttonClasses, children.props.className),
      ref,
      ...props
    });
  }
  
  return (
    <motion.button
      ref={ref}
      className={buttonClasses}
      disabled={disabled || loading}
      whileHover={disabled || loading ? {} : { scale: 1.02 }}
      whileTap={disabled || loading ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        <span className="flex items-center justify-center gap-2">
          {children}
        </span>
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';

export { Button };
