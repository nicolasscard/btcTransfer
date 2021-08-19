import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';

import StackNavigation from '@navigation/stack.navigation';

const App = () => {
  
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </MenuProvider>
    </SafeAreaProvider>
  );
};

export default App;
