// deploy.js
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import fetch from 'node-fetch';

const API_TOKEN = process.env.NEOCITIES_API_TOKEN;
console.log("API Token (masked):", API_TOKEN ? API_TOKEN.slice(0, 4) + '...' : 'Not set'); // Affiche un aperçu court

if (!API_TOKEN) {
  console.error("Error: NEOCITIES_API_TOKEN is not set");
  process.exit(1);
}

const BASE_URL = 'https://neocities.org/api/upload';

// Fonction pour lister récursivement tous les fichiers du dossier courant
function listFiles(dir) {
  let results = [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === '.git' || file === 'node_modules') continue; // Ignore certains dossiers

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

// Upload d’un fichier vers Neocities
async function uploadFile(filePath) {
  const relativePath = path.relative(process.cwd(), filePath);

  const form = new FormData();
  form.append('api_key', API_TOKEN);
  form.append('filename', relativePath);
  form.append('file', fs.createReadStream(filePath));

  try {
    const res = await fetch(BASE_URL, { method: 'POST', body: form, headers: form.getHeaders() });
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

// Fonction principale de déploiement
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
