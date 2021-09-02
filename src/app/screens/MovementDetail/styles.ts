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
    detailRowView: {
      flexDirection: 'row', 
      paddingVertical: props.halfMargin,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    detailColumnView: {
      paddingVertical: props.halfMargin,
      justifyContent: 'space-between',
    },
    rowText: {
      textAlign: 'center', 
      fontSize: 17,
    },
    detailedRowText: {
      fontSize: 17,
    },
  })
}
