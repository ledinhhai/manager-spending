import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import React,{ Component} from 'react';
import DoashboardScreen from '../screens/DoashboardScreen';
import LoginScreen from '../screens/LoginScreen'
import { connect } from 'react-redux'

export const Navigator = createSwitchNavigator({
  Login: {
    screen: LoginScreen
  },
  Dashboard: {
    screen: DoashboardScreen
  }
})
const Navigation = createAppContainer(Navigator);
// export default Navigation;

// class Navigation extends Component {
//   render() {
//       return(
//           <Navigator/>
//       )
//   }
// }

const mapStateToProps = (state) => {
  return ({
      navigationState: state.NavigationReducer // NavigationReducer contains the navigation state of the app
  })
}


export default connect(mapStateToProps)(Navigation)