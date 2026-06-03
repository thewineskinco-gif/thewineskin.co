#!/usr/bin/env node
/**
 * Hero Image WebP Conversion Pipeline
 * Converts all images in public/images/hero-carousel/ to WebP format
 * with responsive widths (1920w, 1200w, 768w, 480w) at 85% quality.
 * Skips files that are already converted.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.join(__dirname, '..', 'public', 'images', 'hero-carousel');
const OUTPUT_DIR = path.join(SOURCE_DIR, 'webp');

// Responsive widths for srcset
const WIDTHS = [1920, 1200, 768, 480];
const QUALITY = 85;

// Supported image formats
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'];

async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function getImageFiles(dir) {
  try {
    const files = await fs.readdir(dir);
    return files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      // Exclude files already in webp subfolder and non-image files
      return SUPPORTED_EXTENSIONS.includes(ext) && 
             !file.startsWith('.') && 
             file !== 'webp' &&
             file !== 'README.md';
    });
  } catch (error) {
    console.error(`❌ Error reading directory: ${error.message}`);
    return [];
  }
}

async function isAlreadyConverted(baseName) {
  try {
    const webpFiles = await fs.readdir(OUTPUT_DIR);
    // Check if any file starts with the base name (without extension)
    const expectedPattern = new RegExp(`^${baseName.replace(/[.+?^${}()|[\]\\]/g, '\\$&')}\\-(1920|1200|768|480)\\.webp$`);
    return webpFiles.some(file => expectedPattern.test(file));
  } catch {
    return false;
  }
}

async function convertImage(inputPath, fileName) {
  const baseName = path.basename(fileName, path.extname(fileName));
  
  // Check if already converted
  if (await isAlreadyConverted(baseName)) {
    console.log(`⏭️  Skipping ${fileName} (already converted)`);
    return { skipped: true, file: fileName };
  }

  console.log(`🔄 Converting ${fileName}...`);
  
  const results = [];
  
  for (const width of WIDTHS) {
    const outputFileName = `${baseName}-${width}.webp`;
    const outputPath = path.join(OUTPUT_DIR, outputFileName);
    
    try {
      const pipeline = sharp(inputPath)
        .resize(width, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ 
          quality: QUALITY,
          effort: 4, // Balance between speed and compression
          smartSubsample: true
        });
      
      await pipeline.toFile(outputPath);
      
      // Get file stats
      const stats = await fs.stat(outputPath);
      results.push({
        width,
        outputFileName,
        size: (stats.size / 1024).toFixed(2) + 'KB'
      });
    } catch (error) {
      console.error(`  ❌ Error creating ${width}w version: ${error.message}`);
    }
  }
  
  if (results.length > 0) {
    console.log(`  ✅ Created ${results.length} variants`);
    results.forEach(r => console.log(`     ${r.width}w: ${r.outputFileName} (${r.size})`));
    return { converted: true, file: fileName, variants: results.length };
  }
  
  return { failed: true, file: fileName };
}

async function main() {
  console.log('🖼️  Wineskin Hero Image Converter\n');
  console.log(`📁 Source: ${SOURCE_DIR}`);
  console.log(`📁 Output: ${OUTPUT_DIR}`);
  console.log(`⚙️  Quality: ${QUALITY}%, Widths: ${WIDTHS.join(', ')}w\n`);
  
  // Ensure output directory exists
  await ensureDir(OUTPUT_DIR);
  
  // Get all image files
  const imageFiles = await getImageFiles(SOURCE_DIR);
  
  if (imageFiles.length === 0) {
    console.log('⚠️  No images found in source directory.');
    console.log('   Paste your images into: public/images/hero-carousel/');
    process.exit(0);
  }
  
  console.log(`🗂️  Found ${imageFiles.length} image(s) to process\n`);
  
  let converted = 0;
  let skipped = 0;
  let failed = 0;
  
  for (const file of imageFiles) {
    const inputPath = path.join(SOURCE_DIR, file);
    const result = await convertImage(inputPath, file);
    
    if (result.converted) converted++;
    else if (result.skipped) skipped++;
    else if (result.failed) failed++;
    
    console.log('');
  }
  
  // Summary
  console.log('='.repeat(50));
  console.log('📊 Conversion Summary:');
  console.log(`   ✅ Converted: ${converted}`);
  console.log(`   ⏭️  Skipped:   ${skipped}`);
  console.log(`   ❌ Failed:    ${failed}`);
  console.log('='.repeat(50));
  
  if (converted > 0) {
    console.log('\n✨ WebP images are ready in: public/images/hero-carousel/webp/');
  }
  
  process.exit(failed > 0 ? 1 : 0);
}

main().catch(error => {
  console.error('💥 Fatal error:', error.message);
  process.exit(1);
});
