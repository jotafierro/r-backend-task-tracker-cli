export const list = ({
  getFile,
  STATUS,
}) => async ({ restArgv }) => {
  let todos = await getFile('todo.json')

  if (restArgv?.length > 0) {
    const availableFilters = Object.values(STATUS)

    if (!availableFilters.includes(restArgv[0]))
      return console.log(`Invalid filter "${restArgv[0]}", available filters: "${availableFilters.join(', ')}"`)

    const filter = restArgv[0]

    todos = todos.filter(
      (todo) => todo.status === filter,
    )
  }

  if (todos.length === 0) {
    console.log('Empty tasks!')

    return
  }

  todos.forEach(
    (todo) => console.log(`#${todo.id} | description: ${todo.description} | status: ${todo.status}`),
  )
}
