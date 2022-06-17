const consol = require('./index');

Object.keys(consol.types).forEach(function(type) {
  console[type] = consol.global.bind(consol, type);
});

console.debugger = consol.debugger;
