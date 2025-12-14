import { createContext } from 'react'

import { AddActionConfig } from './types'

type AddActionContextValue = {
  register: (config: AddActionConfig) => () => void
  open: () => void
  close: () => void
  hasAction: boolean
}

export const AddActionContext = createContext<AddActionContextValue | null>(null)
