import { StyleSheet } from 'react-native';
import { ConfigEntity } from '@hooks/useConfigTheme';

export default (props: ConfigEntity) => {
  return StyleSheet.create({
    container: {
      backgroundColor: props.backgroundScreens,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    containerback: {
      backgroundColor: props.backgroundScreens,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    title: {
      flex: 1,
      fontWeight: 'bold', 
      fontSize: 30, 
      color: props.primary,
      textAlign: 'center'
    }, 
    titleBack: {
      flex: 0.8,
      fontWeight: 'bold', 
      fontSize: 30, 
      color: props.primary,
      textAlign: 'left'
    },   
  })
};
