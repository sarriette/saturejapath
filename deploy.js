// deploy.js
import fs from 'fs';
import path from 'path';

const API_TOKEN = process.env.NEOCITIES_API_TOKEN;
if (!API_TOKEN) {
  console.error("Error: NEOCITIES_API_TOKEN is not set");
  process.exit(1);
}

const BASE_URL = 'https://neocities.org/api/upload';

// Lister tous les fichiers à uploader
function listFiles(dir) {
  let results = [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === '.git' || file === 'node_modules') continue;

    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isFile()) {
      results.push(fullPath);
    } else if (stat.isDirectory()) {
      results = results.concat(listFiles(fullPath));
    }
  }
  return results;
}

// Uploader un fichier
async function uploadFile(filePath) {
  const content = fs.readFileSync(filePath);
  const relativePath = path.relative(process.cwd(), filePath);

  try {
    const formData = new FormData();
    formData.append('api_key', API_TOKEN);
    formData.append('filename', relativePath);
    formData.append('file', new Blob([content]));

    const res = await fetch(BASE_URL, { method: 'POST', body: formData });
    const data = await res.json();

    if (data.result === 'success') {
      console.log('Uploaded:', relativePath);
    } else {
      console.error('Failed:', relativePath, data);
    }
  } catch (err) {
    console.error('Error uploading:', relativePath, err.message);
  }
}

// Déploiement complet
async function deploy() {
  const files = listFiles('.');
  console.log(`Found ${files.length} files.`);
  for (const file of files) {
    await uploadFile(file);
  }
  console.log('------ Deployment Summary ------');
  console.log(`Total files attempted: ${files.length}`);
}

deploy();
