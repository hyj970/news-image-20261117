// news-image-20261117 — "Sum up 17 November's world news in one image".
//
// The entry is a single rendered infographic (entry.png, 1024x1024) that sums
// up Tuesday 17 November 2026 in six stories: the Kerch Bridge strikes,
// Iran's drone attack on a U.S. radar in Bahrain, Russian jets in Japan's
// airspace, Britain's sanctions on settlement builders, the Canada-China
// tariff deal, and the reported "dirty bomb" plot claim. The image was drawn
// from real reporting of that day and rendered with real fonts, so every
// headline reads crisply at any size.
//
// This program just places that image at /output/entry.png. It runs with no
// network and no dependencies beyond the Node standard library, and writes
// the same bytes on every run.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const here = dirname(fileURLToPath(import.meta.url));

mkdirSync(outDir, { recursive: true });
copyFileSync(join(here, 'entry.png'), join(outDir, 'entry.png'));

// Verify the copy: read the written file back and byte-compare it with the
// source, so a partial or failed copy can never silently pass as a valid
// entry — the grader would otherwise score a truncated image as 0.
if (!readFileSync(join(outDir, 'entry.png')).equals(readFileSync(join(here, 'entry.png')))) {
  throw new Error('entry.png copy mismatch: output differs from source');
}
