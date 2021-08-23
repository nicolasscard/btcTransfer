import React, {useEffect } from 'react';
import { View, Text, ImageSourcePropType, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { TextInput as Input } from 'react-native-paper';
import { TextInput } from '@components/index';
import LoginForm from './LoginForm';
import useConfigTheme from '@hooks/useConfigTheme';
import { Button } from 'react-native-paper';
import useStyles from './styles';
import { useDispatch, useSelector, connect, ConnectedProps } from 'react-redux';
import {RootState} from '@reducers/store';
import {UserState} from '@reducers/user/reducer';
import Snackbar from 'react-native-snackbar';

import { submit, isInvalid, isSubmitting } from 'redux-form';

import { login } from '@reducers/user/actions';

interface ComponentProps {
  navigation: any;
}

const welcome: ImageSourcePropType = require("@assets/media/welcome.png");

const mapStateToProps = (state: any) => {
  return {
    loading: state.user.userLoading,
    error: state.user.userError
  };
};


const mapDispatchToProps = (dispatch: any) => ({
  login: (user: UserState) => dispatch(login(user)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type reduxProps = ConnectedProps<typeof connector>;
type Props = reduxProps & ComponentProps;

const Login: React.FC<Props> = (props) => {
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);

  // console.log('login >> props')
  // console.log(props.loading)
  // console.log(props.error)

  useEffect(() => { 
    if (props.error != '') {
      console.log('error')
      console.log(props.error)

      Snackbar.show({
        text: props.error,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }, [props.error]);
  
  // const loading = useSelector((state: RootState) => state.user.userLoading);
  // const error = useSelector((state: RootState) => state.user.userError);
  // const user = useSelector((state: RootState) => state.user);
  // const dispatch = useDispatch();

  const onSubmit = async (values: any) => {
    console.log('Login Screen >> onSubmit >> values');
    console.log(values);
    // await dispatch(login(values));
    await props.login(values);
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={{flex: 0.75, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={welcome}
          style={{  width: 200, height: 200 }}
        />
        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>
          Bienvenid@ a Ripio
        </Text>
      </View>
      <View style={{ flexGrow: 1,  backgroundColor: 'white', paddingHorizontal: 15 }}>
        <LoginForm onSubmit={onSubmit} />
      </View>
      {props.loading &&
        <ActivityIndicator 
        size="large" 
        color={configTheme.primary} 
        // style={styles.loader}
        />
      }
    </SafeAreaView>
  )
}

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(Login);
