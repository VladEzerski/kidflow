import { ReactNode } from 'react'

export type AddActionConfig = {
  key: string
  title?: string
  render: () => ReactNode
}
