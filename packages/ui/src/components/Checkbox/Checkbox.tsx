import React, { useEffect, useRef } from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  indeterminate?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ indeterminate = false, label, description, className = '', disabled, ...props }, forwardedRef) => {
    const defaultRef = useRef<HTMLInputElement>(null);
    const ref = (forwardedRef as React.MutableRefObject<HTMLInputElement>) || defaultRef;

    useEffect(() => {
      if (ref.current) {
        ref.current.indeterminate = indeterminate;
      }
    }, [ref, indeterminate]);

    const checkboxClass = [
      'sng-checkbox peer appearance-none w-[18px] h-[18px] shrink-0 rounded-[4px] border-2 border-border-default bg-bg-elevated transition-colors duration-150 cursor-pointer',
      'hover:border-border-strong',
      'checked:bg-brand-primary checked:border-brand-primary',
      'indeterminate:bg-brand-primary indeterminate:border-brand-primary',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:bg-bg-base disabled:border-border-subtle',
    ].join(' ');

    const inputElement = (
      <span className="relative inline-flex items-center justify-center w-[18px] h-[18px] align-middle">
        <input
          type="checkbox"
          ref={ref}
          disabled={disabled}
          className={checkboxClass}
          {...props}
        />
        {indeterminate ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 12 12"
            fill="none"
            className="pointer-events-none absolute w-3 h-3 text-text-inverse"
          >
            <path d="M2.5 6h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 12 12"
            fill="none"
            className="pointer-events-none absolute w-3 h-3 text-text-inverse opacity-0 peer-checked:opacity-100 transition-opacity duration-150"
          >
            <path d="M2.25 6.25L4.75 8.75L9.75 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
    );

    if (!label && !description) return inputElement;

    return (
      <label className={`flex items-start gap-3 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}>
        <div className="mt-0.5 shrink-0">{inputElement}</div>
        <div className="flex flex-col">
          {label && <span className="text-sm font-semibold text-text-primary">{label}</span>}
          {description && <span className="text-xs text-text-secondary mt-0.5">{description}</span>}
        </div>
      </label>
    );
  }
);
Checkbox.displayName = 'Checkbox';
