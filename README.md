# r-backend-task-tracker-cli

This project solves the challenge https://roadmap.sh/projects/task-tracker

> My goal is to do this using as few external libraries as possible.

# Install

Clone the project and run the following:

```
npm i -g .
````

This will globally install the `task-cli` command.

# Use

```
# Adding a new task
task-cli add "Buy groceries"
# Output: Task added successfully (ID: 1)

# Updating and deleting tasks
task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1

# Marking a task as in progress or done
task-cli mark-in-progress 1
task-cli mark-done 1

# Listing all tasks
task-cli list

# Listing tasks by status
task-cli list done
task-cli list todo
task-cli list in-progress
```
