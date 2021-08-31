import React from 'react';
import { View, Text, ImageSourcePropType, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { connect, ConnectedProps } from 'react-redux';
import { logout } from '@reducers/user/actions';

import { Props as StackComponentProps} from '@navigation/root.navigation';
// import { Props as TabComponentProps} from '@navigation/tabs.navigation';

import { Button } from 'react-native-paper';
import { Movement } from '@reducers/movement/model';
import useConfigTheme from '@hooks/useConfigTheme';
import useStyles from './styles';

const btcCoin: ImageSourcePropType = require("@assets/media/btcCoin.png");

const mapStateToProps = (state: any) => {
  return {
    movements: state.movement.movements,
    // error: state.user.userError,
    // userSuccess: state.user.userSuccess
  };
};

const mapDispatchToProps = (dispatch: any) => ({
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type reduxProps = ConnectedProps<typeof connector>;
type Props = reduxProps & StackComponentProps;

const Movements: React.FC<Props> = (props) => {
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);

  console.log('movement screen prop')
  console.log(props.movements)

  const renderItem = (item: Movement) => {
    console.log('renderItem')
    console.log(item)
    return (
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'yellow' }}>
        <Text style={{ flex: 0.4, textAlign: 'center' }}>
          {item.date.toISOString()}
        </Text>
        <Text style={{ flex: 0.4, textAlign: 'center' }}>
          {'1.00004554332'}
        </Text>
        <Text style={{ flex: 0.2, textAlign: 'center' }}>
          {item.status}
        </Text>

      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.headerText}>
        {'Movements'}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ flex: 0.4, textAlign: 'center' }}>
          Date
        </Text>
        <Text style={{ flex: 0.4, textAlign: 'center' }}>
          Amount
        </Text>
        <Text style={{ flex: 0.2, textAlign: 'center' }}>
          Status
        </Text>

      </View>
      <FlatList
        data={props.movements}
        renderItem={(item) => renderItem(item.item)}
        keyExtractor={item => item.movementId}
      />


    </SafeAreaView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Movements);
