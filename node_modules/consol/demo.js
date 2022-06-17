process.env.DEBUG = '*foo*,bar*';

const consol = require('./index');

consol.log('log line');
consol.debug('debug line');

consol.log('several\nlines', 'in\nthis');

consol.error('this is an error');
consol.trace('this is a a trace');

consol.log('global coming up');

require('./global');

console.log('global log');
console.warn('global warn');
console.debug('global debug');

const debug1 = console.debugger('foo fighters');
debug1('debug 1');

const debug2 = console.debugger('bar fighters');
debug2('debug 2');

const debug3 = console.debugger('tar fighters');
debug3('debug 3');

consol.error(new Error('Some error'));
