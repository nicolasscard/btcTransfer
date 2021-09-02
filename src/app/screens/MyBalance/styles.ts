import { StyleSheet } from 'react-native';
import { ConfigEntity } from '@hooks/useConfigTheme';

export default (props: ConfigEntity) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: props.backgroundScreens,
      padding: props.margin,
    },
    balanceView: {
      flexDirection: 'row',
      marginTop: props.margin
    },
    btcAmountText: {
      fontSize: 35, 
      color: props.textInputText
    },
    arsAmountText: {
      fontSize: 20, 
      color: props.textInputText
    },
    primaryButton: {
      height: 50, 
      width: '100%', 
      marginVertical: props.margin,
      justifyContent: 'center',
      backgroundColor: props.primaryButton,
      borderRadius: 40
    },
    buttonWithBorder: {
      height: 37, 
      width: '100%', 
      justifyContent: 'center',
      backgroundColor: props.secondary,
      borderRadius: 12.5,
      borderColor: props.primary,
      borderWidth: 2
    },
    image: {
      width: 90, 
      height: 90, 
      tintColor: props.money
    }
  })
}
