const fs = require('fs');

const inputFile = process.argv[2];
const outputFile = process.argv[3];

console.log(`Reading: ${inputFile}`);
const svg = fs.readFileSync(inputFile, 'utf8');

// Very conservative optimization:
// 1. Remove whitespace between tags only
// 2. Round decimals to 3 places (very conservative)

let optimized = svg
  // Remove whitespace between tags (but keep content inside tags)
  .replace(/>\s+</g, '><')
  // Round numbers to 3 decimal places (very conservative)
  .replace(/(\d+\.\d{4,})/g, (match) => parseFloat(match).toFixed(3));

const originalSize = Buffer.byteLength(svg, 'utf8');
const newSize = Buffer.byteLength(optimized, 'utf8');
const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(2);

console.log(`Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`New size: ${(newSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`Reduction: ${reduction}%`);

fs.writeFileSync(outputFile, optimized);
console.log(`Saved to: ${outputFile}`);
