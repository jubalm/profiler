# Profiler

Lightweight project profiler that outputs key indicators optimized for LLM consumption.

## Usage

### Default (LLM-optimized)

```bash
npx @jubalm/profiler
```

Outputs markdown with methodology footnotes - best for LLM consumption.

### Minimal Markdown

```bash
npx @jubalm/profiler --format=markdown
```

Outputs markdown without methodology footnotes - just the data.

### JSON Output

```bash
npx @jubalm/profiler --format=json
```

Outputs flat JSON structure for programmatic use.

### Save to File

```bash
npx @jubalm/profiler > .profile
npx @jubalm/profiler --format=markdown > .profile
npx @jubalm/profiler --format=json > data.json
```

### Help

```bash
npx @jubalm/profiler --help
```

### Local Development

```bash
npm run profile
```

## Output Formats

### Default (Markdown with Methodology)

LLM-optimized format with transparent methodology footnotes:

```markdown
---
project_type: Next.js
confidence: high
---

# Key Indicators

## Key Files
- next.config.js
- package.json
- tsconfig.json

## Key Directories
- src
- app
- public

## Key Globals
- DATABASE_URL
- API_KEY

---

**Confidence Levels:**
- High: Framework-specific config files (next.config.js, vite.config.ts, etc.)
- Medium: Package.json dependency/script analysis
- Low: Generic files only

**Scan Strategy:**
- Pattern-matched 19 framework config filenames
- Pattern-matched 17 common directory names
- Parsed .env.example for environment variables
- Fast surface scan - no deep file content inspection
```

### Minimal Markdown

Same structure without methodology footnotes:

```markdown
---
project_type: Next.js
confidence: high
---

# Key Indicators

## Key Files
- next.config.js
- package.json
- tsconfig.json

## Key Directories
- src
- app
- public

## Key Globals
- DATABASE_URL
- API_KEY
```

### JSON

Flat structure for pipelines:

```json
{
  "project_type": "Next.js",
  "confidence": "high",
  "key_files": ["next.config.js", "package.json", "tsconfig.json"],
  "key_directories": ["src", "app", "public"],
  "key_globals": ["DATABASE_URL", "API_KEY"]
}
```

## Why?

Gives LLMs quick context about your project with transparent detection methodology. The markdown format explains how confidence was determined and what was scanned, helping LLMs understand scan limitations and what additional analysis might be needed.

## Supported Project Types

### High Confidence
- Next.js
- Astro
- Nuxt
- Remix
- SvelteKit
- Angular
- Gatsby
- Cloudflare Workers
- Rust
- Go
- Python
- Ruby
- PHP

### Medium Confidence
- Vite
- Webpack

### Low Confidence
- Generic Node.js projects

## Development

### Formatting & Linting

This project uses [Biome](https://biomejs.dev/) for formatting and linting.

```bash
# Fix all issues (format + lint)
npm run check

# CI check (verify only, no fixes)
npm run ci
```

## Publishing

```bash
npm publish
```

Then anyone can use:
```bash
npx @jubalm/profiler
```

## License

MIT
