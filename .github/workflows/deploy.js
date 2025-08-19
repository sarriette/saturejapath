// deploy.js
import { NeocitiesAPIClient } from '@bcomnes/deploy-to-neocities';
import fs from 'fs';
import path from 'path';

const apiKey = process.env.NEOCITIES_API_KEY;
const client = new NeocitiesAPIClient(apiKey);

async function deployDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isFile()) {
      try {
        await client.upload(fullPath, fs.readFileSync(fullPath));
        console.log('Uploaded', fullPath);
      } catch (e) {
        console.error('Failed:', fullPath, e.message);
      }
    } else if (stat.isDirectory()) {
      await deployDir(fullPath);
    }
  }
}

deployDir('.');
