import React from "react"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import TodolistTitle from "./TodolistTitle/TodolistTitle"
import { Tasks } from "./Tasks/Tasks"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { addTaskTC } from "../../../model/tasks-reducer"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { DomainTodolist } from "../../../model/todolists-reducer"

type PropsType = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: PropsType) => {
  const dispatch = useAppDispatch()

  const addTaskCallback = (title: string) => {
    dispatch(addTaskTC({ title, todolistId: todolist.id }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
}
