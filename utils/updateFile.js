import { writeFile } from 'node:fs'

export const updateFile = (file, data) => new Promise(
  (resolve, reject) => writeFile(file, data, (err) => {
    if (err) reject(err)

    resolve()
  })
)
