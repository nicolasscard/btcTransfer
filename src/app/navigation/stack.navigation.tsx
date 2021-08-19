import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { CreateAccount, Terms, LinkYourBank } from '@screens/index';

/**
 * Specifying undefined means that the route doesn't have params. 
 * A union type with undefined (e.g. SomeType | undefined) means that params are optional.
 */
 type RootStackParamList = {
  CreateAccount: undefined
  Terms: undefined
  LinkYourBank: undefined
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
      initialRouteName="CreateAccount"
      screenOptions={({ navigation, route }) => ({
        headerShown: false
      })}
    >
      <Stack.Screen name="CreateAccount" component={CreateAccount} />     
      <Stack.Screen name="Terms" component={Terms} />     
      <Stack.Screen name="LinkYourBank" component={LinkYourBank} />     

    </Stack.Navigator>
  );
}

export default StackNavigation;