import * as fs from 'node:fs';
import * as path from 'node:path';

export function fileExists(rootPath: string, relativePath: string): boolean {
  try {
    const fullPath = path.join(rootPath, relativePath);
    return fs.existsSync(fullPath) && fs.statSync(fullPath).isFile();
  } catch {
    return false;
  }
}

export function dirExists(rootPath: string, relativePath: string): boolean {
  try {
    const fullPath = path.join(rootPath, relativePath);
    return fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory();
  } catch {
    return false;
  }
}

export function parseEnvFile(filePath: string): string[] {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const variables: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      // Skip comments and empty lines
      if (!trimmed || trimmed.startsWith('#')) continue;

      // Extract variable name (before =)
      const match = trimmed.match(/^([A-Z][A-Z0-9_]+)=/);
      if (match) {
        variables.push(match[1]);
      }
    }

    return variables;
  } catch {
    return [];
  }
}
