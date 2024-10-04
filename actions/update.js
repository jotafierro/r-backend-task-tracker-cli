export const update = ({
  getFile,
  updateFile,
  NAME_FILE,
}) => async ({ restArgv }) => {
  if (!restArgv?.length) {
    console.log('Please, enter the task ID')

    return
  }

  const id = Number(restArgv[0])
  const newDescription = restArgv[1]

  const tasks = await getFile(NAME_FILE)

  await updateFile(
    NAME_FILE,
    tasks.map((task) => {
      if (task.id === id) {
        return { ...task, description: newDescription }
      }

      return task
    }),
  )

  return
}
