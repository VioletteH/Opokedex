// jest.setup.js
import dotenv from 'dotenv';
import path from 'path';

// Ces lignes sont maintenant inutiles car Babel est configuré
// pour transpirer en CommonJS, où __dirname est directement disponible.
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// On utilise directement __dirname qui devrait être fourni par Node.js/Babel
// dans l'environnement CommonJS des tests.
const currentDirname = __dirname; // __dirname devrait être disponible ici

process.env.NODE_ENV = 'test';

dotenv.config({ path: path.resolve(currentDirname, '.env.test') });

// Optionnel : vous pouvez toujours loguer pour vérifier
// console.log('NODE_ENV (dans jest.setup.js):', process.env.NODE_ENV);
// console.log('DB_URL (dans jest.setup.js):', process.env.DB_URL);