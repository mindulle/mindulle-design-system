import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SonagiLogo } from './SonagiLogo';

describe('SonagiLogo Component', () => {
  it('renders editorial wordmark without stencil mask and with brand-primary accent', () => {
    const { container } = render(<SonagiLogo height={32} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute('height')).toBe('32');
    expect(container.querySelector('mask#sng-stencil-mask')).toBeNull();
    const paths = container.querySelectorAll('svg > path');
    const dot = paths[paths.length - 1] as SVGPathElement | undefined;
    expect(dot?.getAttribute('style')).toContain('--mds-color-brand-primary');
  });
});
