# Antler

[![CircleCI](https://circleci.com/gh/JakeSidSmith/antler/tree/master.svg?style=svg)](https://circleci.com/gh/JakeSidSmith/antler/tree/master)

**Directory structure linter**

## About

Antler allows you to configure linting rules to enforce the structure of your project directories and files.

## Installation

Install with NPM:

```shell
npm i antler -S
```

Note: `-S` is shorthand for `--save` to automatically add this to your package.json

If you are using a version of NPM that doesn't support package lock files I'd recommend using `-SE` or `--save-exact`, which will pin the version in your package.json.

## Configuration

All Antler configuration is stored in an `.antlerrc.json` file. Antler will look in the target directory, and all of its parent directories until it finds a file named `.antlerrc.json`.

The basic structure of a config file is as follows:

```json
{
  "rules": {
    "RuleName": "warning",
    "AnotherRule": {
      "level": "error",
      "options": {
        "allow": "^my-file$",
        "disallow": [
          "nope",
          "bad"
        ]
      }
    }
  }
}
```

Each rule can be provided with either a string representing the error level (`off`, `warning`, or `error`), or an object with a level key.

Some rules allow the user to provide additional options as an object in the `options` key.

Options are (at the time of writing) always strings or arrays of strings.

See the example `.antlerrc.json` file in the root of this project for a more complex example.

## Rules

### NoLonelyIndex

Ensures that no directories contain only a single index file e.g. `index.js`, or `index.html`.

```json
{
  "NoLonelyIndex": "error"
}
```

#### Acceptable

```
foo/
  cli.js
  index.js

foo/
  index/
    file.js
```

#### Unacceptable

```
foo/
  index.js
```

### NoJuniors

Ensures that no files, or directories share a name with their parent directory.

```json
{
  "NoJuniors": "error"
}
```

#### Acceptable

```
foo/
  bar.js
```

#### Unacceptable

```
foo/
  foo.js

foo/
  foo/
```

### NoEmptyDirectory

Ensures that there are no empty directories.

```json
{
  "NoEmptyDirectory": "error"
}
```

#### Acceptable

```
foo/
  bar/
    baz.js

foo/
  bar.js
```

#### Unacceptable

```
foo/
  bar/

foo/
```
