import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import useConfigTheme from '@hooks/useConfigTheme';
import useStyles from './styles';

interface Props { 
  title: string,
  back?: () => void;
}

const Header: React.FC<Props> = (props) => {
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);

  return (
   <View style={props.back ? styles.containerback : styles.container}>
     {props.back && 
      <Ionicons 
        name="chevron-back" 
        color={configTheme.primary} 
        size={30} 
        style={{ flex: 0.2 }} 
        onPress={() => props.back && props.back()} 
      />
     }
     <Text style={props.back ? styles.titleBack : styles.title}>
       {props.title}
      </Text>
   </View>
  );
}

export default Header;
