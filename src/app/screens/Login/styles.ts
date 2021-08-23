import { StyleSheet } from 'react-native';
import { ConfigEntity } from '@hooks/useConfigTheme';

export default (props: ConfigEntity) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: 'space-between',
      backgroundColor: props.backgroundScreens
    },
    textInput: {
      // flex: 1, 
      backgroundColor: 'transparent', 
      // fontWeight: 'bold',
      // height: 50
    },
    errorText: {
      fontSize: 12,
      marginLeft: 30,
      marginTop: 5,
      color: props.error
    },
    button: {
      height: 50, 
      width: 256, 
      marginVertical: 30,
      justifyContent: 'center',
      backgroundColor: props.primaryButton
    },
    loader: {
      position: 'absolute', 
      width: '100%', 
      height: '100%', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }
  })
}
