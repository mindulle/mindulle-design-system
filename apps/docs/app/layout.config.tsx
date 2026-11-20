import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { MindulleLogo } from '@mindulle/ui';
import React from 'react';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <span className="flex items-center gap-2.5 font-semibold tracking-tight text-sm py-1">
        <MindulleLogo size={22} />
        <span className="font-mono text-xs tracking-wider text-[var(--mds-color-brand-primary)]">
          ED. 04
        </span>
        <span>Mindulle Specimen</span>
        <span className="text-xs font-mono text-[var(--color-fd-muted-foreground)] font-normal">
          v0.1.0
        </span>
      </span>
    ),
  },
  links: [
    { text: 'Specimen', url: '/' },
    { text: 'Rules', url: '/rules' },
    { text: 'Plates', url: '/plates' },
    { text: 'Errata', url: '/errata' },
  ],
  githubUrl: 'https://github.com/mindulle/mindulle-design-system',
};
