import React from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { MenuButton } from "common/components"
import { LinearProgress, Switch } from "@mui/material"
import { changeThemeAC, ThemeMode } from "../../../app/app-reducer"
import { RootState } from "../../../app/store"
import { getTheme } from "../../theme/theme"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"

export const Header = () => {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector<RootState, ThemeMode>(state => state.app.themeMode)
  const status = useAppSelector<RootState>(state => state.status)
  const theme = getTheme(themeMode)

  const changeModeHandler = () => {
    dispatch(changeThemeAC(themeMode === "light" ? "dark" : "light"))
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          <MenuButton>Login</MenuButton>
          <MenuButton>Logout</MenuButton>
          <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
          <Switch color={"default"} onChange={changeModeHandler} />
        </div>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
