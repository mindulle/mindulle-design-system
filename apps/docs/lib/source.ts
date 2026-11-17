import { createElement } from 'react';
import { icons } from 'lucide-react';
import { docs } from '../.source';
import { loader } from 'fumadocs-core/source';

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) return;
    const Icon = icons[icon as keyof typeof icons];
    if (Icon) {
      return createElement(Icon, { className: 'size-4' });
    }
  },
});
