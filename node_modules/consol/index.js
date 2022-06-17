const { inspect } = require('util');
const { EOL } = require('os');
const micromatch = require('micromatch');
const colors = require('colors/safe');

const { DEBUG = '' } = process.env;

const noop = function() {};

const types = {
  debug: 0,
  trace: 0,
  info: 1,
  log: 2,
  warn: 3,
  error: 4,
};

const typeColors = {
  debug: 'gray',
  trace: 'gray',
  info: 'white',
  log: 'white',
  warn: 'yellow',
  error: 'red',
};

const getStackTrace = () =>
  new Error().stack
    .split(/\n/g)
    .slice(1)
    .map((v, i) => (i ? v : v.slice(1)))
    .join(EOL);

const prevConsole = Object.keys(types).reduce((prev, name) => ({ ...prev, [name]: console[name].bind(console) }), {});

function applyTo(target, options = {}) {
  const { prefix, enabled = true } = options;

  function logForType(type, ...args) {
    if (type === 'trace') {
      args = [...args, '\n', getStackTrace()];
    }

    const typeFormatted = colors[typeColors[type]](type.toUpperCase());

    const formatted = args
      .map(_ => (typeof _ === 'object' ? inspect(_, { colors: true }) : _))
      .join(' ')
      .split(/\n/g)
      .map(line => [typeFormatted, ...(prefix ? [prefix] : []), line].join(' '))
      .join(EOL);

    if (type === 'trace') {
      type = 'debug';
    }

    return prevConsole[type](formatted);
  }

  for (const type of Object.keys(types)) {
    if (!enabled) {
      target[type] = noop;
      continue;
    }

    target[type] = logForType.bind(target, type);
  }

  target.global = logForType;

  return target;
}

const consol = applyTo({});

consol.types = types;

consol.debugger = function(prefix) {
  const enabled = micromatch.any(prefix, DEBUG.split(/,/g));

  if (!enabled) {
    return noop;
  }

  return applyTo({}, { prefix: `(${prefix})` }).debug;
};

module.exports = consol;
