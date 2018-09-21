#! /usr/bin/env node

import fs from 'fs';
import path from 'path';
import AntlerError from './antler-error';
import getConfig from './config';
import crawl from './index';

const MESSAGE_PREFIX = '[Antler] ';
const CWD = process.cwd();

function init () {
  const [ , , filePath] = process.argv;

  if (!filePath) {
    throw new Error('No directory specified');
  }

  const resolvedPath = path.resolve(CWD, filePath);

  if (!fs.lstatSync(resolvedPath).isDirectory()) {
    throw new Error(`${resolvedPath} is not a directory`);
  }

  const { configPath } = getConfig();

  console.info(`${MESSAGE_PREFIX}Found config file at ${configPath}`); // tslint:disable-line:no-console

  crawl(resolvedPath);
}

try {
  init();
} catch (error) {
  const message = error && error.message ? error.message : error;

  console.error(`${MESSAGE_PREFIX}${message}`); // tslint:disable-line:no-console

  if (!(error instanceof AntlerError)) {
    process.exit(1);
  }
}
