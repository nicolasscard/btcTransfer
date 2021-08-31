import React from 'react';
import { View, Text, ImageSourcePropType, Image, Platform } from 'react-native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Login, Movements, NewMovement } from '@screens/index';

import { connect, ConnectedProps } from 'react-redux';

import TabsNavigation from './tabs.navigation';
import MovementNavigation from './movement.navigation';

import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import useConfigTheme from '@hooks/useConfigTheme';

/**
 * Specifying undefined means that the route doesn't have params. 
 * A union type with undefined (e.g. SomeType | undefined) means that params are optional.
 */
 export type RootStackParamList = {
  Login: undefined
  Tabs: undefined
  Home: undefined
  Movement: {type: string} | undefined
  Movements: undefined
  NewMovement: undefined
};

// Creatte a generic Props for all screen
const Stack = createStackNavigator<RootStackParamList>();
let screenName: keyof RootStackParamList;

export type Props = {
  navigation: StackNavigationProp<RootStackParamList, typeof screenName>;
  route: RouteProp<RootStackParamList, typeof screenName>;
};

const mapStateToProps = (state: any) => {
  return {
    loggedUser: state.user.loggedUser,
    error: state.user.userError,
    success: state.user.success
  };
};

const mapDispatchToProps = (dispatch: any) => ({
});


const connector = connect(mapStateToProps, mapDispatchToProps);
type reduxProps = ConnectedProps<typeof connector>;

function RootNavigation(props: reduxProps & Props) {
  // const { configTheme } = useConfigTheme();

  // function getHeaderTitle(route: any) {
  //   // If the focused route is not found, we need to assume it's the initial screen
  //   // This can happen during if there hasn't been any navigation inside the screen
  //   // In our case, it's "Feed" as that's the first screen inside the navigator
  //   const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  
  //   switch (routeName) {
  //     case 'Home':
  //       return 'Home';
  //     case 'Movement':
  //       return 'Movement';
  //     // case 'Movements':
  //     //   return 'Movements';
  //     // case 'NewMovement':
  //     //   return 'NewMovement';
  //   }
  // }

  return (
    <Stack.Navigator
      initialRouteName={props.loggedUser ? 'Tabs' : 'Login'}
      // initialRouteName={'Login'}
      screenOptions={({ navigation, route }) => ({
        headerShown: false
      })}
    >
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />     
      <Stack.Screen name="Tabs" component={TabsNavigation} />
        {/* // options={({ route }) => ({ 
        //   title: getHeaderTitle(route), 
          // header: ({ navigation }) =>  (
          //     <View style={{ backgroundColor: 'red', height: 150 }}>
          //     {Platform.OS == 'ios'
          //     ? <MaterialIcons name="arrow-back-ios" color={configTheme.primary} size={20} onPress={() => navigation.goBack()} />
          //     : <MaterialIcons name="arrow-back" color={configTheme.primary} size={20} onPress={() => navigation.goBack()} />
          //     }
          //   </View> ),  
          
          
        // })} />      */}
      

    </Stack.Navigator>
  );
}



// export default StackNavigation;
export default connect(mapStateToProps, mapDispatchToProps)(RootNavigation);