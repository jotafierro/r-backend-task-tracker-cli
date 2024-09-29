import { updateFile } from './updateFile.js'
import { readFile } from 'node:fs'

export const getFile = (file) => new Promise(
  (resolve, reject) => readFile(file, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return updateFile(file, '[]')
          .then(() => getFile(file))
          .then(resolve)
          .catch(reject)
      }

      reject(err)
    }

    resolve(JSON.parse(data))
  }
))
