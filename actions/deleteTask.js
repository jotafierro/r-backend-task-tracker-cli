export const deleteTask = ({
  getFile,
  updateFile,
  NAME_FILE,
}) => async ({ restArgv }) => {
  if (!restArgv.length) {
    console.log('Please provide a task id')

    return
  }

  const id = Number(restArgv[0])

  const tasks = await getFile(NAME_FILE)
  let taskFound = false
  const newTasks = tasks.filter((task) => {
    if (task.id === id) {
      taskFound = true

      return false
    }

    return true
  })

  if (!taskFound) {
    console.log(`Task with ID ${id} not found`)

    return
  }

  await updateFile(
    NAME_FILE,
    newTasks,
  )
}
