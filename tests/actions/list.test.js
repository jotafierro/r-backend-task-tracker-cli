import { list } from '../../actions/index.js'
import { STATUS } from '../../constants.js'

describe('list', () => {
  let mockTasks

  beforeEach(() => {
    mockTasks = [
      { id: 1, description: 'description 1', status: STATUS.IN_PROGRESS },
      { id: 2, description: 'description 2', status: STATUS.TODO },
      { id: 3, description: 'description 3', status: STATUS.TODO },
    ]
    jest.clearAllMocks()
  })

  test('show message to "empty tasks!"', async () => {
    const getFile = jest.fn().mockReturnValueOnce([])
    const consoleLog = jest.spyOn(console, 'log')

    const listTask = list({ getFile })

    await listTask({})

    expect(getFile).toHaveBeenCalledWith('todo.json')
    expect(consoleLog).toHaveBeenCalledWith('Empty tasks!')
  })

  test('list all tasks', async () => {
    const getFile = jest.fn().mockReturnValueOnce(mockTasks)
    const consoleLog = jest.spyOn(console, 'log')

    const listTask = list({ getFile })

    await listTask({})

    expect(consoleLog).toHaveBeenCalledTimes(3)
    expect(consoleLog).toHaveBeenNthCalledWith(1, '#1 | description: description 1 | status: in-progress')
    expect(consoleLog).toHaveBeenNthCalledWith(2, '#2 | description: description 2 | status: todo')
    expect(consoleLog).toHaveBeenNthCalledWith(3, '#3 | description: description 3 | status: todo')
  })

  test('filter by status', async () => {
    const getFile = jest.fn().mockReturnValueOnce(mockTasks)
    const consoleLog = jest.spyOn(console, 'log')

    const listTask = list({ getFile, STATUS })

    await listTask({ restArgv: [ STATUS.TODO ] })

    expect(consoleLog).toHaveBeenCalledTimes(2)
    expect(consoleLog).toHaveBeenNthCalledWith(1, '#2 | description: description 2 | status: todo')
    expect(consoleLog).toHaveBeenNthCalledWith(2, '#3 | description: description 3 | status: todo')
  })
})
