import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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

const Movements: React.FC<Props> = (props) => {
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);

  const renderItem = (item: Movement) => {
    return (
      <TouchableOpacity 
        style={styles.rowView}  
        onPress={() =>  props.navigation.navigate('MovementDetail', { movementId: item.movementId })}
      >
        <Text style={{ flex: 0.2, ...styles.rowText}}>
          {`${item.date.getDate()}/${item.date.getMonth()}/${item.date.getFullYear()}`}
        </Text>
        <Text style={{ flex: 0.5, ...styles.rowText }}>
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
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title='Movements' />
      <View style={{ marginTop: configTheme.margin }}>
        {props.movements.length > 0
          ? (<>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 0.2, ...styles.headerRowText }}> Date </Text>
                <Text style={{ flex: 0.5, ...styles.headerRowText }}> Amount </Text>
                <Text style={{ flex: 0.2, ...styles.headerRowText }}> Status </Text>
                <View style={{ flex: 0.05 }} />
              </View>
            </>)
          : <Text style={{ ...styles.headerRowText }}> No movements made yet </Text>
        }
        <FlatList
          data={props.movements}
          renderItem={(item) => renderItem(item.item)}
          keyExtractor={(item) => item.movementId.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Movements);
