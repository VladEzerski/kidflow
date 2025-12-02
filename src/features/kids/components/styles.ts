import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  cardActive: {
    borderWidth: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  secondary: {
    opacity: 0.7,
  },
  activeLabel: {
    marginTop: 4,
  },
})
