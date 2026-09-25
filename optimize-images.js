import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.join(process.cwd(), 'src', 'assets');

async function optimizeImages() {
  const files = fs.readdirSync(assetsDir);

  for (const file of files) {
    if (file.endsWith('.png')) {
      const filePath = path.join(assetsDir, file);
      const webpPath = path.join(assetsDir, file.replace('.png', '.webp'));

      console.log(`Converting ${file} to WebP...`);
      await sharp(filePath)
        .webp({ quality: 80 })
        .toFile(webpPath);
      
      console.log(`Deleting original ${file}...`);
      fs.unlinkSync(filePath);
    }
  }
  
  console.log('Image optimization complete.');
}

optimizeImages().catch(console.error);
