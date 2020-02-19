import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import ListScreen from './src/screens/ListScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import TestScreen from './src/screens/TestScreen';
import FoodScreen from './src/screens/FoodScreen';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    List: ListScreen,
    Login: LoginScreen,
    Signup: SignupScreen,
    Test: TestScreen,
    Food: FoodScreen
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      title: 'Yolked',
      headerShown: false
    }
  }
);

export default createAppContainer(navigator);
