export type ThemeMode = "dark" | "light"
type InitialState = typeof initialState
export type ChangeThemeActionType = ReturnType<typeof changeThemeAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
type ActionsType = ChangeThemeActionType | SetAppStatusActionType

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

const initialState = {
  themeMode: "dark" as ThemeMode,
  status: "idle" as RequestStatus,
}

export const appReducer = (state: InitialState = initialState, action: ActionsType) => {
  switch (action.type) {
    case "APP-THEME": {
      return { ...state, themeMode: action.themeMode }
    }
    case "SET_STATUS":
      return { ...state, status: action.payload.status }
    default:
      return state
  }
}

export const changeThemeAC = (themeMode: ThemeMode) => {
  return { type: "APP-THEME", themeMode } as const
}

export const setAppStatusAC = (status: RequestStatus) => {
  return {
    type: "SET_STATUS",
    payload: { status },
  } as const
}
