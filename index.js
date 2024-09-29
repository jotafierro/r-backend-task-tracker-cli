import { argv } from 'node:process'
import { getFile, updateFile } from './utils/index.js'
import { add } from './actions/index.js'
import { STATUS } from './constants.js'

const [,, action, ...restArgv] = argv

const actions = {
  add: add({getFile, updateFile, STATUS, restArgv}),
}

actions[action]()
