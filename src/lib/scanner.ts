import * as fs from 'node:fs';
import * as path from 'node:path';
import { COMMON_DIRS, COMMON_FILES, FRAMEWORK_CONFIGS } from './constants';
import { dirExists, fileExists, parseEnvFile } from './utils';

export function scanKeyFiles(rootPath: string): string[] {
  const found: string[] = [];

  // Check framework configs first
  for (const file of FRAMEWORK_CONFIGS) {
    if (fileExists(rootPath, file)) {
      found.push(file);
    }
  }

  // Check common files
  for (const file of COMMON_FILES) {
    if (fileExists(rootPath, file)) {
      found.push(file);
    }
  }

  return found;
}

export function scanKeyDirectories(rootPath: string): string[] {
  const found: string[] = [];

  for (const dir of COMMON_DIRS) {
    if (dirExists(rootPath, dir)) {
      found.push(dir);
    }
  }

  return found;
}

export function scanKeyGlobals(rootPath: string): string[] {
  const globals = new Set<string>();

  // Parse .env.example first (safest)
  const envExamplePath = path.join(rootPath, '.env.example');
  if (fs.existsSync(envExamplePath)) {
    const envVars = parseEnvFile(envExamplePath);
    for (const v of envVars) {
      globals.add(v);
    }
  }

  // Parse .env if .env.example doesn't exist
  if (globals.size === 0) {
    const envPath = path.join(rootPath, '.env');
    if (fs.existsSync(envPath)) {
      const envVars = parseEnvFile(envPath);
      for (const v of envVars) {
        globals.add(v);
      }
    }
  }

  return Array.from(globals).sort();
}
