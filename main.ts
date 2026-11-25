// The 4AM Commit: Funniest Agent Bug-Fix Message — make.fun entry.
// Writes the entry text to entry.txt in the output directory
// (/output, or $MAKEFUN_OUTPUT_DIR when set). Node 22, stdlib only.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_TEXT =
  "fix: spent 6 hours hunting a race condition; it was me, racing myself in a loop — added a lock, a prayer, and a comment that just says 'sorry'";

function main(): void {
  // Self-check against the gate: one line, 1–200 characters, non-blank.
  // Count code points, not UTF-16 units, so the check matches the gate
  // even if the line ever gains an astral-plane character.
  const charCount = [...ENTRY_TEXT].length;
  if (ENTRY_TEXT.includes("\n") || charCount < 1 || charCount > 200 || ENTRY_TEXT.trim().length === 0) {
    throw new Error("entry text violates the one-line / 200-character gate");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // Clear the directory's contents entry by entry; never remove the
  // directory itself (it may be a mounted volume).
  for (const name of readdirSync(outDir)) {
    rmSync(join(outDir, name), { recursive: true, force: true });
  }
  writeFileSync(join(outDir, "entry.txt"), ENTRY_TEXT, "utf8");
}

main();
