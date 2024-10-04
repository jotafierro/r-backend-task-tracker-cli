import fs from 'node:fs'
import { getFile } from '../../utils/getFile.js'

describe('getFile', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('get data from exist file', async () => {
    const mockFile = 'todo.json'
    const mockData = [ {
      id: 1,
      description: 'Buy groceries',
      status: 'todo',
    } ]

    jest.spyOn(fs, 'readFileSync').mockImplementation(
      () => Promise.resolve(JSON.stringify(mockData)),
    )

    const result = await getFile(mockFile)

    expect(result).toEqual(mockData)
  })

  test('get data from new file file', async () => {
    const mockFile = 'todo.json'
    const mockData = []

    jest.mock('../../utils/updateFile.js', () => ({
      updateFile: () => 'mocked message',
    }))

    jest.spyOn(fs, 'readFileSync')
      .mockImplementationOnce(
        () => Promise.reject({ code: 'ENOENT' }),
      )
      .mockImplementationOnce(
        () => Promise.resolve(JSON.stringify(mockData)),
      )

    jest.spyOn(fs, 'writeFile').mockImplementation(
      (path, data, callback) => callback(null),
    )

    const result = await getFile(mockFile)

    expect(result).toEqual(mockData)
  })

  test('get error from readFile', async () => {
    const mockFile = 'todo.json'
    jest.spyOn(fs, 'readFileSync').mockImplementation(
      () => Promise.reject(new Error('Error reading file')),
    )

    await expect(getFile(mockFile))
      .rejects.toThrow(new Error('Error al leer el archivo'))
  })
})
