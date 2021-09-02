import React from 'react';
import { View, Text, ImageSourcePropType, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {Status} from '@reducers/movement/model';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect, ConnectedProps } from 'react-redux';
import {Header} from '@components/index';


import { Props as StackComponentProps} from '@navigation/stack.navigation';

import { Movement } from '@reducers/movement/model';
import useConfigTheme from '@hooks/useConfigTheme';
import useStyles from './styles';
import { MovementState } from '@reducers/movement/reducer';

const btcCoin: ImageSourcePropType = require("@assets/media/btcCoin.png");

const mapStateToProps = (state: any) => {
  const { movements }: MovementState = state.movement;

  return {
    movements
  };
};

const mapDispatchToProps = (dispatch: any) => ({
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type reduxProps = ConnectedProps<typeof connector>;
type Props = reduxProps & StackComponentProps;

const MovementDetail: React.FC<Props> = (props: Props) => {
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
    movement = props.route.params.movement;
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

// back={() => props.navigation.goBack()}

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title='Movement Detail' 
        back={() => props.navigation.goBack()}
      />

      <View style={{  paddingVertical: 25}}>
        {renderRow('Date', movement?.date.toLocaleString('es-AR'), false)}
        {renderRow('Amount', movement?.btcAmount + ' BTC', false)}
        {renderRow('Status', movement?.status, false)}
        {renderRow('Movement ID', movement?.movementId, false)}
        {renderRow('Destination Address', movement?.destinationAddress, true)}
      </View>
     
    </SafeAreaView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MovementDetail);
