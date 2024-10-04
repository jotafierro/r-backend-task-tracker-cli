import { STATUS, NAME_FILE } from '../../constants.js'
import { list } from '../../actions/list.js'

describe('list', () => {
  let mockGetFile
  let mockConsoleLog

  beforeEach(() => {
    mockGetFile = jest.fn()
    mockConsoleLog = jest.spyOn(console, 'log').mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should list all tasks when no filter is provided', async () => {
    const tasks = [
      { id: 1, description: 'Task 1', status: STATUS.TODO },
      { id: 2, description: 'Task 2', status: STATUS.IN_PROGRESS },
      { id: 3, description: 'Task 3', status: STATUS.DONE },
    ]
    mockGetFile.mockResolvedValue(tasks)

    const listFn = list({ getFile: mockGetFile, STATUS, NAME_FILE })
    await listFn({ restArgv: [] })

    expect(mockGetFile).toHaveBeenCalledWith(NAME_FILE)
    expect(mockConsoleLog).toHaveBeenCalledTimes(3)
    expect(mockConsoleLog).toHaveBeenNthCalledWith(1, '#1 | description: Task 1 | status: todo')
    // expect(mockConsoleLog).toHaveBeenNthCalledWith(2, '#2 | description: Task 2 | status: in-progress')
    // expect(mockConsoleLog).toHaveBeenNthCalledWith(3, '#3 | description: Task 3 | status: done')
  })

  it('should list filtered tasks when a valid filter is provided', async () => {
    const tasks = [
      { id: 1, description: 'Task 1', status: STATUS.TODO },
      { id: 2, description: 'Task 2', status: STATUS.IN_PROGRESS },
      { id: 3, description: 'Task 3', status: STATUS.DONE },
    ]
    mockGetFile.mockResolvedValue(tasks)

    const listFn = list({ getFile: mockGetFile, STATUS, NAME_FILE })
    await listFn({ restArgv: [ STATUS.TODO ] })

    expect(mockGetFile).toHaveBeenCalledWith(NAME_FILE)
    expect(mockConsoleLog).toHaveBeenCalledTimes(1)
    expect(mockConsoleLog).toHaveBeenCalledWith('#1 | description: Task 1 | status: todo')
  })

  it('should show an error message for invalid filter', async () => {
    const tasks = [
      { id: 1, description: 'Task 1', status: STATUS.TODO },
      { id: 2, description: 'Task 2', status: STATUS.IN_PROGRESS },
    ]
    mockGetFile.mockResolvedValue(tasks)

    const listFn = list({ getFile: mockGetFile, STATUS, NAME_FILE })
    await listFn({ restArgv: [ 'INVALID_FILTER' ] })

    expect(mockGetFile).toHaveBeenCalledWith(NAME_FILE)
    expect(mockConsoleLog).toHaveBeenCalledWith('Invalid filter "INVALID_FILTER", available filters: "todo, in-progress, done"')
  })

  it('should show "Empty tasks!" message when no tasks match the filter', async () => {
    const tasks = [
      { id: 1, description: 'Task 1', status: STATUS.TODO },
      { id: 2, description: 'Task 2', status: STATUS.IN_PROGRESS },
    ]
    mockGetFile.mockResolvedValue(tasks)

    const listFn = list({ getFile: mockGetFile, STATUS, NAME_FILE })
    await listFn({ restArgv: [ STATUS.DONE ] })

    expect(mockGetFile).toHaveBeenCalledWith(NAME_FILE)
    expect(mockConsoleLog).toHaveBeenCalledWith('Empty tasks!')
  })

  it('should show "Empty tasks!" message when the task list is empty', async () => {
    mockGetFile.mockResolvedValue([])

    const listFn = list({ getFile: mockGetFile, STATUS, NAME_FILE })
    await listFn({ restArgv: [] })

    expect(mockGetFile).toHaveBeenCalledWith(NAME_FILE)
    expect(mockConsoleLog).toHaveBeenCalledWith('Empty tasks!')
  })

  it('should handle undefined restArgv', async () => {
    const tasks = [
      { id: 1, description: 'Task 1', status: STATUS.TODO },
      { id: 2, description: 'Task 2', status: STATUS.IN_PROGRESS },
    ]
    mockGetFile.mockResolvedValue(tasks)

    const listFn = list({ getFile: mockGetFile, STATUS, NAME_FILE })
    await listFn({ restArgv: undefined })

    expect(mockGetFile).toHaveBeenCalledWith(NAME_FILE)
    expect(mockConsoleLog).toHaveBeenCalledTimes(2)
    expect(mockConsoleLog).toHaveBeenNthCalledWith(1, '#1 | description: Task 1 | status: todo')
    expect(mockConsoleLog).toHaveBeenNthCalledWith(2, '#2 | description: Task 2 | status: in-progress')
  })
})
