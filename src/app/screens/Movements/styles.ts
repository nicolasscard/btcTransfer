import { StyleSheet } from 'react-native';
import { ConfigEntity } from '@hooks/useConfigTheme';

export default (props: ConfigEntity) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: props.backgroundScreens,
      padding: props.margin
    },
    rowView: {
      flex: 1, 
      flexDirection: 'row', 
      paddingVertical: props.halfMargin,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rowText: {
      textAlign: 'center', 
      fontSize: 17,
    },
    headerRowText: {
      textAlign: 'center', 
      fontSize: 17,
      fontWeight: 'bold',
    },
    icon: {
      flex: 0.05, 
      textAlign: 'right', 
    },
  })
}
