import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const Input = React.forwardRef(({ 
  className, 
  type = 'text', 
  error = false, 
  icon: Icon,
  ...props 
}, ref) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {Icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
          <Icon size={20} />
        </div>
      )}
      <input
        type={type}
        className={cn(
          'input',
          error && 'input-error',
          Icon && 'pl-10',
          className
        )}
        ref={ref}
        {...props}
      />
    </motion.div>
  );
});

Input.displayName = 'Input';

export { Input };







