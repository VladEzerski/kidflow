import { Kid } from '@/types'
import { KidRow } from '../repositories/kidsRepo'

export const kidRowToModel = (row: KidRow): Kid => ({
  id: row.id,
  name: row.name,
  birthDate: row.birthDate,
  avatarColor: row.avatarColor,
})

export const kidModelToRow = (kid: Kid): Omit<KidRow, 'createdAt' | 'updatedAt'> => ({
  id: kid.id,
  name: kid.name,
  birthDate: kid.birthDate,
  avatarColor: kid.avatarColor,
})
