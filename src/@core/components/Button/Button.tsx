import React from 'react';
import {  View } from 'react-native';

import useConfigTheme from '@hooks/useConfigTheme';
import useStyles from './styles';

interface Props { 

}

const Button: React.FC<Props> = (Props) => {
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);

  return (
    <View style={styles.container}>
         {Props.children}
    </View>
  )
}

export default Button;
