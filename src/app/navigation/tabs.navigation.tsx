import React from 'react';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Home, Movements } from '@screens/index';
import useConfigTheme from '@hooks/useConfigTheme';
// import MovementNavigation from './movement.navigation';
// import HomeNavigation from './home.navigation';

import {RootStackParamList} from './stack.navigation';

/**
 * Specifying undefined means that the route doesn't have params. 
 * A union type with undefined (e.g. SomeType | undefined) means that params are optional.
 */
 export type RootTabParamList = {
  Home: undefined
  // Login: undefined
  Movements: undefined
};


// Creatte a generic Props for all screen
const Tab = createBottomTabNavigator<RootStackParamList>();

let screenName: keyof RootStackParamList;


function TabsNavigation() {
  const { configTheme } = useConfigTheme();

  // console.log('TabsNavigator >> props')
  // console.log(props.route)



  return (
    <Tab.Navigator
      initialRouteName='Home'
      tabBarOptions={{
        activeTintColor: configTheme.primary,
        inactiveTintColor: configTheme.tabSecondary,
        labelStyle: { fontSize: 12.5 },
      }}
      defaultScreenOptions={{ }}
      screenOptions={{ }}    
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-home-outline" color={color} size={size} />
          ),
          title: 'Home'
        }}
      />
      <Tab.Screen 
        name="Movements" 
        component={Movements} 
        options={{
          tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="list-alt" color={color} size={size} />
        )
        }} 
      />
      {/* // >
      //   {(props) => {
      //     return (
      //       <MovementNavigation {...props} />
      //     )
      //   }}
      // </Tab.Screen> */}
    </Tab.Navigator>
  );
}


export default TabsNavigation;
