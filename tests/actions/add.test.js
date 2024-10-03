import { add } from '../../actions/add.js'

describe('add', () => {
  test('create new task in todo.json file', async () => {
    const getFile = jest.fn().mockReturnValueOnce([])
    const updateFile = jest.fn()
    const createTask = add({
      getFile,
      updateFile,
      STATUS: { TODO: 'todo' },
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
  })

  test('create task without description print message that it is requested', async () => {
    const getFile = jest.fn().mockReturnValueOnce([])
    const updateFile = jest.fn()
    const consoleLog = jest.spyOn(console, 'log')
    const createTask = add({
      getFile,
      updateFile,
      STATUS: { TODO: 'todo' },
    })

    await createTask({ restArgv: [] })

    expect(getFile).toHaveBeenCalledWith('todo.json')
    expect(updateFile).not.toHaveBeenCalled()
    expect(consoleLog).toHaveBeenCalledWith('Please, enter the task description')
  })
})
