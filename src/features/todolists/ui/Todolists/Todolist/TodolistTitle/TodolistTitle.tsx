import React from "react"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { DomainTodolist, removeTodolistTC, updateTodolistTitleTC } from "../../../../model/todolists-reducer"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectAppStatus } from "../../../../../../app/appStatusSelect"

type TodolistTitleProps = {
  todolist: DomainTodolist
}

const TodolistTitle = ({ todolist }: TodolistTitleProps) => {
  const dispatch = useAppDispatch()
  const entityStatus = useAppSelector(selectAppStatus)

  const { id, title } = todolist

  const removeTodolist = (todolistId: string) => {
    dispatch(removeTodolistTC(todolistId))
  }

  const updateTodolist = (todolistId: string, title: string) => {
    dispatch(updateTodolistTitleTC({ id: todolistId, title: title }))
  }

  const removeTodolistHandler = () => {
    removeTodolist(id)
  }

  const updateTodolistHandler = (title: string) => {
    updateTodolist(id, title)
  }

  return (
    <div className={"todolist-title-container"}>
      <h3>
        <EditableSpan value={title} onChange={updateTodolistHandler} />
      </h3>
      <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}

export default TodolistTitle
