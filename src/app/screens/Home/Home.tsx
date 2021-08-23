import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import useConfigTheme from '@hooks/useConfigTheme';

import useStyles from './styles';

interface Props {
  navigation: any;
}

const Home: React.FC<Props> = () => {
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);
  
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>

      {/*
        <Button
        title="Go to UIKit"
        onPress={() => navigation.navigate('UIKit')} 
      />
      <Button
        title="Push new route"
        onPress={() => navigation.push('UIKit')}
      />        
      <Button
        title="Go to login"
        onPress={() => navigation.navigate('Login', { user: 'nicolas.scard@gmail.com', password: 'Secreta123' })}  //  example using params 
      />            
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
       */}
    </SafeAreaView>
  )
}

export default Home;
