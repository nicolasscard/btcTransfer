import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect, ConnectedProps } from 'react-redux';
import { Props as StackComponentProps} from '@navigation/stack.navigation';

import {Status, Movement} from '@reducers/movement/model';
import {Header} from '@components/index';

import useConfigTheme from '@hooks/useConfigTheme';
import useStyles from './styles';

const mapStateToProps = (state: any) => {
  return {
    movements: state.movement.movements
  };
};

const mapDispatchToProps = (dispatch: any) => ({
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type reduxProps = ConnectedProps<typeof connector>;
type Props = reduxProps & StackComponentProps;

const MovementDetail: React.FC<Props> = (props) => {
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);
  
  let movement: Movement = {
    movementId: 0,
    originUserId: 0,
    destinationUserId: 0,
    destinationAddress: '',
    btcAmount: 0,
    date: new Date(),
    status: Status.Pending,
  };

  if (props.route.params) {
    const movementId: number = props.route.params?.movementId;
    movement = props.movements[movementId];
  }

  const renderRow = (label: string, value: string | number, isColumn: boolean) => {
    return (
    <View style={isColumn ? styles.detailColumnView : styles.detailRowView}>
      <Text style={{ ...styles.detailedRowText}}>
        {`${label}: `}
      </Text>
      <Text style={{ ...styles.detailedRowText }}>
        {`${value}`}
      </Text>
    </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title='Movement Detail' 
        back={() => props.navigation.goBack()}
      />

      <View style={{  paddingVertical: configTheme.margin}}>
        {renderRow('Date', movement?.date.toLocaleString('es-AR'), false)}
        {renderRow('Amount', movement?.btcAmount + ' BTC', false)}
        {renderRow('Status', movement?.status, false)}
        {renderRow('Movement ID', movement?.movementId, false)}
        {renderRow('Destination Address', movement?.destinationAddress, true)}
      </View>
    </SafeAreaView>
  );
}

// export default MovementDetail;
export default connect(mapStateToProps, mapDispatchToProps)(MovementDetail);
