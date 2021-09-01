import React, { useEffect } from 'react';
import { View, Text, ImageSourcePropType, Image, ActivityIndicator } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {showMessage} from 'react-native-flash-message';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { connect, ConnectedProps } from 'react-redux';
import { getFasterFee } from '@reducers/rates/actions';
import { sendBTC, movementReset } from '@reducers/movement/actions';
import { MovementState } from '@reducers/movement/reducer';
import { RatesState } from '@reducers/rates/reducer';
import { UserState } from '@reducers/user/reducer';

import MovementForm from './MovementForm';
// import { Props as MovementStackParamList} from '@navigation/root.navigation';
import { Props as StackComponentProps} from '@navigation/stack.navigation';

import { Button } from 'react-native-paper';
import useConfigTheme from '@hooks/useConfigTheme';
import useStyles from './styles';

const btcCoin: ImageSourcePropType = require("@assets/media/btcCoin.png");

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
  
  // useEffect(() => { 
  //   console.log('Newmovement screen >> useEffect >> movements')
  //   console.log(props.movements)
  // });  
  
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
      // props.navigation.navigate('Movements');
      // props.navigation.goBack();
      
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
    console.log('onSubmit')
    console.log(values)
    await props.sendBTC(values.btcAddress, values.btcAmount);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Ionicons 
        name="chevron-back" 
        color={configTheme.primary} 
        size={30} 
        style={{ paddingLeft: 15, backgroundColor: 'white'}} 
        onPress={() => props.navigation.goBack()} 
      />
      <View style={{ ...styles.container, padding: 25}}>
        <Text style={styles.headerText}>
          {'Sending Bitcoins'}
        </Text>

        <View style={{ flexGrow: 1, paddingVertical: 25 }}>
          <MovementForm 
            onSubmit={onSubmit} 
            loggedUser={props.loggedUser} 
            fasterFee={props.fasterFee} 
          />
        </View>

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
