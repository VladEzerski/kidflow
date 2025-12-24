import { useCallback, useMemo, useRef, useState } from 'react'
import { View, TextInput as RNTextInput } from 'react-native'
import { Button, HelperText, Text, TextInput } from 'react-native-paper'

import { useKidsStore } from '@/features/kids/store/kidsStore'
import { useVaccinationStore } from '@/features/vaccinations/store/vaccinationsStore'
import { getDb } from '@/db'
import { vaccinationsRepo } from '@/db/repositories/vaccinationsRepo'
import { VACCINATION_STATUS } from '@/types'
import { newId } from '@/utils/newId'
import { DatePickerField } from '@/components/DatePicker/DatePickerField'

import { toISODate } from '@/utils/date'

type AddVaccinationSheetContentProps = {
  onClose: () => void
}

function isISODateOnly(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

export const AddVaccinationSheetContent = ({ onClose }: AddVaccinationSheetContentProps) => {
  const activeKidId = useKidsStore(s => s.activeKidId)
  const activeKid = useKidsStore(s => s.kids.find(k => k.id === s.activeKidId) ?? null)

  const loadByKid = useVaccinationStore(s => s.loadByKid)

  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const notesRef = useRef<RNTextInput>(null)

  const minDate = activeKid?.birthDate ? new Date(activeKid.birthDate) : new Date()
  const today = useMemo(() => toISODate(new Date()), [])
  const [dueDate, setDueDate] = useState(today)

  const canSubmit = useMemo(() => {
    if (!activeKidId) return false
    if (!title.trim()) return false
    if (!isISODateOnly(dueDate.trim())) return false
    return true
  }, [activeKidId, title, dueDate])

  const clearForm = useCallback(() => {
    setTitle('')
    setNotes('')
    setDueDate(today)
  }, [today])

  const handleSubmit = useCallback(async () => {
    if (!activeKidId) {
      setError('No active kid selected.')
      return
    }
    if (!canSubmit) {
      setError('Please fill Title and Due date (YYYY-MM-DD).')
      return
    }

    try {
      setSubmitting(true)
      setError(null)

      const db = await getDb()
      const id = newId()

      await vaccinationsRepo.upsert(db, {
        id,
        kidId: activeKidId,
        title: title.trim(),
        dueDate: dueDate.trim(),
        status: VACCINATION_STATUS.SCHEDULED,
        notes: notes.trim() ? notes.trim() : null,
        completedAt: null,
      })

      await loadByKid(activeKidId)
      clearForm()
      onClose()
    } catch (e) {
      console.error(e)
      setError('Failed to save vaccination.')
    } finally {
      setSubmitting(false)
    }
  }, [activeKidId, canSubmit, dueDate, loadByKid, notes, onClose, title, clearForm])

  return (
    <View style={{ gap: 12 }}>
      <Text variant="titleMedium">New vaccination</Text>

      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        returnKeyType="next"
        disabled={submitting}
        onSubmitEditing={() => notesRef.current?.focus()}
      />

      <DatePickerField
        label="Due Date"
        value={dueDate}
        onChange={setDueDate}
        minimumDate={minDate}
      />

      <TextInput
        ref={notesRef}
        label="Notes (optional)"
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={4}
        disabled={submitting}
        submitBehavior="blurAndSubmit"
      />

      {error ? (
        <HelperText type="error" visible>
          {error}
        </HelperText>
      ) : null}

      <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'flex-end' }}>
        <Button mode="text" onPress={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={submitting}
          disabled={!canSubmit || submitting}
        >
          Save
        </Button>
      </View>
    </View>
  )
}
