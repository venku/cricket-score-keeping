import React from 'react'
import {Component} from 'react'
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import baseStyle from '@styles/base'
import font from '@styles/variables/font'
import {primary, secondary, disabled, white, primaryHover} from '@variables/colors'

const MONTHS = [ 'January', 'February', 'March', 'April', 'May',
  'June', 'July', 'August', 'September', 'October', 'November', 'December' ]

export interface Props {
  width?: number,
  selectedDate: Date,
  onDateSelected?: () => void,
  autoSave?: boolean,
  onChange?: (selectedDate: Date) => void,
  onCancel?: () => void
}

interface State {
  selectedDate: Date,
  currentDate: Date
}

class Calendar extends Component<Props, State> {
  static defaultProps = {
    width: 250,
    selectedDate: new Date(),
    autoSave: false
  }
  
  constructor (props: Props) {
    super(props)
    
    this.state = {
      selectedDate: props.selectedDate,
      currentDate: props.selectedDate
    }
  }

  navigateMonth (movement: number) {
    const currentDate = new Date(this.state.currentDate.getTime())
    currentDate.setMonth(currentDate.getMonth() + movement)
    this.setState({
      currentDate 
    })
  }

  selectDate (date: number) {
    const selectedDate = new Date(this.state.currentDate.getTime())
    selectedDate.setDate(date)
    this.setState({ selectedDate })
    const {autoSave, onChange} = this.props
    if (autoSave) {
      onChange && onChange(selectedDate)
    }
  }

  onSave = () => {
    const {onChange} = this.props
    onChange && onChange(this.state.selectedDate)
  }

  onCancel = () => {
    const {onCancel} = this.props
    onCancel && onCancel()
  }

  renderControlBar () {
    return (
      <View style={[baseStyle.row, styles.controlRow]}>
        <TouchableHighlight
          underlayColor={disabled}
          onPress={this.onCancel}>
          <Text style={styles.headerButton}>Cancel</Text>
        </TouchableHighlight>
        <View style={styles.headerItem} />
        <TouchableHighlight
          underlayColor={disabled}
          onPress={this.onSave}>
          <Text style={styles.headerButton}>Done</Text>
        </TouchableHighlight>
      </View>
    )
  }

  renderHeaderRow () {
    return (
      <View style={[baseStyle.row, styles.headerRow]}>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>M</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>T</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>W</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>T</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>F</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>S</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>S</Text>
        </View>
      </View>
    )
  }

  renderMonthTitle () {
    const startDay = new Date(this.state.currentDate.getTime())
    return (
      <View style={[baseStyle.row, styles.controlRow]}>
        <TouchableHighlight
          style={styles.headerIcon}
          underlayColor={disabled}
          onPress={() => { this.navigateMonth(-1) }}>
          <Icon name='ios-arrow-back' size={30} />
        </TouchableHighlight>
        <View style={styles.headerItem}>
          <Text style={styles.monthTitle}>{`${MONTHS[startDay.getMonth()]} ${startDay.getFullYear()}`}</Text>
        </View>
        <TouchableHighlight
          style={styles.headerIcon}
          underlayColor={disabled}
          onPress={() => { this.navigateMonth(1) }}>
          <Icon name='ios-arrow-forward' size={30} />
        </TouchableHighlight>
      </View>
    )
  }

  renderDays () {
    const startDay = new Date(this.state.currentDate.getTime())
    const selectedDate = new Date(this.state.selectedDate.getTime())
    startDay.setDate(1)
    const monthDisplayed = startDay.getMonth()
    const spacersToAdd = startDay.getDay() === 0 ? 7 : startDay.getDay()
    let weeks = []
    let rowItems = []
    let i = 1
    for (i; i < spacersToAdd; i++) {
      rowItems.push(<View style={styles.rowItem} key={i} />)
    }
    i = rowItems.length
    while (startDay.getMonth() === monthDisplayed) {
      const dayDate = startDay.getDate()
      const isSelected = selectedDate.toJSON() === startDay.toJSON()
      rowItems.push(
        <TouchableHighlight
          style={[styles.rowItem, isSelected && styles.selected]}
          underlayColor={primaryHover}
          onPress={() => { this.selectDate(dayDate) }}
          key={i + dayDate}>
          <Text style={[styles.dateText, isSelected && styles.selectedText]}>{dayDate}</Text>
        </TouchableHighlight>
      )
      if (rowItems.length === 7) {
        weeks.push(
          <View style={[baseStyle.row, styles.week]} key={`week-row-${weeks.length}`}>{rowItems}</View>
        )
        rowItems = []
      }
      startDay.setDate(dayDate + 1)
    }
    if (rowItems.length > 0) {
      i = weeks.length * 7 + 1
      for (let j = rowItems.length; j < 7; j++) {
        rowItems.push(<View style={styles.rowItem} key={i + j } />)
      }
      weeks.push(
        <View style={[baseStyle.row, styles.week]} key={`week-row-${weeks.length}`}>{rowItems}</View>
      )
    }
    return weeks
  }

  render () {
    const {width, autoSave} = this.props
    return (
      <View style={[{width}, styles.container]}>
        {!autoSave && this.renderControlBar()}
        {this.renderMonthTitle()}
        {this.renderHeaderRow()}
        {this.renderDays()}
      </View>
    )
  }
}

export default Calendar

const styles = StyleSheet.create({
  container: {
    minWidth: 250,
    minHeight: 200,
    backgroundColor: white,
    paddingBottom: 8
  },
  controlRow: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: disabled,
    marginBottom: 8
  },
  headerRow: {
    height: 30,
    marginBottom: 8
  },
  headerItem: {
    flex: 1
  },
  headerIcon: {
    paddingHorizontal: 8
  },
  headerText: {
    ...font.boldFont,
    fontSize: font.fontSize.medium,
    textAlign: 'center'
  },
  monthTitle: {
    ...font.boldFont,
    fontSize: font.fontSize.medium,
    textAlign: 'center'
  },
  headerButton: {
    ...font.boldFont,
    fontSize: font.fontSize.small,
    color: secondary
  },
  rowItem: {
    flex: 1,
    paddingVertical: 6
  },
  week: {
    paddingVertical: 0
  },
  dateText: {
    ...font.font,
    fontSize: font.fontSize.normal,
    textAlign: 'center'
  },
  selected: {
    backgroundColor: primary,
    borderRadius: 25
  },
  selectedText: {
    color: white
  }
})
