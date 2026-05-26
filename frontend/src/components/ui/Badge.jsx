import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export const Badge = ({ children, variant = 'default', className }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    orange: 'bg-orange-100 text-orange-800',
  };

  const selectedVariant = variants[variant] || variants.default;

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
          selectedVariant,
          className
        )
      )}
    >
      {children}
    </span>
  );
};
