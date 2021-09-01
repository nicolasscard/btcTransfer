import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import StackNavigation from '@navigation/stack.navigation';

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
        <NavigationContainer>
          <StackNavigation />
          <FlashMessage
            position="top"
            MessageComponent={myFlashMessageComponent}
          />
        </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
