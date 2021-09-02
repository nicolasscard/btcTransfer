import { StyleSheet } from 'react-native';
import { ConfigEntity } from '@hooks/useConfigTheme';

export default (props: ConfigEntity) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: props.backgroundScreens,
    },
    errorText: {
      fontSize: 12,
      marginLeft: props.margin,
      marginTop: 5,
      color: props.error
    },
    primaryButton: {
      height: 50, 
      width: '100%', 
      marginVertical: props.margin,
      justifyContent: 'center',
      backgroundColor: props.primaryButton,
      borderRadius: 40
    },
    loader: {
      position: 'absolute', 
      width: '100%', 
      height: '100%', 
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
      paddingHorizontal: props.margin,
    },
    formView: {
      flexGrow: 1, 
      paddingVertical: props.margin, 
      paddingHorizontal: props.margin
    }
  })
}
