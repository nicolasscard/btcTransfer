import { StyleSheet } from 'react-native';
import { ConfigEntity } from '@hooks/useConfigTheme';

export default (props: ConfigEntity) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: 'blue',
      backgroundColor: props.backgroundScreens,
      // height: '100%',
      // paddingHorizontal: 20,
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    textInput: {
      backgroundColor: 'transparent', 
    },
    errorText: {
      fontSize: 12,
      marginLeft: 30,
      marginTop: 5,
      color: props.error
    },
    primaryButton: {
      height: 50, 
      width: '100%', 
      marginVertical: 30,
      justifyContent: 'center',
      backgroundColor: props.primaryButton,
      borderRadius: 40
    },
    buttonWithBorder: {
      height: 50, 
      width: '100%', 
      marginVertical: 30,
      justifyContent: 'center',
      backgroundColor: props.primaryButton,
      borderRadius: 40,
      borderColor: props.secondary
    },
    loader: {
      position: 'absolute', 
      width: '100%', 
      height: '100%', 
      // flex: 1,
      // alignItems: 'center', 
      // justifyContent: 'center',
      // backgroundColor: 'red' 
      backgroundColor: 'rgba(255,255,255, 0.55)' 
    },
    titleText: {
      fontWeight: 'bold', 
      fontSize: 20, 
      textAlign: 'center',
    },
    welcomeView: {
      flex: 0.75, 
      justifyContent: 'center', 
      alignItems: 'center',
      paddingHorizontal: 20,
      // backgroundColor: 'orange' 
    },
    formView: {
      flexGrow: 1, 
      paddingVertical: 25, 
      paddingHorizontal: 20
    }
  })
}
