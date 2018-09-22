const MATCHES_WORD_START = /\b\w/g;
const MATCHES_HYPHEN = /-/g;
const MATCHES_EXTENSION = /\..+/;

export const fileNameToPascalCase = (value: string) => {
  return value
    .replace(MATCHES_EXTENSION, '')
    .replace(MATCHES_WORD_START, (match) => {
      return match.toUpperCase();
    })
    .replace(MATCHES_HYPHEN, '');
};
