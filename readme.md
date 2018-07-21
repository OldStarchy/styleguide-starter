# SASS + KSS + Browser Sync Starter

## Why?

Having a preset guide for styling can help take a lot of guessing out of building a website, especially when there's multiple people working together, or someone has come in to a project late.
A styleguide can tell you easily what components are available to use and how to use them. This helps keep everyone on the project up to date and has the nice side effect of encouraging you to keep your code DRY and organized.

## What?

This project is basically a gulp file with some dependencies to make it easy to start creating a styleguide with KSS. The default KSS builder (handlebars) has been exported, and its build tasks included in the root gulpfile to make it easier to customize the styleguide.

## How?

To get started, run `npm install` to install the dependencies, then either `npx gulp kss:watch` or use the equivalent VSCode task.

You'll mostly be wanting to edit in the scss folder, however changes in `builder/index.hbs` and `builder/kss-assets/` will trigger a reload too.

The KSS is built from the `scss` folder, but it should be easy enough to change that by editing line `11` of `gulpfile.js` to pull the styles in from a different location.


You may need to tweak some other things if you want to make sure the sourcemaps continue to work, however you may find it easier to just remove lines `26` and `27` to keep the sources inline.

## Feedback

As always, if you have any comments or suggestions, please open an issue and I'll see what I can do to incorporate your feedback.