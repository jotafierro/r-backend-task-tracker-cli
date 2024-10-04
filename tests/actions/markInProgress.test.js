import { markInProgress } from '../../actions/markInProgress.js'
import { STATUS, NAME_FILE } from '../../constants.js'

describe('markInProgress', () => {
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
    const markInProgressFn = markInProgress({ getFile: mockGetFile, updateFile: mockUpdateFile, STATUS, NAME_FILE })
    await markInProgressFn({ restArgv: [] })

    expect(mockConsoleLog).toHaveBeenCalledWith('Please provide a task id')
    expect(mockGetFile).not.toHaveBeenCalled()
    expect(mockUpdateFile).not.toHaveBeenCalled()
  })

  it('should mark a task as in progress when a valid ID is provided', async () => {
    const tasks = [
      { id: 1, description: 'Task 1', status: STATUS.PENDING },
      { id: 2, description: 'Task 2', status: STATUS.PENDING },
      { id: 3, description: 'Task 3', status: STATUS.DONE },
    ]
    mockGetFile.mockResolvedValue(tasks)

    const markInProgressFn = markInProgress({ getFile: mockGetFile, updateFile: mockUpdateFile, STATUS, NAME_FILE })
    await markInProgressFn({ restArgv: [ '2' ] })

    expect(mockGetFile).toHaveBeenCalledWith(NAME_FILE)
    expect(mockUpdateFile).toHaveBeenCalledWith(NAME_FILE, [
      { id: 1, description: 'Task 1', status: STATUS.PENDING },
      { id: 2, description: 'Task 2', status: STATUS.IN_PROGRESS },
      { id: 3, description: 'Task 3', status: STATUS.DONE },
    ])
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should not change anything if the task ID is not found', async () => {
    const tasks = [
      { id: 1, description: 'Task 1', status: STATUS.PENDING },
      { id: 2, description: 'Task 2', status: STATUS.DONE },
    ]
    mockGetFile.mockResolvedValue(tasks)

    const markInProgressFn = markInProgress({ getFile: mockGetFile, updateFile: mockUpdateFile, STATUS, NAME_FILE })
    await markInProgressFn({ restArgv: [ '3' ] })

    expect(mockGetFile).toHaveBeenCalledWith(NAME_FILE)
    expect(mockUpdateFile).toHaveBeenCalledWith(NAME_FILE, tasks)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should handle non-numeric task ID', async () => {
    const tasks = [
      { id: 1, description: 'Task 1', status: STATUS.PENDING },
      { id: 2, description: 'Task 2', status: STATUS.DONE },
    ]
    mockGetFile.mockResolvedValue(tasks)

    const markInProgressFn = markInProgress({ getFile: mockGetFile, updateFile: mockUpdateFile, STATUS, NAME_FILE })
    await markInProgressFn({ restArgv: [ 'abc' ] })

    expect(mockGetFile).toHaveBeenCalledWith(NAME_FILE)
    expect(mockUpdateFile).toHaveBeenCalledWith(NAME_FILE, tasks)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should handle empty tasks list', async () => {
    mockGetFile.mockResolvedValue([])

    const markInProgressFn = markInProgress({ getFile: mockGetFile, updateFile: mockUpdateFile, STATUS, NAME_FILE })
    await markInProgressFn({ restArgv: [ '1' ] })

    expect(mockGetFile).toHaveBeenCalledWith(NAME_FILE)
    expect(mockUpdateFile).toHaveBeenCalledWith(NAME_FILE, [])
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should change status from DONE to IN_PROGRESS', async () => {
    const tasks = [
      { id: 1, description: 'Task 1', status: STATUS.PENDING },
      { id: 2, description: 'Task 2', status: STATUS.DONE },
    ]
    mockGetFile.mockResolvedValue(tasks)

    const markInProgressFn = markInProgress({ getFile: mockGetFile, updateFile: mockUpdateFile, STATUS, NAME_FILE })
    await markInProgressFn({ restArgv: [ '2' ] })

    expect(mockGetFile).toHaveBeenCalledWith(NAME_FILE)
    expect(mockUpdateFile).toHaveBeenCalledWith(NAME_FILE, [
      { id: 1, description: 'Task 1', status: STATUS.PENDING },
      { id: 2, description: 'Task 2', status: STATUS.IN_PROGRESS },
    ])
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should not change status if task is already in progress', async () => {
    const tasks = [
      { id: 1, description: 'Task 1', status: STATUS.PENDING },
      { id: 2, description: 'Task 2', status: STATUS.IN_PROGRESS },
    ]
    mockGetFile.mockResolvedValue(tasks)

    const markInProgressFn = markInProgress({ getFile: mockGetFile, updateFile: mockUpdateFile, STATUS, NAME_FILE })
    await markInProgressFn({ restArgv: [ '2' ] })

    expect(mockGetFile).toHaveBeenCalledWith(NAME_FILE)
    expect(mockUpdateFile).toHaveBeenCalledWith(NAME_FILE, tasks)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })
})
