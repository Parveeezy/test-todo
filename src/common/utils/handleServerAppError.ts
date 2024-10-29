import { BaseResponse } from "common/types"
import { Dispatch } from "redux"
import { appActions } from "app/app-reducer"

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(appActions.appError({ error: data.messages[0] }))
  } else {
    dispatch(appActions.appError({ error: "Some error occurred" }))
  }
  dispatch(appActions.appStatus({ status: "failed" }))
}
