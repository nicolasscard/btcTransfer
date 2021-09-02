import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Login, NewMovement, Splash, MovementDetail } from '@screens/index';
import TabsNavigation from './tabs.navigation';
import {Movement} from '@reducers/movement/model';

/**
 * Specifying undefined means that the route doesn't have params. 
 * A union type with undefined (e.g. SomeType | undefined) means that params are optional.
 */
 export type RootStackParamList = {
  Login: undefined
  Tabs: undefined
  Home: undefined
  Movements: undefined
  NewMovement: undefined
  MovementDetail: {movement: Movement}
  Splash: undefined
};

// Creatte a generic Props for all screen
const Stack = createStackNavigator<RootStackParamList>();
let screenName: keyof RootStackParamList;

export type Props = {
  navigation: StackNavigationProp<RootStackParamList, typeof screenName>;
  route: RouteProp<RootStackParamList, typeof screenName>;
};

function StackNavigation() {

  return (
    <Stack.Navigator
      initialRouteName={'Splash'}
      screenOptions={({ navigation, route }) => ({
        headerShown: false
      })}
    >
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />     
      <Stack.Screen name="Tabs" component={TabsNavigation} />
      <Stack.Screen name="NewMovement" component={NewMovement} />
      <Stack.Screen name="Splash" component={Splash} />     
      <Stack.Screen name="MovementDetail" component={MovementDetail} />     

    </Stack.Navigator>
  );
}



export default StackNavigation;