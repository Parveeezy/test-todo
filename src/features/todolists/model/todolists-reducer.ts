import { Todolist } from "../api/todolistsApi.types"
import { Dispatch } from "redux"
import { todolistsApi } from "../api/todolistsApi"
import { appActions, RequestStatus } from "app/app-reducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchTasksTC } from "features/todolists/model/tasks-reducer"

export type FilterValuesType = "all" | "active" | "completed"

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

// Действия

const initialState: DomainTodolist[] = []

export const slice = createSlice({
  name: "todolist",
  initialState,
  reducers: {
    setTodolists: (state, action: PayloadAction<{ todolist: Todolist[] }>) => {
      return action.payload.todolist.map(tl => ({ ...tl, filter: "all", entityStatus: "idle" }))
    },
    removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex(todo => todo.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const newTodolist = state.find(el => el.id === action.payload.id)
      if (newTodolist) {
        newTodolist.filter = action.payload.filter
      }
    },
    addTodolist: (state, action: PayloadAction<{ todolist: Todolist }>) => {
      const newTodolist: DomainTodolist = { ...action.payload.todolist, filter: "all", entityStatus: "idle" }
      state.unshift(newTodolist)
    },
    changeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const newTodolist = state.find(el => el.id === action.payload.id)
      if (newTodolist) {
        newTodolist.title = action.payload.title
      }
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatus }>) => {
      const newTodolist = state.find(el => el.id === action.payload.id)
      if (newTodolist) {
        newTodolist.entityStatus = action.payload.entityStatus
      }
    },
  },
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions

//THUNKS
export const fetchTodolistsThunk = () => (dispatch: Dispatch) => {
  dispatch(appActions.appStatus({ status: "loading" }))
  todolistsApi.getTodolists().then(res => {
    dispatch(appActions.appStatus({ status: "succeeded" }))
    dispatch(todolistsActions.setTodolists({ todolist: res.data }))
  })
}

export const addTodolistTC = (arg: { title: string }) => (dispatch: Dispatch) => {
  dispatch(appActions.appStatus({ status: "loading" }))
  const title = arg.title
  todolistsApi.createTodolist(title).then(res => {
    dispatch(todolistsActions.addTodolist({ todolist: res.data.data.item }))
    dispatch(appActions.appStatus({ status: "succeeded" }))
  })
}

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
  dispatch(appActions.appStatus({ status: "loading" }))
  dispatch(todolistsActions.changeTodolistEntityStatus({ id, entityStatus: "loading" }))
  todolistsApi.deleteTodolist(id).then(res => {
    dispatch(todolistsActions.removeTodolist({ id }))
    dispatch(appActions.appStatus({ status: "succeeded" }))
  })
}

export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: Dispatch) => {
  dispatch(appActions.appStatus({ status: "loading" }))
  todolistsApi.updateTodolist({ id: arg.id, title: arg.title }).then(res => {
    dispatch(todolistsActions.changeTodolistTitle(arg))
    dispatch(appActions.appStatus({ status: "succeeded" }))
  })
}
