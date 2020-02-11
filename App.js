import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import ListScreen from './src/screens/ListScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    List: ListScreen,
    Login: LoginScreen,
    Signup: SignupScreen
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      title: 'Yolked'
    }
  }
);

export default createAppContainer(navigator);
