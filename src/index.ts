import fs from 'fs';
import path from 'path';
import { AntlerError } from './antler-error';
import { AntlerWarning } from './antler-warning';
import { MESSAGE_PREFIX } from './constants';
import { Rule } from './rule';
import { Callback, Node } from './types';

const MATCHES_LEADING_SLASH = /^\//;

function createNode (rootPath: string, fullPath: string): Node {
  const parentFullPath = path.resolve(fullPath, '../');
  const parentName = path.basename(parentFullPath);

  const shortPath = fullPath.replace(rootPath, '').replace(MATCHES_LEADING_SLASH, '');

  const name = path.basename(fullPath);

  let childNames: ReadonlyArray<string> = [];
  let siblingNamesIncludingSelf: ReadonlyArray<string> = [];
  let isDirectory = false;

  if (fs.lstatSync(fullPath).isDirectory()) {
    isDirectory = true;
    childNames = fs.readdirSync(fullPath);
  }

  if (fs.lstatSync(parentFullPath).isDirectory()) {
    siblingNamesIncludingSelf = fs.readdirSync(parentFullPath);
  }

  return {
    parentName,
    path: shortPath,
    name,
    fullPath,
    isDirectory,
    siblingNamesIncludingSelf,
    childNames,
  };
}

function crawl (
  rootPath: string,
  node: Node,
  ruleInstances: ReadonlyArray<Rule>,
  indent: string,
  reportWarning: Callback,
  reportError: Callback
) {
  ruleInstances.forEach((instance) => {
    try {
      instance.run(node);
    } catch (error) {
      const message = error && error.message ? error.message : error;

      // tslint:disable-next-line:no-console
      console.error(`${MESSAGE_PREFIX}${message}`);

      if (error instanceof AntlerWarning) {
        reportWarning();
      } else if (error instanceof AntlerError) {
        reportError();
      } else {
        process.exit(1);
      }
    }
  });

  node.childNames.forEach((childName) => {
    const fullPath = path.resolve(node.fullPath, childName);
    const childNode = createNode(rootPath, fullPath);

    crawl(rootPath, childNode, ruleInstances, `  ${indent}`, reportWarning, reportError);
  });
}

function beginCrawl (
  fullPath: string,
  ruleInstances: ReadonlyArray<Rule>,
  reportWarning: Callback,
  reportError: Callback
) {
  const rootPath = path.resolve(fullPath, '../');
  const node = createNode(rootPath, fullPath);

  crawl(rootPath, node, ruleInstances, '', reportWarning, reportError);
}

export default beginCrawl;
