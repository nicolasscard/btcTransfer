import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';

import RootNavigation from '@navigation/root.navigation';

import FlashMessage, {
  MessageComponentProps,
  DefaultFlash,
} from 'react-native-flash-message';

const App = () => {
  
  const myFlashMessageComponent: React.FC<MessageComponentProps> = (props) => (
    <DefaultFlash
      {...props}
      titleStyle={{paddingRight: 10}}
      textStyle={{paddingRight: 10}}
    />
  );

  return (
    <SafeAreaProvider>
      <MenuProvider>
        <NavigationContainer>
          <RootNavigation />
          <FlashMessage
            position="top"
            MessageComponent={myFlashMessageComponent}
          />
        </NavigationContainer>
      </MenuProvider>
    </SafeAreaProvider>
  );
};

export default App;
