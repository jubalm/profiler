/**
 * Project Profiler Detection Strategy
 *
 * Goal: Identify files and directories that set projects apart and influence critical decisions.
 * See CLAUDE.md for full design philosophy and evolution notes.
 *
 * Layer 1 (Current): Surface scanning - fast pattern matching on file/directory existence
 * Layer 2 (Future): Contextual clues - selective parsing of key files for disambiguation
 */

// Framework indicators (highest precedence for project type detection)
export const FRAMEWORK_CONFIGS = [
  'next.config.js',
  'next.config.mjs',
  'next.config.ts',
  'astro.config.mjs',
  'astro.config.ts',
  'astro.config.js',
  'nuxt.config.js',
  'nuxt.config.ts',
  'remix.config.js',
  'svelte.config.js',
  'angular.json',
  'gatsby-config.js',
  'vue.config.js',
  'wrangler.toml',
  'wrangler.jsonc',
  'vite.config.ts',
  'vite.config.js',
  'webpack.config.js',
  'rollup.config.js',
];

// Language-specific indicators (high confidence for language detection)
const LANGUAGE_FILES = [
  'Cargo.toml', // Rust
  'go.mod', // Go
  'requirements.txt', // Python
  'pyproject.toml', // Python
  'Gemfile', // Ruby
  'composer.json', // PHP
];

// Documentation indicators (decision-critical presence, not quality metrics)
const DOCUMENTATION_FILES = [
  'README.md',
  'README',
  'CONTRIBUTING.md', // Open source project
  'LICENSE', // Legal implications
  'LICENSE.md',
  'CODE_OF_CONDUCT.md', // Community project
  'API.md', // Technical documentation available
  'ARCHITECTURE.md', // Architecture documentation available
  'SECURITY.md', // Security documentation
  'CHANGELOG.md', // Version history
];

// Binary/executable indicators (distinguish CLI tools from libraries)
const EXECUTABLE_FILES = [
  'Makefile', // Build system
  'makefile',
  'CMakeLists.txt', // C/C++ build
];

// Deployment/platform indicators (lower precedence for project type)
const DEPLOYMENT_CONFIGS = [
  'vercel.json',
  'netlify.toml',
  'fly.toml',
  'wrangler.toml', // Cloudflare
  'wrangler.jsonc',
  'Dockerfile',
  'docker-compose.yml',
];

// Monorepo/tooling indicators
const MONOREPO_CONFIGS = [
  'turbo.json',
  'nx.json',
  'lerna.json',
  'pnpm-workspace.yaml',
];

// Common project files (base indicators)
const COMMON_PROJECT_FILES = [
  'package.json',
  'tsconfig.json',
  'jsconfig.json',
  '.env.example',
  '.env',
  'prisma/schema.prisma',
];

// Consolidated: All files to scan
export const COMMON_FILES = [
  ...LANGUAGE_FILES,
  ...DOCUMENTATION_FILES,
  ...EXECUTABLE_FILES,
  ...DEPLOYMENT_CONFIGS,
  ...MONOREPO_CONFIGS,
  ...COMMON_PROJECT_FILES,
];

// Application structure indicators
const APP_STRUCTURE_DIRS = [
  'src',
  'app',
  'pages',
  'api',
  'components',
  'lib',
  'public',
  'static',
  'assets',
];

// Testing infrastructure indicators
const TESTING_DIRS = [
  'tests',
  'test',
  '__tests__',
  'e2e',
  'cypress',
];

// Documentation directories (indicate docs presence)
const DOCUMENTATION_DIRS = [
  'docs',
  'documentation',
  'doc',
  'wiki',
  '.github',
];

// Binary/executable output directories (runnable project indicator)
const BINARY_DIRS = [
  'bin',
  'dist/bin',
  'cmd', // Go binaries
  'target/release', // Rust release binaries
];

// Data/backend indicators
const DATA_BACKEND_DIRS = [
  'prisma',
  'supabase',
  'migrations',
];

// Monorepo structure indicators
const MONOREPO_DIRS = [
  'packages',
  'apps',
];

// Consolidated: All directories to scan
export const COMMON_DIRS = [
  ...APP_STRUCTURE_DIRS,
  ...TESTING_DIRS,
  ...DOCUMENTATION_DIRS,
  ...BINARY_DIRS,
  ...DATA_BACKEND_DIRS,
  ...MONOREPO_DIRS,
];
