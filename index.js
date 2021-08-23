/**
 * @format
 */

 import 'react-native-gesture-handler';
 import React from 'react';
 import {AppRegistry, View, Text} from 'react-native';
 import { Provider } from 'react-redux';
 import { store, persistor } from './src/@core/reducers/store';
 import {PersistGate} from 'redux-persist/integration/react';
 import App from './src/app/App';
 import {name as appName} from './app.json';

 
 const Aplication = () => (
     <Provider store={store}>
        <PersistGate
          loading={
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Loading...</Text>
            </View>
          }
          persistor={persistor}
        >
          <App />
        </PersistGate>

     </Provider>
   );
 
 AppRegistry.registerComponent(appName, () => Aplication);