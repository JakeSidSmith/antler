import fs from 'fs';
import path from 'path';
import { AntlerError } from './antler-error';
import { MESSAGE_PREFIX } from './constants';
import { Rule } from './rule';
import { Node } from './types';

const MATCHES_LEADING_SLASH = /^\//;

function createNode (fullPath: string): Node {
  const parentFullPath = path.resolve(fullPath, '../');
  const parentName = path.basename(parentFullPath);

  const shortPath = fullPath.replace(parentFullPath, '').replace(MATCHES_LEADING_SLASH, '');
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
  node: Node,
  ruleInstances: ReadonlyArray<Rule>,
  indent: string
) {
  ruleInstances.forEach((instance) => {
    try {
      instance.run(node);
    } catch (error) {
      const message = error && error.message ? error.message : error;
      console.error(`${MESSAGE_PREFIX}${message}`); // tslint:disable-line:no-console

      if (!(error instanceof AntlerError)) {
        process.exit(1);
      }
    }
  });

  node.childNames.forEach((childName) => {
    const fullPath = path.resolve(node.fullPath, childName);
    const childNode = createNode(fullPath);

    crawl(childNode, ruleInstances, `  ${indent}`);
  });
}

function beginCrawl (fullPath: string, ruleInstances: ReadonlyArray<Rule>) {
  const node = createNode(fullPath);

  crawl(node, ruleInstances, '');
}

export default beginCrawl;
