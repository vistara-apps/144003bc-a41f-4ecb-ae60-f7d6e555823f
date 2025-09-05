'use client';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface TextInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: 'default' | 'withLabel';
  className?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  required?: boolean;
  disabled?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({
    label,
    placeholder,
    value,
    onChange,
    variant = 'default',
    className,
    type = 'text',
    required = false,
    disabled = false,
  }, ref) => {
    return (
      <div className={cn('w-full', className)}>
        {variant === 'withLabel' && label && (
          <label className="block text-sm font-medium text-purple-200 mb-2">
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
          disabled={disabled}
          className={cn(
            'input-field',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        />
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
