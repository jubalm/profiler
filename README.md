# Project Profiler for AI & Workflows

Get instant codebase knowledge. Feed it to your LLM and save tokens, pipe to workflows, or bootstrap documentation. Zero installation, works anywhere.

## Installation

Need to install? Seriously? Of course, there's no installation needed!

Just run it:

```bash
npx github:jubalm/profiler
```

Voila! It scans your project, detects the project type, shows useful key indicators for a number of use-cases.

## Example Use Cases

### Instant Project Analysis with Claude Code

Pipe directly to Claude Code CLI for AI-powered analysis:

```bash
npx github:jubalm/profiler | claude -p "what testing strategy would work best for this project?"
```

**Output includes methodology footnotes:**

```markdown
---
project_type: Next.js
confidence: high
---

# Key Indicators

## Key Files
- next.config.js
- package.json
...

## Key Directories
- src
- app
...

## Key Globals
...

---

**Confidence Levels:**
- High: Framework-specific config files
- Medium: Package.json analysis
- Low: Generic files only

**Scan Strategy:**
- Fast surface scan - no deep inspection
- Pattern-matched against 19 framework configs
- Pattern-matched against 17 common directories
- Parsed .env.example for environment variables
```

The footnotes help Claude understand scan limitations and provide context-aware recommendations.

### Pipeline Integration

Minimal markdown strips methodology for compact workflow integration:

```bash
npx github:jubalm/profiler --format=markdown > .profile
```

Clean data-only output for CI/CD pipelines or documentation generation.

### Programmatic Use

JSON for scripts and automation:

```bash
npx github:jubalm/profiler --format=json | jq '.project_type'
```

```json
{
  "project_type": "Next.js",
  "confidence": "high",
  "key_files": ["next.config.js", "package.json"],
  "key_directories": ["src", "app"],
  "key_globals": ["DATABASE_URL"]
}
```

Parse and process project metadata in your build scripts.

## High-Accuracy Framework Detection

Instantly identifies Next.js, Astro, Nuxt, Remix, SvelteKit, Angular, Gatsby, Rust, Go, Python, Ruby, PHP, Cloudflare Workers, and more using efficient pattern recognition strategies.

## Development

```bash
# Format + lint
npm run check

# CI check (verify only)
npm run ci

# Local test
npm run profile
```

Uses [Biome](https://biomejs.dev/) for formatting and linting.

## License

MIT
