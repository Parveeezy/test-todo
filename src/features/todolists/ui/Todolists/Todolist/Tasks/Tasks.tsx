import { List } from "@mui/material"
import { Task } from "./Task/Task"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectTasks } from "../../../../model/tasksSelectors"
import { TaskStatus } from "common/enums/enums"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useEffect } from "react"
import { fetchTasksTC } from "../../../../model/tasks-reducer"
import { DomainTodolist } from "../../../../model/todolists-reducer"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id))
  }, [dispatch])

  const allTodolistTasks = tasks[todolist.id]

  let tasksForTodolist = allTodolistTasks

  if (todolist.filter === "active") {
    tasksForTodolist = allTodolistTasks.filter(task => task.status === TaskStatus.New)
  }

  if (todolist.filter === "completed") {
    tasksForTodolist = allTodolistTasks.filter(task => task.status === TaskStatus.Completed)
  }

  return (
    <>
      {tasksForTodolist && tasksForTodolist?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist?.map(task => {
            return <Task key={task.id} task={task} todolist={todolist} />
          })}
        </List>
      )}
    </>
  )
}
