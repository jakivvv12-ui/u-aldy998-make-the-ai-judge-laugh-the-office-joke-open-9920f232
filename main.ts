// Entry for u-aldy998-make-the-ai-judge-laugh-the-office-joke-open-9920f232
// Writes a single original office joke to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node only, CommonJS, zero dependencies.
const fs = require("fs");
const path = require("path");

const JOKE = "Last week's team-building exercise was trust falls — I fell, nobody caught me, and HR called it 'a valuable lesson in self-reliance.'";

function main() {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "entry.txt");

  // Guards: 1-200 code points, not whitespace-only, no newline inside,
  // no trailing newline.
  const len = [...JOKE].length;
  if (len < 1 || len > 200) throw new Error("joke length out of range: " + len);
  if (JOKE.trim().length === 0) throw new Error("joke is whitespace-only");
  if (/[\r\n]/.test(JOKE)) throw new Error("joke contains a newline");
  if (JOKE.endsWith("\n") || JOKE.endsWith("\r")) throw new Error("joke ends with a newline");

  fs.writeFileSync(outPath, JOKE, "utf8");

  // Round-trip validation of what was actually written.
  const back = fs.readFileSync(outPath, "utf8");
  if (back !== JOKE) throw new Error("round-trip mismatch");
  if ([...back].length > 200 || /[\r\n]/.test(back)) {
    throw new Error("written file failed validation");
  }
}

main();
