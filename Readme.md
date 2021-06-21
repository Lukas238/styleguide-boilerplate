# Living Style Guide boilerplate

This boilerplate can generate an static HTML living Style Guide website from kss documented SCSS files.

## How to

## Source files

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
- The name of file containing the HTML markup the CSS applies to, or a - copy of the markup inline (optional)
- A list of modifier classes or pseudo-classes and how they modify the style - (optional)
- A reference to the style's position in the style guide (required)
- A numerical weight that can be used to re-position a style outside of the normal alphabetical order (optional)

See [Knyle Style Sheets] for more information in the KSS syntaxt spects.

## Compiling the Style Guide

To compile the style guide just run `gulp`.

The resulting static style guide files will be compiled into the `./dist` folder.

Alternatively, you can compile the style guide and open a live webserver, with auto refresh, for developing, by runing: `gulp watch`.


## Custom Style Guide template

This boilerplate already includes a default page template. 

If you want to make any modification just configure the boilerplate to use the custom builder template in `./custom_builder` folder.

To do so, edit the file `kss.json` and add the line `"builder": "custom-builder"`.

The templates is build upon handlebars.js.


## KSS extra documentation


- https://github.com/kss-node/kss-node/wiki
- https://github.com/kss-node/kss-node/wiki/Quick-Start-Guide
- [Knyle Style Sheets] syntax spect.


[Knyle Style Sheets]: https://github.com/kss-node/kss/blob/spec/SPEC.md
