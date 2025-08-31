// deploy.js
import fs from 'fs';
import path from 'path';
import Neocities from 'neocities'; // le module officiel Neocities

// Nom d'utilisateur et mot de passe
const USERNAME = process.env.NEOCITIES_USERNAME;
const PASSWORD = process.env.NEOCITIES_PASSWORD;

if (!USERNAME || !PASSWORD) {
  console.error("Error: NEOCITIES_USERNAME or NEOCITIES_PASSWORD not set");
  process.exit(1);
}

const client = new Neocities(USERNAME, PASSWORD);

// Fonction pour lister récursivement tous les fichiers, en ignorant certains dossiers
function listFiles(dir) {
  let results = [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === '.git' || file === 'node_modules' || file.startsWith('.')) continue; // ignore dossiers et fichiers cachés

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

// Fonction pour uploader tous les fichiers
async function deploy() {
  const files = listFiles('.');
  console.log(`Found ${files.length} files.`);

  const uploadList = files.map(file => ({
    name: path.relative(process.cwd(), file),
    path: file
  }));

  client.upload(uploadList, function(resp) {
    if (resp.result === 'success') {
      console.log('All files uploaded successfully!');
    } else {
      console.error('Upload failed:', resp);
    }
  });
}

deploy();
