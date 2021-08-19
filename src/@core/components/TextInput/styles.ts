import { StyleSheet } from 'react-native';

import { ConfigEntity } from '@hooks/useConfigTheme';

export default (props: ConfigEntity) => {
  return StyleSheet.create({
    textInput: {
      flex: 1, 
        backgroundColor: 'transparent', 
        fontWeight: 'bold',
    },
    image: {
      resizeMode: 'contain',
      width: 20, 
      height: 20,
      marginRight: 5,
    }
  })
};
