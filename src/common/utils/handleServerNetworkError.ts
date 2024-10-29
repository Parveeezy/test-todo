import { Dispatch } from "redux"
import { appActions } from "../../app/app-reducer"

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(appActions.appError({ error: error.message }))
  dispatch(appActions.appStatus({ status: "failed" }))
}
