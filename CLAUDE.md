# CLAUDE.md - Project Profiler Design Intelligence

## Core Philosophy

**Goal**: Profile projects for instant understanding - prime knowledge of the entire codebase at a single glance.

**Strategy**: Detect files and directories that set projects apart and influence critical decisions. We're not analyzing quality or completeness; we're identifying the presence of decision-critical indicators.

**Use Cases**:
- Feed to LLMs for instant project context
- Pipeline integration for automated workflows
- Quick project type identification
- Decision support (licensing, architecture, deployment)

---

## Current Implementation: Layer 1 - Surface Scanning

### The Basics
We perform fast, surface-level pattern matching to identify key indicators:

**scanKeyFiles()**
- Framework-specific configs (next.config.js, astro.config.mjs, etc.)
- Language-specific files (Cargo.toml, go.mod, requirements.txt, etc.)
- Deployment configs (vercel.json, netlify.toml, wrangler.toml, etc.)
- Common project files (package.json, tsconfig.json, Dockerfile, etc.)

**scanKeyDirectories()**
- Application structure (src/, app/, pages/, components/, lib/)
- Testing infrastructure (tests/, test/, __tests__/)
- Package management (packages/, apps/ for monorepos)
- Data/backend (prisma/, supabase/)

**scanKeyGlobals()**
- Environment variables from .env.example (safer than .env)
- Fallback to .env if .env.example doesn't exist

### Detection Strategy
- **File/directory exists = indicator found**
- **No deep inspection** - just pattern matching on filenames
- **Fast and lightweight** - suitable for any project size

---

## Evolution Discovery: Layer 2 - Contextual Detection

### The Problem: Ambiguous Surface Indicators

Surface scanning alone can be misleading:

1. **Deployment vs Framework Confusion**
   - `wrangler.jsonc` exists → "Cloudflare Worker"
   - BUT it could be Astro on Cloudflare, Vue on Cloudflare, or a full API on Cloudflare
   - The deployment platform ≠ project type

2. **Directory Ambiguity**
   - `bin/` exists → "This is a CLI tool"
   - BUT it might just contain dev tools or build scripts
   - Need to distinguish actual executable output from tooling

3. **Documentation Presence vs Impact**
   - `README.md` exists → Basic indicator
   - `LICENSE` exists → But type matters! AGPL vs MIT = vastly different implications
   - `CONTRIBUTING.md` + `CODE_OF_CONDUCT.md` → Open source community project
   - Documentation files have different decision weights

### The Solution: Contextual Clues

Look **inside** key files for disambiguation:

**Package.json Context**
```json
{
  "bin": "./dist/cli.js",           // → CLI tool
  "dependencies": {
    "@astrojs/cloudflare": "..."    // → Astro on Cloudflare (not raw Worker)
  }
}
```

**License Context**
- Parse LICENSE for type: AGPL/GPL → copyleft, MIT/Apache → permissive
- Critical for dependency decisions

**Binary Indicators**
- `package.json` has `bin` field → CLI tool (high confidence)
- `bin/` directory exists → Check if it's in .gitignore or contains actual outputs
- `Cargo.toml` contains `[[bin]]` → Rust binary
- `cmd/*/main.go` → Go binary

---

## Indicator Hierarchy & Weighting

### Precedence Rules (When Indicators Conflict)

1. **Framework configs trump deployment configs for project type**
   - `next.config.js` + `wrangler.jsonc` = "Next.js on Cloudflare" (Next.js wins)
   - `astro.config.mjs` + `netlify.toml` = "Astro on Netlify" (Astro wins)

2. **License type is a critical decision factor**
   - More important than other indicators
   - Affects legal/commercial usage
   - Should be surfaced prominently

3. **Executable detection needs context**
   - `package.json bin` field = highest confidence for CLI
   - Binary directories need validation (not just dev tools)
   - Language-specific patterns (Cargo [[bin]], Go cmd/) = high confidence

4. **Confidence Levels**
   - **High**: Framework-specific configs, language binary indicators
   - **Medium**: Build tool configs, package.json analysis
   - **Low**: Generic files only (package.json without framework deps)

---

## Future Considerations

### Balancing Intelligence vs Speed

**Challenge**: How much contextual parsing before we lose "fast surface scan" advantage?

**Principles**:
- Parse only specific, high-value files (package.json, LICENSE)
- Avoid deep file tree traversal
- Keep regex/pattern matching simple
- Cache parsed results when possible

### Grading System for Indicators

Potential weighted scoring:
- Framework indicator: 10 points
- Deployment indicator: 3 points
- License type: 8 points (critical)
- Binary indicator: 7 points (affects runnable/library decision)

Project type = highest weighted indicator wins.

### Smart Disambiguation

Future enhancement: "If wrangler.jsonc exists, check package.json for framework before declaring 'Cloudflare Worker'"

### Documentation Intelligence

Not quality metrics, but decision relevance:
- LICENSE → Legal implications (weight: high)
- CONTRIBUTING → Open source (weight: medium)
- API.md/ARCHITECTURE.md → Technical depth available (weight: low)
- README → Universal (weight: baseline)

---

## Design Decisions Log

### Decision 1: Keep Surface Scanning Simple
**Date**: Initial implementation
**Rationale**: Fast, works for 80% of cases, minimal overhead
**Trade-off**: Some ambiguity in edge cases

### Decision 2: Separate Methodology Footnotes
**Date**: v0.0.0
**Rationale**: Help LLMs understand scan limitations, provide context-aware recommendations
**Implementation**: Include in default output, strip for --format=markdown

### Decision 3: Contextual Detection Discovery
**Date**: Current evolution
**Problem**: Surface indicators alone can mislead (Cloudflare Worker vs Astro on Cloudflare)
**Direction**: Add selective contextual parsing without sacrificing speed
**Status**: Exploring - need to balance intelligence vs simplicity

### Decision 4: Documentation as Indicators, Not Quality Metrics
**Date**: Current evolution
**Problem**: Initially tried to grade documentation quality ("well-documented", "basic", etc.)
**Correction**: Documentation files are **indicators** that affect decisions, not quality scores
**Examples**:
- LICENSE → Check licensing before using dependencies
- CONTRIBUTING → This is open source, follow contribution guidelines
- API.md → Technical documentation exists, review it

### Decision 5: Executable Detection for Project Classification
**Date**: Current evolution
**Purpose**: Distinguish CLI tools from libraries from web apps
**Approach**: Multiple signals (package.json bin, binary dirs, language patterns)
**Status**: Need to implement without over-engineering

---

## Implementation Notes

### Adding New Indicators

When adding files/directories to constants:

1. **Categorize with comments** - Show what it indicates
2. **Consider precedence** - Does it conflict with existing indicators?
3. **Document in CLAUDE.md** - Update this file with reasoning
4. **Test edge cases** - How does it interact with other indicators?

### Constants Organization

```javascript
// Framework indicators (highest precedence for project type)
export const FRAMEWORK_CONFIGS = [...]

// Language indicators (high confidence)
export const LANGUAGE_FILES = [...]

// Documentation indicators (decision-critical presence)
export const DOCUMENTATION_FILES = [...]

// Binary/executable indicators (runnable vs library)
export const BINARY_INDICATORS = [...]

// Deployment indicators (lower precedence for project type)
export const DEPLOYMENT_CONFIGS = [...]
```

---

## Questions to Explore

1. Should we parse package.json dependencies to improve framework detection?
2. How to handle monorepos with multiple project types?
3. Should LICENSE type be extracted and surfaced separately?
4. What's the threshold for "deep inspection" vs "surface scan"?
5. Can we build a confidence score based on indicator weight?

---

## Contributing to This Document

This is a **living document**. As the profiler evolves:

1. Document new discoveries in "Evolution Discovery"
2. Log design decisions with rationale
3. Update hierarchy rules when adding indicators
4. Keep "Questions to Explore" current

The goal: Make the profiler's intelligence transparent and improvable.
