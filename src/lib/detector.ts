import type { ProjectType } from './types';

export function determineProjectType(keyFiles: string[]): ProjectType {
  // Framework-specific config files = high confidence
  if (keyFiles.some((f) => f.startsWith('next.config'))) {
    return { type: 'Next.js', confidence: 'high' };
  }
  if (keyFiles.some((f) => f.startsWith('astro.config'))) {
    return { type: 'Astro', confidence: 'high' };
  }
  if (keyFiles.some((f) => f.startsWith('nuxt.config'))) {
    return { type: 'Nuxt', confidence: 'high' };
  }
  if (keyFiles.includes('remix.config.js')) {
    return { type: 'Remix', confidence: 'high' };
  }
  if (keyFiles.includes('svelte.config.js')) {
    return { type: 'SvelteKit', confidence: 'high' };
  }
  if (keyFiles.includes('angular.json')) {
    return { type: 'Angular', confidence: 'high' };
  }
  if (keyFiles.includes('gatsby-config.js')) {
    return { type: 'Gatsby', confidence: 'high' };
  }
  if (keyFiles.includes('vue.config.js')) {
    return { type: 'Vue CLI', confidence: 'high' };
  }
  if (
    keyFiles.includes('wrangler.toml') ||
    keyFiles.includes('wrangler.jsonc')
  ) {
    return { type: 'Cloudflare Workers', confidence: 'high' };
  }

  // Build tool configs = medium confidence
  if (keyFiles.some((f) => f.startsWith('vite.config'))) {
    return { type: 'Vite', confidence: 'medium' };
  }
  if (keyFiles.includes('webpack.config.js')) {
    return { type: 'Webpack', confidence: 'medium' };
  }

  // Language-specific = medium confidence
  if (keyFiles.includes('Cargo.toml')) {
    return { type: 'Rust', confidence: 'high' };
  }
  if (keyFiles.includes('go.mod')) {
    return { type: 'Go', confidence: 'high' };
  }
  if (
    keyFiles.includes('requirements.txt') ||
    keyFiles.includes('pyproject.toml')
  ) {
    return { type: 'Python', confidence: 'high' };
  }
  if (keyFiles.includes('Gemfile')) {
    return { type: 'Ruby', confidence: 'high' };
  }
  if (keyFiles.includes('composer.json')) {
    return { type: 'PHP', confidence: 'high' };
  }

  // Package.json = low confidence (generic Node.js)
  if (keyFiles.includes('package.json')) {
    return { type: 'Node.js', confidence: 'low' };
  }

  return { type: 'Unknown', confidence: 'low' };
}
