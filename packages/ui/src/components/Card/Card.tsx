"use client";
import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 'flat' | 'raised' | 'floating';
  clickable?: boolean;
  children: React.ReactNode;
}

export function Card({
  elevation = 'raised',
  clickable = false,
  children,
  className = '',
  ...props
}: CardProps) {
  // Figma v3 Hand-off Spec for Cards:
  // - Padding All: 24px (actually DESIGN.md says 20px, let's use 20px)
  // - Corner Radius: 12px
  // - Border: 1px Solid Border Default/Subtle
  
  const baseClasses = 'flex flex-col bg-bg-surface border border-border-default rounded-lg p-5 gap-3';
  
  // L-002: no box-shadow. Elevation is border weight + surface step only.
  const elevationClasses = {
    flat: 'bg-bg-base border-border-subtle',
    raised: 'bg-bg-surface border-border-default',
    floating: 'bg-bg-elevated border-border-strong border-2',
  };

  const clickableClasses = clickable
    ? 'cursor-pointer transition-colors duration-150 hover:border-border-strong hover:bg-bg-elevated'
    : '';

  const cardClass = [
    baseClasses,
    elevationClasses[elevation],
    clickableClasses,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClass} {...props}>
      {children}
    </div>
  );
}
