import React from "react"
import Container from "@mui/material/Container"
import Grid2 from "@mui/material/Grid2"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import Todolists from "../features/todolists/ui/Todolists/Todolists"
import { addTodolistTC } from "../features/todolists/model/todolists-reducer"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { Navigate } from "react-router-dom"
import { Path } from "common/router"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectIsLoggedIn } from "../features/auth/model/authSelectors"

const Main = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const addTodolist = (title: string) => {
    dispatch(addTodolistTC({ title }))
  }

  if (!isLoggedIn) {
    return <Navigate to={Path.Login} />
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
