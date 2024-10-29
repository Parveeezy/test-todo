import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type ThemeMode = "dark" | "light"

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

const initialState = {
  themeMode: "dark" as ThemeMode,
  status: "idle" as RequestStatus,
  error: null as string | null,
}

export const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    appTheme: (state, action: PayloadAction<{ themeMode: ThemeMode }>) => {
      state.themeMode = action.payload.themeMode
    },
    appStatus: (state, action: PayloadAction<{ status: RequestStatus }>) => {
      state.status = action.payload.status
    },
    appError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions

// export const appReducer = (state: InitialState = initialState, action: ActionsType) => {
//   switch (action.type) {
//     case "APP-THEME": {
//       return { ...state, themeMode: action.themeMode }
//     }
//     case "SET_STATUS":
//       return { ...state, status: action.payload.status }
//     case "SET_ERROR":
//       return { ...state, error: action.payload.error }
//     default:
//       return state
//   }
// }

// export const changeThemeAC = (themeMode: ThemeMode) => {
//   return { type: "APP-THEME", themeMode } as const
// }
//
// export const setAppErrorAC = (error: string | null) => {
//   return {
//     type: "SET_ERROR",
//     payload: { error },
//   } as const
// }
//
// export const setAppStatusAC = (status: RequestStatus) => {
//   return {
//     type: "SET_STATUS",
//     payload: { status },
//   } as const
// }
