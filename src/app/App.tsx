import React, { useEffect } from "react"
import { ThemeProvider } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme } from "common/theme/theme"
import Main from "./Main"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectThemeMode } from "./appSelectors"
import { ErrorSnackbar, Header } from "common/components"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { fetchTodolistsThunk } from "../features/todolists/model/todolists-reducer"
import { DomainTask } from "../features/todolists/api/tasksApi.types"

export type FilterValuesType = "all" | "active" | "completed"

export type TasksStateType = {
  [key: string]: DomainTask[]
}

export function App() {
  const themeMode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsThunk)
  }, [])

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Main />
      <ErrorSnackbar />
    </ThemeProvider>
  )
}
