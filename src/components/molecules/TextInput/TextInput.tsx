import React from 'react'
import { Component } from 'react'
import {View, TextInput, Text, StyleSheet} from 'react-native'
import baseStyle from '@styles/base'
import font from '@styles/variables/font'

export interface Props {
  name: string,
  onChange?: (text: string, name: string) => void,
  onBlur?: () => void,
  value?: string,
  isEditable?: boolean,
  fieldType?: 'text' | 'number' | 'currency' | 'email' | 'phone',
  blurOnSubmit?: boolean
}

interface State {
  text: string
}

class Input extends Component<Props, State> {
  static defaultProps = {
    isEditable: true,
    value: '',
    fieldType: 'text',
    onBlur: () => {}
  }

  constructor (props: Props) {
    super(props)
    this.state = {
      text: props.value || ''
    }
  }

  get keyboardType () {
    switch (this.props.fieldType) {
      case 'number':
        return 'number-pad'
      case 'currency':
        return 'decimal-pad'
      case 'email':
        return 'email-address'
      case 'phone':
        return 'phone-pad'
      case 'text':
      default:
        return 'default'
    }
  }

  onTextChange = (text: string) => {
    const {onChange, name = ''} = this.props
    this.setState({ text })
    onChange && onChange(text, name)
  }

  render () {
    const {name, onBlur, blurOnSubmit} = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{name}</Text>
        <TextInput
          style={styles.input}
          onChangeText={this.onTextChange}
          onBlur={onBlur}
          value={this.state.text}
          blurOnSubmit={blurOnSubmit}
          keyboardType={this.keyboardType} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8
  },
  label: {
    ...font.font,
    fontSize: font.fontSize.small
  },
  input: {
    ...font.font,
    fontSize: font.fontSize.normal
  }
})

export default Input
