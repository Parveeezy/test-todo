import { createTheme } from "@mui/material"
import { ThemeMode } from "../../app/app-reducer"

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
      primary: {
        main: "#d98304",
      },
    },
  })
}
