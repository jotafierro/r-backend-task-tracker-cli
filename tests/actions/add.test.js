import { add } from '../../actions/add.js'
import { STATUS, NAME_FILE } from '../../constants.js'

describe('add', () => {
  test('create new task in todo.json file', async () => {
    const consoleLog = jest.spyOn(console, 'log')
    const getFile = jest.fn().mockReturnValueOnce([])
    const updateFile = jest.fn()
    const createTask = add({
      getFile,
      updateFile,
      STATUS,
      NAME_FILE,
    })

    await createTask({ restArgv: [ 'text mock' ] })

    expect(getFile).toHaveBeenCalledWith('todo.json')
    expect(updateFile).toHaveBeenCalledWith(
      'todo.json',
      expect.arrayContaining([
        expect.objectContaining({
          description: 'text mock',
          status: 'todo',
        }),
      ]),
    )
    expect(consoleLog).toHaveBeenCalledWith('Task added successfully (ID: 1)')
  })

  test('create task without description print message that it is requested', async () => {
    const getFile = jest.fn().mockReturnValueOnce([])
    const updateFile = jest.fn()
    const consoleLog = jest.spyOn(console, 'log')
    const createTask = add({
      getFile,
      updateFile,
      STATUS,
      NAME_FILE,
    })

    await createTask({ restArgv: [] })

    expect(getFile).toHaveBeenCalledWith('todo.json')
    expect(updateFile).not.toHaveBeenCalled()
    expect(consoleLog).toHaveBeenCalledWith('Please, enter the task description')
  })
})
