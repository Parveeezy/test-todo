import { Todolist } from "../api/todolistsApi.types"
import { Dispatch } from "redux"
import { todolistsApi } from "../api/todolistsApi"
import { appActions, RequestStatus } from "app/app-reducer"

export type FilterValuesType = "all" | "active" | "completed"

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

// Действия
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type ChangeTodolistEntityStatusType = ReturnType<typeof changeTodolistEntityStatusAC>

type ActionsType =
  | SetTodolistsActionType
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | ChangeTodolistEntityStatusType

const initialState: DomainTodolist[] = []

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.map(tl => ({ ...tl, filter: "all", entityStatus: "idle" }))
    }
    case "REMOVE-TODOLIST": {
      return state.filter(tl => tl.id !== action.todolistId)
    }
    case "ADD-TODOLIST": {
      const newTodolist: DomainTodolist = {
        id: action.payload.todolist.id,
        title: action.payload.todolist.title,
        filter: "all",
        addedDate: "",
        order: 0,
        entityStatus: "idle",
      }
      return [newTodolist, ...state]
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map(tl => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl))
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map(tl => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl))
    }
    case "CHANGE-TODOLIST-ENTITY-STATUS": {
      return state.map(el => (el.id === action.payload.id ? { ...el, entityStatus: action.payload.entityStatus } : el))
    }
    default:
      return state
  }
}

//THUNKS
export const fetchTodolistsThunk = () => (dispatch: Dispatch) => {
  dispatch(appActions.appStatus({ status: "loading" }))
  todolistsApi.getTodolists().then(res => {
    dispatch(appActions.appStatus({ status: "succeeded" }))
    dispatch(setTodolistsAC(res.data))
  })
}

export const addTodolistTC = (arg: { title: string }) => (dispatch: Dispatch) => {
  dispatch(appActions.appStatus({ status: "loading" }))
  const title = arg.title
  todolistsApi.createTodolist(title).then(res => {
    dispatch(addTodolistAC({ todolist: res.data.data.item }))
    dispatch(appActions.appStatus({ status: "succeeded" }))
  })
}

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
  dispatch(appActions.appStatus({ status: "loading" }))
  dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "loading" }))
  todolistsApi.deleteTodolist(id).then(res => {
    dispatch(removeTodolistAC(id))
    dispatch(appActions.appStatus({ status: "succeeded" }))
  })
}

export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: Dispatch) => {
  dispatch(appActions.appStatus({ status: "loading" }))
  todolistsApi.updateTodolist({ id: arg.id, title: arg.title }).then(res => {
    dispatch(changeTodolistTitleAC(arg))
    dispatch(appActions.appStatus({ status: "succeeded" }))
  })
}

//Action Creators
export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: "SET-TODOLISTS", todolists } as const
}

export const removeTodolistAC = (todolistId: string) => {
  return { type: "REMOVE-TODOLIST", todolistId } as const
}

export const addTodolistAC = (payload: { todolist: Todolist }) => {
  return { type: "ADD-TODOLIST", payload } as const
}

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload } as const
}

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValuesType }) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload } as const
}

export const changeTodolistEntityStatusAC = (payload: { id: string; entityStatus: RequestStatus }) => {
  return { type: "CHANGE-TODOLIST-ENTITY-STATUS", payload } as const
}
