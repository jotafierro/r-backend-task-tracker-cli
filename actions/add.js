export const add = ({
  getFile,
  updateFile,
  STATUS,
  restArgv,
}) => async () => {
  const todos = await getFile('todo.json')
  const [ description ] = restArgv

  if (!description) {
    console.log('Please, enter the task description')

    return
  }

  todos.push({
    id: todos.length + 1,
    description,
    status: STATUS.TODO,
    createdAt: new Date(),
    updatedAt: null,
  })

  await updateFile('todo.json', todos)
}
