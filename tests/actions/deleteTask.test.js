import { NAME_FILE } from '../../constants'
import { deleteTask } from '../../actions/deleteTask.js'

describe('deleteTask', () => {
  let mockGetFile
  let mockUpdateFile
  let mockConsoleLog

  beforeEach(() => {
    mockGetFile = jest.fn()
    mockUpdateFile = jest.fn()
    mockConsoleLog = jest.spyOn(console, 'log').mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should log an error when no task ID is provided', async () => {
    const deleteTaskFn = deleteTask({ getFile: mockGetFile, updateFile: mockUpdateFile, NAME_FILE })
    await deleteTaskFn({ restArgv: [] })

    expect(mockConsoleLog).toHaveBeenCalledWith('Please provide a task id')
    expect(mockGetFile).not.toHaveBeenCalled()
    expect(mockUpdateFile).not.toHaveBeenCalled()
  })

  it('should delete a task when a valid ID is provided', async () => {
    const tasks = [
      { id: 1, description: 'Task 1' },
      { id: 2, description: 'Task 2' },
      { id: 3, description: 'Task 3' },
    ]
    mockGetFile.mockResolvedValue(tasks)

    const deleteTaskFn = deleteTask({ getFile: mockGetFile, updateFile: mockUpdateFile, NAME_FILE })
    await deleteTaskFn({ restArgv: [ '2' ] })

    expect(mockGetFile).toHaveBeenCalledWith(NAME_FILE)
    expect(mockUpdateFile).toHaveBeenCalledWith(NAME_FILE, [
      { id: 1, description: 'Task 1' },
      { id: 3, description: 'Task 3' },
    ])
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should log an error when the task ID is not found', async () => {
    const tasks = [
      { id: 1, description: 'Task 1' },
      { id: 2, description: 'Task 2' },
    ]
    mockGetFile.mockResolvedValue(tasks)

    const deleteTaskFn = deleteTask({ getFile: mockGetFile, updateFile: mockUpdateFile, NAME_FILE })
    await deleteTaskFn({ restArgv: [ '3' ] })

    expect(mockGetFile).toHaveBeenCalledWith(NAME_FILE)
    expect(mockUpdateFile).not.toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenCalledWith('Task with ID 3 not found')
  })

  it('should handle non-numeric task ID', async () => {
    const tasks = [
      { id: 1, description: 'Task 1' },
      { id: 2, description: 'Task 2' },
    ]
    mockGetFile.mockResolvedValue(tasks)

    const deleteTaskFn = deleteTask({ getFile: mockGetFile, updateFile: mockUpdateFile, NAME_FILE })
    await deleteTaskFn({ restArgv: [ 'abc' ] })

    expect(mockGetFile).toHaveBeenCalledWith(NAME_FILE)
    expect(mockUpdateFile).not.toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenCalledWith('Task with ID NaN not found')
  })

  it('should handle empty tasks list', async () => {
    mockGetFile.mockResolvedValue([])

    const deleteTaskFn = deleteTask({ getFile: mockGetFile, updateFile: mockUpdateFile, NAME_FILE })
    await deleteTaskFn({ restArgv: [ '1' ] })

    expect(mockGetFile).toHaveBeenCalledWith(NAME_FILE)
    expect(mockUpdateFile).not.toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenCalledWith('Task with ID 1 not found')
  })
})
