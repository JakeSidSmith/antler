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

## Usage

Currently Antler only supports supplying a root directory to lint from, but I intend allow multiple root directories in the future.

```shell
antler <directory>
```

If no directory is supplied Antler won't run. If you'd like to lint the current directory you can supply `.` or `./`, as you like.

Note: there are no rules configured by default. You will have to configure your own `.antlerrc.json` config file as explained below.

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

### FileName

Allows the user to define allowed and disallowed patterns to match all file names against.

The patterns provided are converted to case sensitive regular expressions, and should be prefixed with `^` (start of string) and suffixed with `$` (end of string), if you want to ensure that the whole string matches your pattern, and not just a section of it.

The options; `allow` and `disallow`, can be either a string, or array of strings.

```json
{
  "FileName": {
    "level": "error",
    "options": {
      "allow": "",
      "disallow": ""
    }
  }
}
```

### DirectoryName

Allows the user to define allowed and disallowed patterns to match all directory names against.

The patterns provided are converted to case sensitive regular expressions, and should be prefixed with `^` (start of string) and suffixed with `$` (end of string), if you want to ensure that the whole string matches your pattern, and not just a section of it.

The options; `allow` and `disallow`, can be either a string, or array of strings.

```json
{
  "DirectoryName": {
    "level": "error",
    "options": {
      "allow": "",
      "disallow": ""
    }
  }
}
```

### Extension

Allows the user to define allowed and disallowed patterns to match all file extensions against. The extensions are extracted using Node's `path.extname`, and so will include only the last period and following characters e.g.

All of the following files will be tested against `.ts`:

```
index.ts
index.d.ts
index.min.ts
```

If you want to enforce checking of the `.min.ts` section, you should use the [FileName](#FileName) rule.

The patterns provided are converted to case sensitive regular expressions, and should be prefixed with `^` (start of string) and suffixed with `$` (end of string), if you want to ensure that the whole string matches your pattern, and not just a section of it.

The options; `allow` and `disallow`, can be either a string, or array of strings.

```json
{
  "Extension": {
    "level": "error",
    "options": {
      "allow": "",
      "disallow": ""
    }
  }
}
```

### Path

Allows the user to define allowed and disallowed patterns to match all paths against. The paths will include the root directory that you specified in the command e.g.

If you run:

```shell
antler src/
```

Against the structure:

```
src/
  foo/
    bar.js
```

The paths that are checked will be:

```
src/
src/foo/
src/foo/bar.js
```

The patterns provided are converted to case sensitive regular expressions, and should be prefixed with `^` (start of string) and suffixed with `$` (end of string), if you want to ensure that the whole string matches your pattern, and not just a section of it.

The options; `allow` and `disallow`, can be either a string, or array of strings.

```json
{
  "Path": {
    "level": "error",
    "options": {
      "allow": "",
      "disallow": ""
    }
  }
}
```
