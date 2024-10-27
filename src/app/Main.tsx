import React from "react"
import Container from "@mui/material/Container"
import Grid2 from "@mui/material/Grid2"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import Todolists from "../features/todolists/ui/Todolists/Todolists"
import { v1 } from "uuid"
import { addTodolistTC } from "../features/todolists/model/todolists-reducer"
import { useAppDispatch } from "common/hooks/useAppDispatch"

const Main = () => {
  const dispatch = useAppDispatch()

  const addTodolist = (title: string) => {
    dispatch(addTodolistTC({ title }))
  }

  return (
    <div>
      <Container fixed>
        <Grid2 container sx={{ mb: "30px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid2>
      </Container>
      <Grid2 container spacing={4}>
        <Todolists />
      </Grid2>
    </div>
  )
}

export default Main
