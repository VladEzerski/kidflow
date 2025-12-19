import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { useMemo, useState } from 'react'
import { Platform, Pressable, View } from 'react-native'
import { TextInput } from 'react-native-paper'

import { fromISODate, formatHumanDate, toISODate } from '@/utils/date'

type DatePickerFieldProps = {
  label: string
  value: string
  onChange: (nextIsoDate: string) => void
  minimumDate?: Date
  maximumDate?: Date
}

export const DatePickerField = ({
  label,
  value,
  onChange,
  minimumDate,
  maximumDate,
}: DatePickerFieldProps) => {
  const [open, setOpen] = useState(false)

  const date = useMemo(() => fromISODate(value), [value])
  const displayValue = useMemo(() => formatHumanDate(value), [value])

  function handleChange(e: DateTimePickerEvent, selected?: Date) {
    if (Platform.OS === 'android') setOpen(false)
    if (!selected) return
    onChange(toISODate(selected))
  }

  return (
    <View>
      <Pressable onPress={() => setOpen(true)}>
        <TextInput
          label={label}
          value={displayValue}
          editable={false}
          right={<TextInput.Icon icon="calendar" />}
          pointerEvents="none"
        />
      </Pressable>

      {open && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  )
}
