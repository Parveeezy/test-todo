import { TaskPriority, TaskStatus } from "common/enums/enums"

export type DomainTask = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type UpdateTaskModel = {
  status: TaskStatus
  title: string
  deadline: string
  description: string
  priority: TaskPriority
  startDate: string
}

export type UpdateTaskDomainModel = {
  status?: TaskStatus
  title?: string
  deadline?: string
  description?: string
  priority?: TaskPriority
  startDate?: string
}
