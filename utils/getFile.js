import { updateFile } from './updateFile.js'
import { readFileSync } from 'node:fs'

export const getFile = async (file) => {
  try {
    const data = await readFileSync(file)

    return JSON.parse(data)
  } catch (error) {
    if (error.code === 'ENOENT') {
      await updateFile(file, [])

      return getFile(file)
    }

    throw new Error('Error al leer el archivo')
  }
}
