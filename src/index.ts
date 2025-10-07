#!/usr/bin/env node
import { parseArgs, showHelp } from './lib/cli';
import { determineProjectType } from './lib/detector';
import { formatAsJSON, formatAsMarkdown } from './lib/formatter';
import {
  scanKeyDirectories,
  scanKeyFiles,
  scanKeyGlobals,
} from './lib/scanner';
import type { ProfileData } from './lib/types';

async function main() {
  const { format, help } = parseArgs();

  if (help) {
    showHelp();
    process.exit(0);
  }

  const rootPath = process.cwd();

  // Scan for indicators
  const keyFiles = scanKeyFiles(rootPath);
  const keyDirectories = scanKeyDirectories(rootPath);
  const keyGlobals = scanKeyGlobals(rootPath);

  // Determine project type
  const { type, confidence } = determineProjectType(keyFiles);

  const profileData: ProfileData = {
    projectType: type,
    confidence,
    keyFiles,
    keyDirectories,
    keyGlobals,
  };

  // Generate and output profile
  let output: string;
  if (format === 'json') {
    output = formatAsJSON(profileData);
  } else if (format === 'markdown') {
    output = formatAsMarkdown(profileData, false);
  } else {
    output = formatAsMarkdown(profileData, true);
  }

  console.log(output);
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
