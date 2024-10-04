export const add = ({
  getFile,
  updateFile,
  STATUS,
  NAME_FILE,
}) => async ({ restArgv }) => {
  const todos = await getFile(NAME_FILE)
  const [ description ] = restArgv

  if (!description) {
    console.log('Please, enter the task description')

    return
  }

  const id = todos.length + 1
  todos.push({
    id,
    description,
    status: STATUS.TODO,
    createdAt: new Date(),
    updatedAt: null,
  })

  console.log(`Task added successfully (ID: ${id})`)

  await updateFile(NAME_FILE, todos)
}
