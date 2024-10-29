import { LoginArgs } from "../api/authApi.types"
import { Dispatch } from "redux"
import { authApi } from "../api/authApi"
import { ResultCode } from "common/enums/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { appActions } from "app/app-reducer"

// type InitialStateType = typeof initialState

export type AppInitialStateType = ReturnType<typeof slice.getInitialState>

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
}

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

export const authReducer = slice.reducer
export const authActions = slice.actions

// export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//   switch (action.type) {
//     case "SET_IS_INITIALIZED": {
//       return { ...state, isInitialized: action.payload.isInitialized }
//     }
//     case "SET_IS_LOGGED_IN":
//       return { ...state, isLoggedIn: action.payload.isLoggedIn }
//     default:
//       return state
//   }
// }

// Action creators
// const setIsLoggedInAC = (isLoggedIn: boolean) => {
//   return { type: "SET_IS_LOGGED_IN", payload: { isLoggedIn } } as const
// }
//
// const setIsInitializedAC = (isInitialized: boolean) => {
//   return { type: "SET_IS_INITIALIZED", payload: { isInitialized } } as const
// }

// Actions types

// thunks
export const loginTC = (data: LoginArgs) => (dispatch: Dispatch) => {
  dispatch(appActions.appStatus({ status: "loading" }))
  authApi
    .login(data)
    .then(res => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(appActions.appStatus({ status: "succeeded" }))
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
        localStorage.setItem("sn-token", res.data.data.token)
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(appActions.appStatus({ status: "loading" }))
  authApi
    .logout()
    .then(res => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(appActions.appStatus({ status: "succeeded" }))
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))
        localStorage.removeItem("sn-token")
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
  dispatch(appActions.appStatus({ status: "loading" }))
  authApi
    .me()
    .then(res => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(appActions.appStatus({ status: "succeeded" }))
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
    .finally(() => {
      dispatch(authActions.setIsInitialized({ isInitialized: true }))
    })
}
