export function showHelp() {
  console.log(`Usage: profiler [options]

Options:
  --format=<format>    Output format: json or markdown
  --help               Show this help message

Formats:
  (default)            Markdown with methodology footnotes (LLM-optimized)
  --format=markdown    Minimal markdown without footnotes
  --format=json        JSON structure for pipelines

Examples:
  profiler                          # Markdown with methodology
  profiler --format=markdown        # Minimal markdown
  profiler --format=json            # JSON output
  profiler > .profile               # Save to file`);
}

export function parseArgs(): {
  format: 'markdown' | 'json' | 'default';
  help: boolean;
} {
  const args = process.argv.slice(2);
  let format: 'markdown' | 'json' | 'default' = 'default';
  let help = false;

  for (const arg of args) {
    if (arg === '--help' || arg === '-h') {
      help = true;
    } else if (arg.startsWith('--format=')) {
      const value = arg.split('=')[1];
      if (value === 'json' || value === 'markdown') {
        format = value;
      }
    }
  }

  return { format, help };
}
