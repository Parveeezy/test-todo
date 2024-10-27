import React, { useEffect } from "react"
import Grid2 from "@mui/material/Grid2"
import { Paper } from "@mui/material"
import { Todolist } from "./Todolist/Todolist"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectTodolists } from "../../model/todolistsSelectors"
import { selectTasks } from "../../model/tasksSelectors"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { fetchTodolistsThunk } from "../../model/todolists-reducer"

const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsThunk())
  }, [])

  return (
    <Grid2 container spacing={4} sx={{ ml: "50px", mt: "50px" }}>
      {todolists?.map((tl: any) => {
        const allTodolistTasks = tasks[tl.id]
        let tasksForTodolist = allTodolistTasks
        if (tl.filter === "active") {
          tasksForTodolist = allTodolistTasks.filter(task => !task.status)
        }
        if (tl.filter === "completed") {
          tasksForTodolist = allTodolistTasks.filter(task => task.status)
        }
        return (
          <Grid2 key={tl.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <Todolist key={tl.id} todolist={tl} />
            </Paper>
          </Grid2>
        )
      })}
    </Grid2>
  )
}

export default Todolists
