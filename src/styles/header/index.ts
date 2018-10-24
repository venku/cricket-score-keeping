import {StyleSheet, TextStyle} from 'react-native'
import {white} from '@variables/colors'
import font from '@variables/font'

export default StyleSheet.create({
  backgroundColor: {
    backgroundColor: white
  },
  headerIcon: {
    paddingHorizontal: 8,
    marginRight: 8
  },
  headerTitle: {
    ...font.headerFont
  } as TextStyle
})
