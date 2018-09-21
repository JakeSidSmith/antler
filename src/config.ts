import fs from 'fs';
import path from 'path';

const UTF8 = 'utf8';
const CWD = process.cwd();
const FILE_NAME = '.antlerrc.json';

function getConfig () {
  let directoryPath = CWD;
  let directoryName = path.basename(directoryPath);
  let filePath = path.join(directoryPath, FILE_NAME);

  while (directoryName) {
    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
      let config;

      try {
        config = JSON.parse(fs.readFileSync(filePath, UTF8));
      } catch (error) {
        throw new Error(`Error reading config file at ${filePath} - ${error && error.message ? error.message : error}`);
      }

      if (!config || typeof config !== 'object' || Array.isArray(config)) {
        throw new Error('Invalid config - must be an object');
      }

      if (!('rules' in config)) {
        throw new Error('Invalid config - no rules key');
      }

      return config;
    }

    directoryPath = path.join(directoryPath, '../');
    directoryName = path.basename(directoryPath);
    filePath = path.join(directoryPath, FILE_NAME);
  }

  throw new Error('Could not find an .antlerrc.json file in the current working directory or above');
}

export default getConfig;
