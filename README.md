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

See the example `.antlerrc.json` file in the root of this project for a more complex example.
