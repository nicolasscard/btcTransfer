import React, {useEffect, useState } from 'react';
import { View, Text, ImageSourcePropType, Image, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Status} from '@reducers/movement/model';

import { connect, ConnectedProps } from 'react-redux';
import { logout } from '@reducers/user/actions';

import { Props as StackComponentProps} from '@navigation/stack.navigation';
// import { Props as TabComponentProps} from '@navigation/tabs.navigation';

import { Button } from 'react-native-paper';
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
// type Props = reduxProps & TabComponentProps;

const Movements: React.FC<Props> = (props) => {
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);

  const [loading, setLoading] = useState<boolean>(false);

  console.log('movement screen prop')
  console.log(props.movements)

  useEffect(() => { 
    console.log('movements screen >> useEffects >> props.movements')
    console.log(props.movements)
  }, [props.movements]); 

  const renderItem = (item: Movement) => {
    console.log('renderItem')
    console.log(item)

    return (
      <View style={styles.rowView}>
        <Text style={{ flex: 0.2, ...styles.rowText}}>
          {`${item.date.getDate()}/${item.date.getMonth()}/${item.date.getFullYear()}`}
        </Text>
        <Text style={{ flex: 0.5, ...styles.rowText }}>
          {/* {'1.00004554332'} */}
          {item.btcAmount}
        </Text>
        <Text style={{ flex: 0.2, ...styles.rowText, color: item.status == Status.Success ? 'green' : 'red' }}>
          {item.status}
        </Text>
        <MaterialIcons 
          style={styles.icon} 
          name="chevron-right" 
          color={configTheme.primary} 
          size={25} 
        />

      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}> {'Movements'} </Text>
      {props.movements.length > 0
        ? (<>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ flex: 0.2, ...styles.headerRowText }}> Date </Text>
              <Text style={{ flex: 0.5, ...styles.headerRowText }}> Amount </Text>
              <Text style={{ flex: 0.2, ...styles.headerRowText }}> Status </Text>
              <View style={{ flex: 0.05 }} />
            </View>
          </>)
        : <Text style={{ flex: 0.2, ...styles.headerRowText }}> No movements made yet </Text>
      }
      <FlatList
        data={props.movements}
        renderItem={(item) => renderItem(item.item)}
        keyExtractor={(item) => item.movementId.toString()}
      />
     
    </SafeAreaView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Movements);
