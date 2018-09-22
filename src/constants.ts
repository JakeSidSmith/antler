import { Level } from './types';

export const CWD = process.cwd();

export const UTF8 = 'utf8';
export const MESSAGE_PREFIX = '[ Antler ] ';
export const CONFIG_FILE_NAME = '.antlerrc.json';

export const LEVELS: ReadonlyArray<Level> = ['off', 'warning', 'error'];
