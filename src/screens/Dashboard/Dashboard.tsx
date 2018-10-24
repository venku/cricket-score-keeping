import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {secondary} from '@variables/colors'
import headerStyles from '@styles/header'
import Calendar from '@components/organisms/Calendar'
import { NavigationTransitionProps } from "react-navigation"

export default class Dashboard extends React.Component {
  static navigationOptions = ({navigation}: NavigationTransitionProps) => ({
    title: 'Dashboard',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('AddFixture')}>
        <View style={headerStyles.headerIcon}>
          <Icon size={40} name='ios-add' color={secondary} />
        </View>
      </TouchableOpacity>
    )
  })

  render() {
    return (
      <View style={styles.content}>
        <Calendar />
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
