#!/usr/bin/env node

require = require('@std/esm')(module)
module.exports = require('./src/daemon').default
