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

    jest.spyOn(fs, 'readFile').mockImplementation(
      (path, callback) => callback(null, JSON.stringify(mockData)),
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

    jest.spyOn(fs, 'readFile')
      .mockImplementationOnce(
        (path, callback) => callback({ code: 'ENOENT' }, null),
      )
      .mockImplementationOnce(
        (path, callback) => callback(null, JSON.stringify(mockData)),
      )

    jest.spyOn(fs, 'writeFile').mockImplementation(
      (path, data, callback) => callback(null),
    )

    const result = await getFile(mockFile)

    expect(result).toEqual(mockData)
  })

  test('get error from readFile', async () => {
    const mockFile = 'todo.json'
    const mockError = new Error('Error reading file')

    jest.spyOn(fs, 'readFile').mockImplementation(
      (path, callback) => callback(mockError, null),
    )

    await expect(getFile(mockFile)).rejects.toThrow(mockError)
  })
})
