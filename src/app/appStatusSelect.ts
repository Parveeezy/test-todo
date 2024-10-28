import { RootState } from "./store"

export const selectAppStatus = (state: RootState) => state.app?.status
