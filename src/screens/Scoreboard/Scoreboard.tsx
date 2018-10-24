import React, {Component} from 'react'
import {View, Text} from 'react-native'

export default class Scoreboard extends Component<any, any> {
  static navigationOptions = {
    title: 'Scoreboard'
  }

  render () {
    return (
      <View>
        <Text>Scoreboard</Text>
      </View>
    )
  }
}
