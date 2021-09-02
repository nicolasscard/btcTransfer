import React, { useEffect } from 'react';
import { View, Text, ImageSourcePropType, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect, ConnectedProps } from 'react-redux';
import { Props as StackComponentProps} from '@navigation/stack.navigation';
import { Button } from 'react-native-paper';

import {Header} from '@components/index';
import { logout } from '@reducers/user/actions';
import { getBTCprice, getUSDprice } from '@reducers/rates/actions';

import useConfigTheme from '@hooks/useConfigTheme';
import useStyles from './styles';

const btcCoin: ImageSourcePropType = require("@assets/media/btcCoin.png");

const mapStateToProps = (state: any) => {
  return {
    loggedUser: state.user.loggedUser,
    BTCprice: state.rates.BTCprice,
    USDprice: state.rates.USDprice,

    error: state.rates.ratesError,
    loading: state.rates.ratesloading,
    getBTCpriceSuccess: state.rates.getBTCpriceSuccess,
    getUSDpriceSuccess: state.rates.getUSDpriceSuccess,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch(logout()),
  getBTCprice: () => dispatch(getBTCprice()),
  getUSDprice: () => dispatch(getUSDprice()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type reduxProps = ConnectedProps<typeof connector>;
type Props = reduxProps & StackComponentProps;

const MyBalance: React.FC<Props> = (props) => {
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);

  useEffect(() => { 
    props.getBTCprice();
    props.getUSDprice();
  }, []);  

  return (
    <SafeAreaView style={styles.container}>
      <Header title='My Balance' />
      <View style={styles.balanceView}>
        <Image
          source={btcCoin}
          style={styles.image}
        />
        <View style={{ 
          flex: 1, justifyContent: 'center', paddingLeft: configTheme.margin }}>
      
          {props.loggedUser != null
            ? (<>
                <Text style={styles.btcAmountText}>
                  {props.loggedUser.btcBalance + ' BTC'}
                </Text>
                <Text style={styles.arsAmountText}>
                  {'= $ ' + (props.loggedUser.btcBalance * props.BTCprice * props.USDprice)}
                </Text>
              </>)
            : <Text style={styles.arsAmountText}>
                Loading...  
              </Text>
          }
        </View>
      </View>

      <Button 
        onPress={() => { props.navigation.navigate('NewMovement'); }}
        style={{ ...styles.primaryButton }}
        labelStyle={{ fontSize: 12, color: configTheme.textButtonPrimary }}
      >
        Send BTC
      </Button>

      <Button 
        onPress={() => { 
          props.navigation.navigate('Login');
          props.logout();
        }}
        style={styles.buttonWithBorder}
        labelStyle={{ fontSize: 12, color: configTheme.textButtonSecondary }}
      >
        Log Out
      </Button>

    </SafeAreaView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBalance);
