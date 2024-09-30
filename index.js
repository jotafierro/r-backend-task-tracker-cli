#!/usr/bin/env node

import { argv } from 'node:process'
import { getFile, updateFile } from './utils/index.js'
import { add } from './actions/index.js'
import { STATUS } from './constants.js'

const [ ,, action, ...restArgv ] = argv

const actions = {
  add: add({ getFile, updateFile, STATUS, restArgv }),
  help: () => {
    console.log('Available commands:\n')
    console.log('- add <description>: Add a new task in file todo.json\n')
  },
}

actions[action]()
