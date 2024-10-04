import { update } from '../../actions/update.js'
import { NAME_FILE } from '../../constants.js'

describe('update', () => {
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
    const updateFn = update({ getFile: mockGetFile, updateFile: mockUpdateFile, NAME_FILE })
    await updateFn({ restArgv: [] })

    expect(mockConsoleLog).toHaveBeenCalledWith('Please, enter the task ID')
    expect(mockGetFile).not.toHaveBeenCalled()
    expect(mockUpdateFile).not.toHaveBeenCalled()
  })

  it('should update a task description when a valid ID and new description are provided', async () => {
    const tasks = [
      { id: 1, description: 'Task 1' },
      { id: 2, description: 'Task 2' },
      { id: 3, description: 'Task 3' },
    ]
    mockGetFile.mockResolvedValue(tasks)

    const updateFn = update({ getFile: mockGetFile, updateFile: mockUpdateFile, NAME_FILE })
    await updateFn({ restArgv: [ '2', 'Updated Task 2' ] })

    expect(mockGetFile).toHaveBeenCalledWith(NAME_FILE)
    expect(mockUpdateFile).toHaveBeenCalledWith(NAME_FILE, [
      { id: 1, description: 'Task 1' },
      { id: 2, description: 'Updated Task 2' },
      { id: 3, description: 'Task 3' },
    ])
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should not change anything if the task ID is not found', async () => {
    const tasks = [
      { id: 1, description: 'Task 1' },
      { id: 2, description: 'Task 2' },
    ]
    mockGetFile.mockResolvedValue(tasks)

    const updateFn = update({ getFile: mockGetFile, updateFile: mockUpdateFile, NAME_FILE })
    await updateFn({ restArgv: [ '3', 'New Task' ] })

    expect(mockGetFile).toHaveBeenCalledWith(NAME_FILE)
    expect(mockUpdateFile).toHaveBeenCalledWith(NAME_FILE, tasks)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should handle non-numeric task ID', async () => {
    const tasks = [
      { id: 1, description: 'Task 1' },
      { id: 2, description: 'Task 2' },
    ]
    mockGetFile.mockResolvedValue(tasks)

    const updateFn = update({ getFile: mockGetFile, updateFile: mockUpdateFile, NAME_FILE })
    await updateFn({ restArgv: [ 'abc', 'New Task' ] })

    expect(mockGetFile).toHaveBeenCalledWith(NAME_FILE)
    expect(mockUpdateFile).toHaveBeenCalledWith(NAME_FILE, tasks)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should handle empty tasks list', async () => {
    mockGetFile.mockResolvedValue([])

    const updateFn = update({ getFile: mockGetFile, updateFile: mockUpdateFile, NAME_FILE })
    await updateFn({ restArgv: [ '1', 'New Task' ] })

    expect(mockGetFile).toHaveBeenCalledWith(NAME_FILE)
    expect(mockUpdateFile).toHaveBeenCalledWith(NAME_FILE, [])
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should handle missing new description', async () => {
    const tasks = [
      { id: 1, description: 'Task 1' },
      { id: 2, description: 'Task 2' },
    ]
    mockGetFile.mockResolvedValue(tasks)

    const updateFn = update({ getFile: mockGetFile, updateFile: mockUpdateFile, NAME_FILE })
    await updateFn({ restArgv: [ '2' ] })

    expect(mockGetFile).toHaveBeenCalledWith(NAME_FILE)
    expect(mockUpdateFile).toHaveBeenCalledWith(NAME_FILE, [
      { id: 1, description: 'Task 1' },
      { id: 2, description: undefined },
    ])
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should update a task with an empty description', async () => {
    const tasks = [
      { id: 1, description: 'Task 1' },
      { id: 2, description: 'Task 2' },
    ]
    mockGetFile.mockResolvedValue(tasks)

    const updateFn = update({ getFile: mockGetFile, updateFile: mockUpdateFile, NAME_FILE })
    await updateFn({ restArgv: [ '2', '' ] })

    expect(mockGetFile).toHaveBeenCalledWith(NAME_FILE)
    expect(mockUpdateFile).toHaveBeenCalledWith(NAME_FILE, [
      { id: 1, description: 'Task 1' },
      { id: 2, description: '' },
    ])
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })
})
