import React from 'react';
import { StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage, { MessageComponentProps, DefaultFlash } from 'react-native-flash-message';

import StackNavigation from '@navigation/stack.navigation';
import useConfigTheme from '@hooks/useConfigTheme';

const App = () => {
  const { configTheme } = useConfigTheme();
  const myFlashMessageComponent: React.FC<MessageComponentProps> = (props) => (
    <DefaultFlash
      {...props}
      titleStyle={{paddingRight: 10}}
      textStyle={{paddingRight: 10}}
    />
  );

  return (
    <SafeAreaProvider>
        <StatusBar backgroundColor={configTheme.backgroundHeaders} />
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
