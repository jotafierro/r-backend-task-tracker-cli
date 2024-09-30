import fs from 'node:fs'
import { updateFile } from '../../utils/updateFile.js'

describe('updateFile', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('check params to writeFile', async () => {
    const mockFile = 'todo.json'
    const mockData = [ {
      id: 1,
      description: 'Buy groceries',
      status: 'todo',
    } ]


    jest.spyOn(fs, 'writeFile').mockImplementation(
      (path, data, callback) => callback(null),
    )

    await updateFile(mockFile, mockData)

    expect(fs.writeFile).toBeCalledWith(
      mockFile,
      JSON.stringify(mockData, null, 2),
      expect.any(Function),
    )
  })

  test('throw new error if writeFile callback err', async () => {
    const mockFile = 'todo.json'
    const mockData = [ {
      id: 1,
      description: 'Buy groceries',
      status: 'todo',
    } ]

    jest.spyOn(fs, 'writeFile').mockImplementation(
      (path, data, callback) => callback(new Error('Test error')),
    )

    await expect(updateFile(mockFile, mockData)).rejects.toThrow('Test error')
  })
})
