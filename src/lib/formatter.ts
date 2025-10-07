import { COMMON_DIRS, FRAMEWORK_CONFIGS } from './constants';
import type { ProfileData } from './types';

export function formatAsMarkdown(
  data: ProfileData,
  includeMethodology = true
): string {
  const filesList =
    data.keyFiles.length > 0
      ? data.keyFiles.map((f) => `- ${f}`).join('\n')
      : '- (none found)';

  const dirsList =
    data.keyDirectories.length > 0
      ? data.keyDirectories.map((d) => `- ${d}`).join('\n')
      : '- (none found)';

  const globalsList =
    data.keyGlobals.length > 0
      ? data.keyGlobals.map((g) => `- ${g}`).join('\n')
      : '- (none found)';

  const methodology = includeMethodology
    ? `
---

**Confidence Levels:**
- High: Framework-specific config files (next.config.js, vite.config.ts, etc.)
- Medium: Package.json dependency/script analysis
- Low: Generic files only

**Scan Strategy:**
- Pattern-matched ${FRAMEWORK_CONFIGS.length} framework config filenames
- Pattern-matched ${COMMON_DIRS.length} common directory names
- Parsed .env.example for environment variables
- Fast surface scan - no deep file content inspection
`
    : '';

  return `---
project_type: ${data.projectType}
confidence: ${data.confidence}
---

# Key Indicators

## Key Files
${filesList}

## Key Directories
${dirsList}

## Key Globals
${globalsList}
${methodology}`;
}

export function formatAsJSON(data: ProfileData): string {
  const output = {
    project_type: data.projectType,
    confidence: data.confidence,
    key_files: data.keyFiles,
    key_directories: data.keyDirectories,
    key_globals: data.keyGlobals,
  };
  return JSON.stringify(output, null, 2);
}
