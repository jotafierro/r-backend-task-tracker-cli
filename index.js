#!/usr/bin/env node

import { argv } from 'node:process'
import { getFile, updateFile } from './utils/index.js'
import { add, list, update, deleteTask, markInProgress, markDone } from './actions/index.js'
import { STATUS, NAME_FILE } from './constants.js'

const [ ,, action, ...restArgv ] = argv

const actions = {
  'add': add({ getFile, updateFile, STATUS, NAME_FILE }),
  'list': list({ getFile, STATUS, NAME_FILE }),
  'update': update({ getFile, updateFile, NAME_FILE }),
  'delete': deleteTask({ getFile, updateFile, NAME_FILE }),
  'mark-in-progress': markInProgress({ getFile, updateFile, STATUS, NAME_FILE }),
  'mark-done': markDone({ getFile, updateFile, STATUS, NAME_FILE }),
  'help': () => {
    console.log('Available commands:\n')
    console.log('- add <description>: Add a new task in file todo.json\n')
    console.log('- list: List all tasks in file todo.json\n')
    console.log('- update <id> <description>: Update a task in file todo.json\n')
    console.log('- delete <id>: Delete a task in file todo.json\n')
    console.log('- mark-in-progress <id>: Mark a task as in progress in file todo.json\n')
    console.log('- mark-done <id>: Mark a task as done in file todo.json\n')
    console.log('- help: Show available commands\n')
  },
}

actions[action]({ restArgv })
