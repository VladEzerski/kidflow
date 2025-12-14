import { useContext } from 'react'

import { AddActionContext } from './AddActionContext'

export const useAddAction = () => {
  const ctx = useContext(AddActionContext)
  if (!ctx) throw new Error('useAddAction must be used inside AddActionProvider')
  return ctx
}
