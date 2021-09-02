import { StyleSheet } from 'react-native';
import { ConfigEntity } from '@hooks/useConfigTheme';

export default (props: ConfigEntity) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: props.backgroundScreens,
      padding: props.margin
    }, 
    icon: {
      flex: 0.05, 
      textAlign: 'right', 
    },
    loader: {
      position: 'absolute', 
      width: '100%', 
      height: '100%', 
      backgroundColor: 'rgba(255,255,255, 0.55)' 
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
  })
}
