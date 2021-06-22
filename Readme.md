# Living Style Guide boilerplate

This boilerplate can generate an static HTML living Style Guide website from kss documented SCSS files.

## Installation

1. Open a terminal window on the root folder of the repo.
2. Run `npm install` to install dev dependencies.

## Use

### Developing

1. Open a terminal window on the root folder of the repo.
2. Run `gulp` to compile the styleguide in the `./dev` folder and start a live webserver.

### Build
1. Open a terminal window on the root folder of the repo.
2. Run `gulp build` to compile the styleguide in the `./dist` folder.


## Source Files

All SCSS source files are to be included in `src/cscc/` folder.

Each scss file must also inclue a documentation block in `KSS syntax` to be parserd into the style guide.
Here's an example KSS comment:
```scss
/*
Button

Your standard button suitable for clicking.

:hover   - Highlights when hovering.
.shiny   - Do not press this big, shiny, red button.

Markup: button.html

Style guide: components.button
*/
.button {
/* … */
}
.button.shiny {
/* … */
}
```
Each KSS documentation block consists of two required parts and a few optional parts:

- A heading (required)
- A description of what the style does or looks like (optional)
- The name of file containing the HTML markup the CSS applies to, or a copy of the markup inline (optional)
- A list of modifier classes or pseudo-classes and how they modify the style (optional)
- A reference to the style's position in the style guide (required). Ex.: `Style guide: Section - Sub Section`
- A numerical weight that can be used to re-position a style outside of the normal alphabetical order (optional). Ex.: `Weight: -1`

See [Knyle Style Sheets] for more information in the KSS syntaxt spects.

## Custom TOC menu

By default the table of content menu is auto generated alphabetically based on each component KSS comment.

From within a single components comments you can arrange it to be placed in the TOC root, or as a subitem.

If you want to create a deeper hierarchy (more than 1 level), you must declare each level individually in its own KSS comment.

Use the file `./src/scss/kss_custom_toc.scss` to add any additional custom TOC structures you require.

> This is also usefully for creating other documentation pages.

In this example, we declare 3 parent sections with weight, to be used as parent of components and components groups.
```scss
/*
Atoms

Styleguide Atoms

Weight: -3
*/

/*
Molecules

Styleguide Molecules

Weight: -2
*/

/*
Organisms

Styleguide Organisms

Weight: -1
*/

```

## Compiling the Style Guide

To compile the style guide just run `gulp build`.

The resulting static style guide files will be compiled into the `./dist` folder.

Alternatively, you can compile the style guide and open a live webserver, with auto refresh, for developing, by runing: `gulp`.


## Custom Style Guide template

This boilerplate already includes a default page template. 

If you want to make any modification just configure the boilerplate to use the custom builder template in `./custom_builder` folder.

To do so, edit the file `kss.json` and add the line `"builder": "custom-builder"`.

The templates is build upon handlebars.js.


## Extra Documentation


- [KSS Node WIKI](https://github.com/kss-node/kss-node/wiki)
    - [Quick Start Guide](https://github.com/kss-node/kss-node/wiki/Quick-Start-Guide)
- [Knyle Style Sheets] syntax spect.
- [Using custom builder](https://github.com/kss-node/kss-node/wiki/Using-custom-templates)

[Knyle Style Sheets]: https://github.com/kss-node/kss/blob/spec/SPEC.md
