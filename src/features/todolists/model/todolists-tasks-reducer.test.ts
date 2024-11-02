import { tasksReducer } from "./tasks-reducer"
// import { addTodolistAC, todolistsReducer } from "./todolists-reducer"
import { v1 } from "uuid"

// test("ids should be equals", () => {
//   const startTasksState: TasksStateType = {}
//   const startTodolistsState: TodolistType[] = []
//
//   const todolistId = v1()
//
//   const action = addTodolistAC({ todolistId, title: "new todolist" })
//
//   const endTasksState = tasksReducer(startTasksState, action)
//   const endTodolistsState = todolistsReducer(startTodolistsState, action)
//
//   const keys = Object.keys(endTasksState)
//   const idFromTasks = keys[0]
//   const idFromTodolists = endTodolistsState[0].id
//
//   expect(idFromTasks).toBe(action.payload.todolistId)
//   expect(idFromTodolists).toBe(action.payload.todolistId)
// })
