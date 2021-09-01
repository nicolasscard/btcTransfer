import { StyleSheet } from 'react-native';
import { ConfigEntity } from '@hooks/useConfigTheme';

export default (props: ConfigEntity) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: props.backgroundScreens,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%', 
      resizeMode: 'contain'
    },
    title: {
      fontSize: 40,
      fontWeight: 'bold',
      color: props.primary,
      textAlign: 'center',
    }
  })
}
