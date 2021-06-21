'use strict';

const hljs = require('highlight.js');


module.exports = function(Handlebars) {
  Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
  });

  Handlebars.registerHelper('hljs', function(value, lang) {
    lang = lang || 'html';
    try {
      return hljs.highlight(lang, value, true).value;
    } catch (e) {
      console.log(e);
    }
  });
};
