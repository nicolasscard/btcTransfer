import React, {useEffect } from 'react';
import { View, Text, ImageSourcePropType, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {showMessage} from 'react-native-flash-message';

import { connect, ConnectedProps } from 'react-redux';
import {UserData} from '@reducers/user/model';
import { login } from '@reducers/user/actions';

import { Props as StackComponentProps} from '@navigation/root.navigation';
import LoginForm from './LoginForm';

import useConfigTheme from '@hooks/useConfigTheme';
import useStyles from './styles';

const welcome: ImageSourcePropType = require("@assets/media/welcome.png");

const mapStateToProps = (state: any) => {
  return {
    loggedUser: state.user.loggedUser,
    loading: state.user.userLoading,
    error: state.user.userError,
    userSuccess: state.user.userSuccess
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  login: (user: UserData) => dispatch(login(user)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type reduxProps = ConnectedProps<typeof connector>;
type Props = reduxProps & StackComponentProps;

const Login: React.FC<Props> = (props) => {
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);


  useEffect(() => { 
    if (props.error != '') {
      showMessage({
        message: props.error,
        type: 'danger',
        icon: 'danger',
        style: {backgroundColor: configTheme.error},
      });
    }

    if (props.userSuccess) {
      showMessage({
        message: 'Login Success',
        type: 'success',
        icon: 'success',
        style: {backgroundColor: configTheme.success},
      });
      props.navigation.navigate('Tabs');
    }
  }, [props]);


  const onSubmit = async (values: any) => {
    await props.login(values);
  };

  return (
    <SafeAreaView style={styles.container}>
    {/* <View style={styles.container}> */}

      <View style={styles.welcomeView}>
        <Image
          source={welcome}
          style={{  width: 180, height: 180 }}
        />
        <Text style={styles.titleText}>
          Bienvenid@ a Ripio
        </Text>
      </View>

      <View style={styles.formView}>
        <LoginForm onSubmit={onSubmit} />
      </View>

      {props.loading &&
        <ActivityIndicator 
          size="large" 
          color={configTheme.primary} 
          style={styles.loader}
        />
      }
    {/* </View> */}
    </SafeAreaView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
