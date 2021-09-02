import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {showMessage} from 'react-native-flash-message';
import { connect, ConnectedProps } from 'react-redux';
import { Props as StackComponentProps} from '@navigation/stack.navigation';

import {Header} from '@components/index';
import MovementForm from './MovementForm';

import { getFasterFee } from '@reducers/rates/actions';
import { RatesState } from '@reducers/rates/reducer';
import { sendBTC, movementReset } from '@reducers/movement/actions';
import { MovementState } from '@reducers/movement/reducer';
import { UserState } from '@reducers/user/reducer';

import useConfigTheme from '@hooks/useConfigTheme';
import useStyles from './styles';

const mapStateToProps = (state: any) => {
  const { loggedUser, userLoading, userError, userSuccess }: UserState = state.user;
  const { fasterFee, ratesLoading, ratesError, getFasterFeeSuccess }: RatesState = state.rates;
  const { movementLoading, movementError, createMovementSuccess }: MovementState = state.movement;

  return {
    loggedUser, userLoading, userError, userSuccess,
    fasterFee, ratesLoading, ratesError, getFasterFeeSuccess,
    movementLoading, movementError, createMovementSuccess, 
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  getFasterFee: () => dispatch(getFasterFee()),
  sendBTC: (btcAddress: string, btcAmount: number) => dispatch(sendBTC(btcAddress, btcAmount)),
  movementReset: () => dispatch(movementReset()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type reduxProps = ConnectedProps<typeof connector>;
type Props = reduxProps & StackComponentProps;

const NewMovement: React.FC<Props> = (props) => {
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);

  useEffect(() => { 
    props.getFasterFee();
  }, []);    
  
  useEffect(() => { 
    if (props.createMovementSuccess) {
      showMessage({
        message: 'BTC sended Success',
        type: 'success',
        icon: 'success',
        style: {backgroundColor: configTheme.success},
        duration: 2000
      });
      props.movementReset();      
      props.navigation.dispatch(
        StackActions.replace('Tabs')
      );
    }  
  }, [props.createMovementSuccess]);  

  useEffect(() => { 
    if (props.movementError != '') {
      showMessage({
        message: props.movementError,
        type: 'danger',
        icon: 'danger',
        style: {backgroundColor: configTheme.error},
        duration: 2500
      });
      props.movementReset();
    }
  }, [props.movementError]);  

  const onSubmit = async (values: any) => {
    await props.sendBTC(values.btcAddress, values.btcAmount);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title='Sending Bitcoins' 
        back={() => props.navigation.goBack()}
      />
     
      <View style={{ ...styles.container, padding: configTheme.margin}}>
        <MovementForm 
          onSubmit={onSubmit} 
          loggedUser={props.loggedUser} 
          fasterFee={props.fasterFee} 
        />
      </View>
      {props.movementLoading &&
        <ActivityIndicator 
          size="large" 
          color={configTheme.primary} 
          style={styles.loader}
        />
      }
    </SafeAreaView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMovement);
