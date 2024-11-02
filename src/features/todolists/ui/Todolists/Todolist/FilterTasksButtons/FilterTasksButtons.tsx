import React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { FilterValuesType } from "app/App"
import { DomainTodolist, todolistsActions } from "../../../../model/todolists-reducer"
import { filterButtonsContainerSx } from "./FilterTasksButtons.styles"
import { useAppDispatch } from "common/hooks/useAppDispatch"

type FilterTasksPropsType = {
  todolist: DomainTodolist
}

export const FilterTasksButtons = ({ todolist }: FilterTasksPropsType) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    dispatch(todolistsActions.changeTodolistFilter({ id, filter }))
  }

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        variant={filter === "all" ? "outlined" : "text"}
        color={"inherit"}
        onClick={() => changeFilterTasksHandler("all")}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        color={"primary"}
        onClick={() => changeFilterTasksHandler("active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        color={"secondary"}
        onClick={() => changeFilterTasksHandler("completed")}
      >
        Completed
      </Button>
    </Box>
  )
}
