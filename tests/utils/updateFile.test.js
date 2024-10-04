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


    jest.spyOn(fs, 'writeFileSync').mockImplementation(
      () => Promise.resolve(),
    )

    await updateFile(mockFile, mockData)

    expect(fs.writeFileSync).toBeCalledWith(
      mockFile,
      JSON.stringify(mockData, null, 2),
    )
  })

  test('throw new error if writeFile callback err', async () => {
    const mockFile = 'todo.json'
    const mockData = [ {
      id: 1,
      description: 'Buy groceries',
      status: 'todo',
    } ]

    jest.spyOn(fs, 'writeFileSync').mockImplementation(
      () => Promise.reject(new Error('Test error')),
    )

    await expect(updateFile(mockFile, mockData)).rejects.toThrow('Test error')
  })
})
