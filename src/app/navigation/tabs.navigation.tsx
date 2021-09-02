import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { MyBalance, Movements } from '@screens/index';
import useConfigTheme from '@hooks/useConfigTheme';
import {RootStackParamList} from './stack.navigation';

const Tab = createBottomTabNavigator<RootStackParamList>();

function TabsNavigation() {
  const { configTheme } = useConfigTheme();

  return (
    <Tab.Navigator
      initialRouteName='MyBalance'
      tabBarOptions={{
        activeTintColor: configTheme.primary,
        inactiveTintColor: configTheme.tabSecondary,
        labelStyle: { fontSize: 12.5 },
      }}
    >
      <Tab.Screen 
        name="MyBalance" 
        component={MyBalance} 
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome name="bitcoin" color={color} size={size} />,
          title: 'My Balance'
        }}
      />
      <Tab.Screen 
        name="Movements" 
        component={Movements} 
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="list-alt" color={color} size={size} />
        }} 
      />
    </Tab.Navigator>
  );
}

export default TabsNavigation;
