import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import TextField from "@mui/material/TextField"
import AddBoxIcon from "@mui/icons-material/AddBox"
import IconButton from "@mui/material/IconButton"
import { v1 } from "uuid"
import { addTodolistAC } from "../../../features/todolists/model/todolists-reducer"

type PropsType = {
  addItem: (title: string) => void
}

export const AddItemForm = ({ addItem }: PropsType) => {
  const [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const addItemHandler = () => {
    if (title.trim() !== "") {
      addItem(title.trim())
      setTitle("")
    } else {
      setError("Title is required")
    }
  }

  const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (event.key === "Enter") {
      addItemHandler()
    }
  }

  return (
    <div>
      <TextField
        label="Enter a title"
        variant={"outlined"}
        value={title}
        size={"small"}
        error={!!error}
        helperText={error}
        onChange={changeItemHandler}
        onKeyUp={addItemOnKeyUpHandler}
        sx={{ mt: "30px" }}
      />
      <IconButton onClick={addItemHandler} color={"primary"} sx={{ mt: "30px" }}>
        <AddBoxIcon />
      </IconButton>
    </div>
  )
}
