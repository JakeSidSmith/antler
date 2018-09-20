#! /usr/bin/env node

import fs from 'fs';
import path from 'path';
import { crawl } from './index';

const CWD = process.cwd();

function init () {
  const [,, filePath] = process.argv;

  if (!filePath) {
    console.error('No directory specified');
    return process.exit(1);
  }

  const resolvedPath = path.resolve(CWD, filePath);

  if (!fs.lstatSync(resolvedPath).isDirectory()) {
    console.error(`${resolvedPath} is not a directory`);
    return process.exit(1);
  }

  crawl(filePath);
}

init();
