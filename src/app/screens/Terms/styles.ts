import { StyleSheet } from 'react-native';
import { ConfigEntity } from '@hooks/useConfigTheme';

export default (props: ConfigEntity) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: props.backgroundScreens,
    },
    bodyView: {
      flex: 1,
      paddingHorizontal: 10, 
      alignItems: 'center'
    },
    descriptionText: {
      padding: 30,
      fontSize: 14,
    },
    image: {
      resizeMode: 'contain',
      width: '100%', 
    },
    button: {
      height: 50, 
      width: 256, 
      marginVertical: 30,
      justifyContent: 'center',
      backgroundColor: props.primaryButton
    },
  })
}
