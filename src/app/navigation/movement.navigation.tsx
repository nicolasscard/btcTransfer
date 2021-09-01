import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Movements,  } from '@screens/index';

import { connect, ConnectedProps } from 'react-redux';
import {RootStackParamList} from './stack.navigation';

/**
 * Specifying undefined means that the route doesn't have params. 
 * A union type with undefined (e.g. SomeType | undefined) means that params are optional.
 */
 export type MovementStackParamList = {
  Movements: undefined
  // NewMovement: undefined
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
    error: state.user.userError,
    success: state.user.success
  };
};

const mapDispatchToProps = (dispatch: any) => ({
});


const connector = connect(mapStateToProps, mapDispatchToProps);
type reduxProps = ConnectedProps<typeof connector>;

function MovementNavigation(props: Props) {
  // const isNewMovement = props.route.params?.type == 'newMovement';

  // console.log('movementNavigation')
  // console.log(props.route.params)
  // // console.log(props.navigation)
  // if (isNewMovement) {
  //   props.navigation.navigate('NewMovement');
  // }

  return (
    <Stack.Navigator
      // initialRouteName={isNewMovement ? 'NewMovement' : 'Movements'} 
      initialRouteName={'Movements'}
      screenOptions={({ navigation, route }) => ({
        headerShown: false
      })}
    >
      <Stack.Screen name="Movements" component={Movements} />     
      {/* <Stack.Screen name="NewMovement" component={NewMovement} />      */}

    </Stack.Navigator>
  );
}

// export default connect(mapStateToProps, mapDispatchToProps)(MovementNavigation);
export default MovementNavigation;
