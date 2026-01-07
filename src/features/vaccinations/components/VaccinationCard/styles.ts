import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  accent: {
    width: 6,
  },
  content: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    gap: 6,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    flex: 1,
  },
  chip: {
    alignSelf: 'flex-start',
  },
  notes: {
    marginTop: 2,
  },
})
