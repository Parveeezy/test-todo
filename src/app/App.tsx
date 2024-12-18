import React, { useEffect } from "react"
import { CircularProgress, ThemeProvider } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme } from "common/theme/theme"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectThemeMode } from "./appSelectors"
import { ErrorSnackbar, Header } from "common/components"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { fetchTodolistsThunk } from "../features/todolists/model/todolists-reducer"
import { DomainTask } from "../features/todolists/api/tasksApi.types"
import { Outlet } from "react-router-dom"
import { initializeAppTC } from "../features/auth/model/auth-reducer"
import { selectIsInitialized } from "../features/auth/model/authSelectors"
import s from "./App.module.css"

export type FilterValuesType = "all" | "active" | "completed"

export type TasksStateType = {
  [key: string]: DomainTask[]
}

export function App() {
  const themeMode = useAppSelector(selectThemeMode)
  const isInitialized = useAppSelector(selectIsInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsThunk)
  }, [])

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      {isInitialized && (
        <>
          <Header />
          <Outlet />
        </>
      )}
      {!isInitialized && (
        <div className={s.circularProgressContainer}>
          <CircularProgress size={150} thickness={3} />
        </div>
      )}
      <ErrorSnackbar />
    </ThemeProvider>
  )
}
