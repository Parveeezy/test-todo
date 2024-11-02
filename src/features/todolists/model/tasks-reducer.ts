import { TasksStateType } from "app/App"
import { tasksApi } from "../api/tasksApi"
import { Dispatch } from "redux"
import { DomainTask, UpdateTaskDomainModel, UpdateTaskModel } from "../api/tasksApi.types"
import { AppDispatch, RootState } from "app/store"
import { ResultCode } from "common/enums/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { appActions } from "app/app-reducer"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { todolistsActions } from "features/todolists/model/todolists-reducer"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"

const initialState: TasksStateType = {}

export const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // addTask: (state, action: PayloadAction<{ task: DomainTask }>) => {
    //   const tasks = state[action.payload.task.todoListId]
    //   tasks.unshift(action.payload.task)
    // },
    // updateTask: (
    //   state,
    //   action: PayloadAction<{
    //     todolistId: string
    //     taskId: string
    //     model: UpdateTaskDomainModel
    //   }>,
    // ) => {
    //   const tasks = state[action.payload.todolistId]
    //   const index = tasks.findIndex(task => task.id === action.payload.taskId)
    //   if (index !== -1) {
    //     tasks[index] = { ...tasks[index], ...action.payload.model }
    //   }
    // },
    // removeTask: (state, action: PayloadAction<{ taskId: string; todolistId: string }>) => {
    //   const tasks = state[action.payload.todolistId]
    //   const index = tasks.findIndex(task => task.id === action.payload.taskId)
    //   if (index !== -1) {
    //     tasks.splice(index, 1)
    //   }
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(todolistsActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsActions.removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(todolistsActions.setTodolists, (state, action) => {
        action.payload.todolist.forEach(tl => {
          state[tl.id] = []
        })
      })
      .addCase(fetchTasksTC.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(addTaskTC.fulfilled, (state, action) => {
        state[action.payload.todolistId].unshift(action.payload.task)
      })
      .addCase(removeTaskTC.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex(task => task.id === action.payload.taskId)
        if (index !== -1) {
          tasks.splice(index, 1)
        }
      })
      .addCase(updateTaskTC.fulfilled, (state, action) => {
        const tasks = state[action.payload.todoListId]
        const index = tasks.findIndex(task => task.id === action.payload.id)
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload }
        }
      })
  },
})

export const fetchTasksTC = createAppAsyncThunk("tasks/fetchTasks", async (todolistId: string, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(appActions.appStatus({ status: "loading" }))
    const res = await tasksApi.getTasks(todolistId)
    const tasks = res.data.items
    dispatch(appActions.appStatus({ status: "succeeded" }))
    return { tasks, todolistId }
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

export const addTaskTC = createAppAsyncThunk(
  "tasks/addTask",
  async (arg: { title: string; todolistId: string }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.appStatus({ status: "loading" }))
      const res = await tasksApi.createTask(arg)
      const task = res.data.data.item
      dispatch(appActions.appStatus({ status: "succeeded" }))
      return { task, todolistId: arg.todolistId }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = { fetchTasksTC }

//THUNKS
export const removeTaskTC = createAppAsyncThunk(
  "tasks/removeTasks",
  async (
    arg: {
      todolistId: string
      taskId: string
    },
    thunkAPI,
  ) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.appStatus({ status: "loading" }))
      const res = await tasksApi.deleteTask(arg)
      const tasks = res.data.data
      dispatch(appActions.appStatus({ status: "succeeded" }))
      return { todolistId: arg.todolistId, taskId: arg.taskId, tasks }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const updateTaskTC = createAppAsyncThunk<DomainTask, DomainTask>("tasks/updateTask", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue, getState } = thunkAPI
  try {
    dispatch(appActions.appStatus({ status: "loading" }))
    const state = getState()
    const task = state.tasks[arg.todoListId].find(t => t.id === arg.id)
    if (!task) {
      dispatch(appActions.appError({ error: "Task not found" }))
      return rejectWithValue(null)
    }

    const apiModel: UpdateTaskModel = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
    }

    const res = await tasksApi.updateTask({ todolistId: arg.todoListId, taskId: arg.id, model: apiModel })
    if (res.data.resultCode === 0) {
      dispatch(appActions.appStatus({ status: "succeeded" }))
      return arg
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})
