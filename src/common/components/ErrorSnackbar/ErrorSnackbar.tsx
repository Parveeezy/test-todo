import { SyntheticEvent } from "react"
import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectError } from "../../../app/appErrorSelect"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { appActions } from "app/app-reducer"

export const ErrorSnackbar = () => {
  const error = useAppSelector(selectError)
  const dispatch = useAppDispatch()

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    dispatch(appActions.appError({ error: null }))
  }

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
        Error message
      </Alert>
    </Snackbar>
  )
}
