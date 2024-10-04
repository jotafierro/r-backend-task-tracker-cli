import { writeFileSync } from 'node:fs'

export const updateFile = (file, data) => writeFileSync(
  file,
  JSON.stringify(data, null, 2),
)
