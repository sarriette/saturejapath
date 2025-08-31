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

// Fonction pour lister récursivement tous les fichiers du dossier courant
function listFiles(dir) {
  let results = [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === '.git' || file === 'node_modules') continue; // Ignore certains dossiers

    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isFile()) {
      // Bloquer certaines extensions pour comptes gratuits
      const BLOCKED_EXTENSIONS = ['.cur', '.webm', '.mp3'];
      if (BLOCKED_EXTENSIONS.includes(path.extname(file).toLowerCase())) {
        console.log('Skipping unsupported file:', fullPath);
        continue;
      }

      results.push(fullPath);
    } else if (stat.isDirectory()) {
      results = results.concat(listFiles(fullPath));
    }
  }
  return results;
}


// Upload par lots pour éviter les erreurs
async function uploadInBatches(files, batchSize = 50) {
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    try {
      await new Promise((resolve, reject) => {
        client.upload(batch, resp => {
          if (resp.result === 'success') {
            successCount += batch.length;
            console.log(`Uploaded batch ${i / batchSize + 1}: ${batch.length} files`);
            resolve();
          } else {
            failCount += batch.length;
            console.error('Batch failed:', resp);
            resolve(); // On continue quand même
          }
        });
      });
    } catch (err) {
      failCount += batch.length;
      console.error('Error uploading batch:', err);
    }
  }

  console.log('------ Deployment Summary ------');
  console.log(`Total files attempted: ${files.length}`);
  console.log(`Successfully uploaded: ${successCount}`);
  console.log(`Failed: ${failCount}`);
}

async function deploy() {
  const files = listFiles('.');
  console.log(`Found ${files.length} files to upload.`);
  await uploadInBatches(files, 50);
}

deploy();
