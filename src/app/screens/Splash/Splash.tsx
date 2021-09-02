import React, { useEffect } from 'react';
import { Text, ImageSourcePropType, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Props as StackComponentProps} from '@navigation/stack.navigation';
import { connect, ConnectedProps } from 'react-redux';

import useConfigTheme from '@hooks/useConfigTheme';
import useStyles from './styles';

const splashImg: ImageSourcePropType = require("@assets/media/splash.png");

const mapStateToProps = (state: any) => {
  return {
    loggedUser: state.user.loggedUser,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type reduxProps = ConnectedProps<typeof connector>;
type Props = reduxProps & StackComponentProps;

const Splash: React.FC<Props> = (props) => {
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);

  useEffect(() => { 
    if (props.loggedUser) {
      props.navigation.navigate('Tabs');
    }
    else {
      props.navigation.navigate('Login');
    }    
  }, [props.loggedUser]);  
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Bitcoins Transfer
      </Text>
      <Image
        source={splashImg}
        style={styles.image}
      />
    </SafeAreaView>
  );
}

// export default Splash;
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
