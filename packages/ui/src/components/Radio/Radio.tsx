import React from 'react';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, className = '', disabled, ...props }, ref) => {
    const radioClass = [
      'sng-radio peer appearance-none w-[18px] h-[18px] shrink-0 rounded-full border-2 border-border-default bg-bg-elevated transition-colors duration-150 cursor-pointer',
      'hover:border-border-strong',
      'checked:border-brand-primary',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:bg-bg-base disabled:border-border-subtle',
    ].join(' ');

    const inputElement = (
      <span className="relative inline-flex items-center justify-center w-[18px] h-[18px] align-middle">
        <input
          type="radio"
          ref={ref}
          disabled={disabled}
          className={radioClass}
          {...props}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute w-2 h-2 rounded-full bg-brand-primary opacity-0 peer-checked:opacity-100 transition-opacity duration-150"
        />
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
Radio.displayName = 'Radio';
