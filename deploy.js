// deploy.js
import { NeocitiesAPIClient } from '@bcomnes/deploy-to-neocities';
import fs from 'fs';
import path from 'path';

const apiToken = process.env.NEOCITIES_API_TOKEN;
if (!apiToken) {
  console.error("Error: NEOCITIES_API_TOKEN not set");
  process.exit(1);
}

const client = new NeocitiesAPIClient(apiToken);

let successCount = 0;
let failCount = 0;

async function deployDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === '.git' || file === 'node_modules') continue; // ignorer ces dossiers
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isFile()) {
      try {
        await client.upload(fullPath, fs.readFileSync(fullPath));
        console.log('Uploaded', fullPath);
        successCount++;
      } catch (e) {
        console.error('Failed:', fullPath, e.message);
        failCount++;
      }
    } else if (stat.isDirectory()) {
      await deployDir(fullPath);
    }
  }
}

(async () => {
  await deployDir('.');
  console.log("------ Deployment Summary ------");
  console.log(`Files uploaded successfully: ${successCount}`);
  console.log(`Files failed: ${failCount}`);
})();
