# SASS + KSS + Browser Sync Starter

## Why?

A preset guide for styling takes a lot of guesswork out of building a website by showing you what components are available, how to use them, and where in the code they are defined.

This is especially useful when there's multiple people working together, or you've come in midway through a project's development.

Styleguides keep everyone up to date and have the nice side effect of encouraging developers to keep the code DRY and organized.

## What?

This repository is a `gulpfile` designed to make creating a KSS styleguide easy, and a couple of example styles. The default KSS builder (handlebars) has been exported, and its build tasks included in the root gulpfile to make it easier to customize the styleguide.

## How?

To get started, run `npm install` to install the dependencies, then either `npx gulp kss:watch` or use the equivalent VSCode task.

You'll mostly be wanting to edit in the scss folder, however changes in `builder/index.hbs` and `builder/kss-assets/` will trigger a reload too.

The KSS is built from the `scss` folder, but it should be easy enough to change that by editing line `11` of `gulpfile.js` to pull the styles in from a different location.

You may need to tweak some other things if you want to make sure the sourcemaps continue to work, however you may find it easier to just remove lines `26` and `27` to keep the sources inline.

## Feedback

As always, if you have any comments or suggestions, please open an issue and I'll see what I can do to incorporate your feedback.