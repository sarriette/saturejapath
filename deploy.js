// deploy.js
import { NeocitiesAPIClient } from '@bcomnes/deploy-to-neocities';
import fs from 'fs';
import path from 'path';

const API_TOKEN = process.env.NEOCITIES_API_TOKEN;
if (!API_TOKEN) {
  console.error("❌ NEOCITIES_API_TOKEN n'est pas défini !");
  process.exit(1);
}

const client = new NeocitiesAPIClient(API_TOKEN);

let totalFiles = 0;
let successFiles = 0;
let failedFiles = 0;

async function deployDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    // Ignorer certains dossiers/fichiers
    if (file.startsWith('.') || file === 'node_modules') continue;

    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isFile()) {
      totalFiles++;
      try {
        await client.upload(fullPath, fs.readFileSync(fullPath));
        console.log('✅ Uploaded', fullPath);
        successFiles++;
      } catch (e) {
        console.error('❌ Failed:', fullPath, e.message);
        failedFiles++;
      }
    } else if (stat.isDirectory()) {
      await deployDir(fullPath);
    }
  }
}

// Lancer le déploiement depuis la racine
(async () => {
  console.log("🚀 Début du déploiement sur Neocities...");
  await deployDir('.');
  console.log("\n------ Deployment Summary ------");
  console.log("Total files scanned:", totalFiles);
  console.log("Successfully uploaded:", successFiles);
  console.log("Failed uploads:", failedFiles);
})();
