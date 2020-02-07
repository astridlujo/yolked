import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

const navigator = createStackNavigator(
  {
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
