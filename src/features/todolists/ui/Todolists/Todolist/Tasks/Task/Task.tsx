import { removeTaskTC, updateTaskTC } from "../../../../../model/tasks-reducer"
import { ChangeEvent } from "react"
import { Checkbox, ListItem } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { getListItemSx } from "./Task.styles"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { EditableSpan } from "common/components"
import { TaskStatus } from "common/enums/enums"
import { DomainTask } from "../../../../../api/tasksApi.types"
import { DomainTodolist } from "../../../../../model/todolists-reducer"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Task = ({ task, todolist }: Props) => {
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(removeTaskTC({ taskId: task.id, todolistId: todolist.id }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

    const newTaskStatus = { ...task, status }
    dispatch(updateTaskTC({ id: task.id, todoListId: task.todoListId }))
  }

  const changeTaskTitleHandler = (title: string) => {
    const newTaskTitle = { ...task, title }
    dispatch(updateTaskTC({ todoListId: task.todoListId, id: task.id, task: newTaskTitle }))
  }

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatusHandler} />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      </div>
      <IconButton onClick={removeTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
