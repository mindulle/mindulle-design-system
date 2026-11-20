import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export',
  transpilePackages: ['@mindulle/ui', '@mindulle/tokens', '@mindulle/icons'],
  // Design-token linting runs as its own CI step (pnpm run lint:tokens) with a
  // suppressions baseline. Next's build-time ESLint invocation cannot apply that
  // baseline, so keep it out of the build.
  eslint: { ignoreDuringBuilds: true },
};

export default withMDX(config);
