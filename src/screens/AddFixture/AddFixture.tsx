import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux'
import headerStyles from '@styles/header'
import {secondary} from '@variables/colors'
import TextInput from '@components/molecules/TextInput'

class AddFixture extends Component<any, any> {
  static navigationOptions = ({navigation}: any) => ({
    title: 'Add Fixture',
    headerRight: (
      <TouchableOpacity onPress={() => {
        navigation.goBack()
        navigation.navigate('Fixtures')
      }}>
        <View style={headerStyles.headerIcon}>
          <Icon size={40} name='ios-checkmark' color={secondary} />
        </View>
      </TouchableOpacity>
    )
  })

  render () {
    return (
      <View>
        <TextInput name='First Team Name' fieldType='text' />
        <TextInput name='Second Team Name' fieldType='text' />
        <TextInput name='Venue' fieldType='text' />
      </View>
    )
  }
}

export default connect(() => ({}))(AddFixture)
