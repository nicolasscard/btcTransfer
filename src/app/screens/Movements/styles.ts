import { StyleSheet } from 'react-native';
import { ConfigEntity } from '@hooks/useConfigTheme';

export default (props: ConfigEntity) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: props.backgroundScreens,
    },
    balanceView: {
      flexDirection: 'row',
    },
    headerText: {
      fontWeight: 'bold', 
      fontSize: 30, 
      color: props.primary,
      paddingBottom: 30,
    },    
    btcAmountText: {
      fontSize: 35, 
      color: props.secondary
    },
    arsAmountText: {
      fontSize: 20, 
      color: props.secondary
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
      height: 37, 
      width: '100%', 
      justifyContent: 'center',
      backgroundColor: props.primary,
      borderRadius: 12.5,
      borderColor: props.secondary,
      borderWidth: 2
    },
    image: {
      width: 90, 
      height: 90, 
      tintColor: props.secondary
    },
    loader: {
      position: 'absolute', 
      width: '100%', 
      height: '100%', 
      // alignItems: 'center', 
      // justifyContent: 'center',
      // backgroundColor: 'red' 
      backgroundColor: 'rgba(255,255,255, 0.55)' 
    },
    errorText: {
      fontSize: 12,
      marginLeft: 30,
      marginTop: 5,
      color: props.error
    },
  })
}
