export const markInProgress = ({
  getFile,
  updateFile,
  STATUS,
  NAME_FILE,
}) => async ({ restArgv }) => {
  if (!restArgv.length) {
    console.log('Please provide a task id')

    return
  }

  const id = Number(restArgv[0])

  const tasks = await getFile(NAME_FILE)

  await updateFile(
    NAME_FILE,
    tasks.map((task) => {
      if (task.id === id) {
        return { ...task, status: STATUS.IN_PROGRESS }
      }

      return task
    }),
  )
}
