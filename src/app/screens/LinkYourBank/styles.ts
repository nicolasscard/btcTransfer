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
    tittleText: {
      padding: 30,
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold'
    },   
    descriptionText: {
      padding: 30,
      fontSize: 14,
      textAlign: 'center'
    },
    image: {
      resizeMode: 'contain',
      width: '100%', 
    },
    button: {
      height: 50, 
      width: '90%', 
      marginVertical: 20,
      justifyContent: 'center',
      alignSelf: 'center',
      backgroundColor: props.primaryButton
    },
  })
}
