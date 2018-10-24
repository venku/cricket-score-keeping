import { createStackNavigator } from 'react-navigation'
import Dashboard from './Dashboard'
import Scoreboard from './Scoreboard'
import MatchSummary from './MatchSummary'
import Fixtures from './Fixtures'
import AddFixture from './AddFixture'
import {dark10} from '@variables/colors'
import headerStyle from '@styles/header'

export default createStackNavigator({
  Dashboard,
  Scoreboard,
  MatchSummary,
  Fixtures,
  AddFixture
}, {
  initialRouteName: 'Dashboard',
  navigationOptions: {
    headerStyle: headerStyle.backgroundColor,
    headerTintColor: dark10,
    headerTitleStyle: headerStyle.headerTitle
  }
})
