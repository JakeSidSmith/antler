#! /usr/bin/env node

import fs from 'fs';
import path from 'path';
import beginCrawl from './';
import getConfig from './config';
import { CWD, MESSAGE_PREFIX } from './constants';
import * as rules from './rules';

function init () {
  const { configPath, config } = getConfig();

  console.error(`${MESSAGE_PREFIX}Found config file at ${configPath}`); // tslint:disable-line:no-console

  const [ , , filePath] = process.argv;

  if (!filePath) {
    throw new Error('No directory specified');
  }

  const fullPath = path.resolve(CWD, filePath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Provided path ${fullPath} does not exist`);
  }

  if (!fs.lstatSync(fullPath).isDirectory()) {
    throw new Error(`Provided path ${fullPath} is not a directory`);
  }

  const ruleInstances = Object.keys(config.rules).map((ruleName: keyof typeof rules) => {
    const ruleConfig = config.rules[ruleName];
    return new rules[ruleName](ruleConfig);
  });

  beginCrawl(fullPath, ruleInstances);
}

try {
  init();
} catch (error) {
  const message = error && error.message ? error.message : error;

  console.error(`${MESSAGE_PREFIX}${message}`); // tslint:disable-line:no-console
  process.exit(1);
}
