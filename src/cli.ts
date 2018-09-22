#! /usr/bin/env node

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import beginCrawl from './';
import getConfig from './config';
import { CWD, MESSAGE_PREFIX } from './constants';
import * as rules from './rules';

function init () {
  const { configPath, config } = getConfig();

  // tslint:disable-next-line:no-console
  console.error(`${MESSAGE_PREFIX}${chalk.green(`Found config file at ${configPath}`)}`);

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

  let warningCount = 0;
  let errorCount = 0;

  function reportWarning () {
    warningCount += 1;
  }

  function reportError () {
    errorCount += 1;
  }

  beginCrawl(fullPath, ruleInstances, reportWarning, reportError);

  if (!warningCount && !errorCount) {
    // tslint:disable-next-line:no-console
    console.error(`${MESSAGE_PREFIX}${chalk.green('Completed with no warnings or errors!')}`);
  } else {
    const warnings = chalk.yellow(`${warningCount} warnings`);
    const errors = chalk.red(`${errorCount} errors`);
    // tslint:disable-next-line:no-console
    console.error(`${MESSAGE_PREFIX}Completed with ${warnings} and ${errors}`);
  }

  if (errorCount) {
    process.exit(1);
  }
}

try {
  init();
} catch (error) {
  const message = error && error.message ? error.message : error;

  console.error(`${MESSAGE_PREFIX}${chalk.red(message)}`); // tslint:disable-line:no-console
  process.exit(1);
}
