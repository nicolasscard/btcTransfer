import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import TabsNavigation from './tabs.navigation';
import {Movement} from '@reducers/movement/model';
import { Login, NewMovement, Splash, MovementDetail } from '@screens/index';

/**
 * Specifying route params. 
 */
 export type RootStackParamList = {
  Login: undefined
  Tabs: undefined
  MyBalance: undefined
  Movements: undefined
  NewMovement: undefined
  MovementDetail: {movementId: number}
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
      screenOptions={() => ({ headerShown: false })}
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
