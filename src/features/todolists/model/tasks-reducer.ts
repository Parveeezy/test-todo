import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"
import { TasksStateType } from "../../../app/App"
import { tasksApi } from "../api/tasksApi"
import { Dispatch } from "redux"
import { DomainTask, UpdateTaskModel } from "../api/tasksApi.types"
import { RootState } from "../../../app/store"

export type SetTaskActionCreatorType = ReturnType<typeof setTasksAC>
export type RemoveTaskActionCreatorType = ReturnType<typeof removeTaskAC>
export type AddTaskActionCreatorType = ReturnType<typeof addTaskAC>
export type updateTaskACCreatorType = ReturnType<typeof updateTaskAC>

type ActionsType =
  | SetTaskActionCreatorType
  | RemoveTaskActionCreatorType
  | AddTaskActionCreatorType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | updateTaskACCreatorType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "SET-TASKS": {
      const stateCopy = { ...state }
      stateCopy[action.payload.todolistId] = action.payload.tasks
      return stateCopy
    }
    case "REMOVE-TASK": {
      const { todolistId, taskId } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].filter(task => task.id !== taskId),
      }
    }
    case "ADD-TASK": {
      const newTask = action.payload.task
      return { ...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]] }
    }
    case "UPDATE-TASK": {
      const { todolistId, taskId, task } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].map(t => (t.id === taskId ? { ...t, ...task } : t)),
      }
    }
    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.payload.todolist.id]: [],
      }
    }
    case "REMOVE-TODOLIST": {
      const newState = { ...state }
      delete newState[action.todolistId]
      return newState
    }
    default:
      return state
  }
}

//THUNKS
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  tasksApi.getTasks(todolistId).then(res => {
    const tasks = res.data.items
    dispatch(setTasksAC({ todolistId, tasks }))
  })
}

export const removeTaskTC = (arg: { taskId: string; todolistId: string }) => (dispatch: Dispatch) => {
  tasksApi.deleteTask(arg).then(res => {
    dispatch(removeTaskAC(arg))
  })
}

export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: Dispatch) => {
  tasksApi.createTask(arg).then(res => {
    dispatch(addTaskAC({ task: res.data.data.item }))
  })
}

export const updateTaskTC =
  (arg: { taskId: string; todolistId: string; task: UpdateTaskModel }) =>
  (dispatch: Dispatch, getState: () => RootState) => {
    const { taskId, todolistId } = arg

    const allTasksFromState = getState().tasks
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => t.id === taskId)

    if (task) {
      const model: UpdateTaskModel = {
        status: arg.task.status,
        title: arg.task.title,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
      }

      tasksApi.updateTask({ taskId, todolistId, model }).then(res => {
        dispatch(updateTaskAC({ todolistId, taskId, task: model }))
      })
    }
  }

// Action Creators
export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return {
    type: "SET-TASKS",
    payload,
  } as const
}

export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
  return { type: "REMOVE-TASK", payload } as const
}

export const addTaskAC = (payload: { task: DomainTask }) => {
  return { type: "ADD-TASK", payload } as const
}

export const updateTaskAC = (payload: { todolistId: string; taskId: string; task: UpdateTaskModel }) => {
  return { type: "UPDATE-TASK", payload } as const
}
