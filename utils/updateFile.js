import { writeFile } from 'node:fs'

export const updateFile = (file, data) => new Promise(
  (resolve, reject) => writeFile(
    file,
    JSON.stringify(data, null, 2),
    (err) => {
      if (err) reject(err)

      resolve()
    },
  ),
)
