// deploy.js
import fs from 'fs';
import path from 'path';
import Neocities from 'neocities';

const USERNAME = process.env.NEOCITIES_USERNAME;
const PASSWORD = process.env.NEOCITIES_PASSWORD;

if (!USERNAME || !PASSWORD) {
  console.error("Error: NEOCITIES_USERNAME or NEOCITIES_PASSWORD not set");
  process.exit(1);
}

const client = new Neocities(USERNAME, PASSWORD);

// Extensions autorisées pour comptes gratuits
const ALLOWED_EXTENSIONS = [
  '.html', '.css', '.js',
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp',
  '.ttf', '.woff', '.woff2'
];

// Fonction pour lister récursivement tous les fichiers du dossier courant
function listFiles(dir) {
  let results = [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === '.git' || file === 'node_modules') continue; // Ignorer certains dossiers

    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (ALLOWED_EXTENSIONS.includes(ext)) {
        results.push(fullPath);
      } else {
        console.log('Skipping unsupported file:', fullPath);
      }
    } else if (stat.isDirectory()) {
      results = results.concat(listFiles(fullPath));
    }
  }
  return results;
}

// Upload par batch
async function uploadInBatches(files, batchSize = 50) {
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < files.length; i += batchSize) {
    const batchFiles = files.slice(i, i + batchSize)
      .map(f => ({ path: f, name: path.relative(process.cwd(), f) })); // nom relatif pour écraser

    if (batchFiles.length === 0) continue;

    try {
      await new Promise((resolve, reject) => {
        client.upload(batchFiles, resp => {
          if (resp.result === 'success') {
            successCount += batchFiles.length;
            console.log(`Uploaded batch ${i / batchSize + 1}: ${batchFiles.length} files`);
          } else {
            failCount += batchFiles.length;
            console.error('Batch failed:', resp);
          }
          resolve();
        });
      });
    } catch (err) {
      failCount += batchFiles.length;
      console.error('Error uploading batch:', err.message);
    }
  }

  console.log('------ Deployment Summary ------');
  console.log(`Total files attempted: ${files.length}`);
  console.log(`Successfully uploaded: ${successCount}`);
  console.log(`Failed: ${failCount}`);
}

// Fonction principale
async function deploy() {
  const files = listFiles('.');
  console.log(`Found ${files.length} files to upload.`);
  await uploadInBatches(files, 50);
}

deploy();
