# r-backend-task-tracker-cli

This project solves the challenge https://roadmap.sh/projects/task-tracker

> My goal is to do this using as few external libraries as possible.

# Install

Clone the project and run the following:

```
npm i -g .
````

This will globally install the `task-tracker-cli` command.

# Use

To run the help

```
task-tracker-cli help
```

add new task

````
task-tracker-cli add "description task"
```

list all task

```
task-tracker-cli list
# filter by status
task-tracker-cli list todo
task-tracker-cli list in-progress
task-tracker-cli list done
```
