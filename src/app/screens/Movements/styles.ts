import { StyleSheet } from 'react-native';
import { ConfigEntity } from '@hooks/useConfigTheme';

export default (props: ConfigEntity) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: props.backgroundScreens,
      padding: 20
    },
    headerText: {
      fontWeight: 'bold', 
      fontSize: 30, 
      color: props.primary,
      paddingBottom: 30,
    },    
    rowView: {
      flex: 1, 
      flexDirection: 'row', 
      paddingVertical: 10,
      // backgroundColor: 'orange',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rowText: {
      textAlign: 'center', 
      fontSize: 17,
      // backgroundColor: 'green',
    },
    headerRowText: {
      textAlign: 'center', 
      fontSize: 17,
      fontWeight: 'bold'
    },
    icon: {
      flex: 0.05, 
      textAlign: 'right', 
      // textAlign: 'center', 
      // backgroundColor: 'yellow'
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
  })
}
